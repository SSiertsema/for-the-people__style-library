import { createApp } from "vue";

export function createWmsLayer(leafletInstance, configuration) {
  let options = {
    layers: configuration.layers,
    format: "image/png",
    transparent: true,
    attribution: "Provincie Zuid-Holland",
  };

  if (configuration.filters && configuration.filters.trim() !== "") {
    options.CQL_FILTER = configuration.filters;
  }
  if (configuration.options) {
    options = { ...options, ...configuration.options };
  }
  return leafletInstance.tileLayer.wms(configuration.url, options);
}

export function createGeojsonLayer(leafletIntance, mapInstance, configuration) {
  const activeStyle = configuration.interactiveOptions?.style;

  const hoverEnabled = configuration.interactiveOptions?.hover ?? false;
  const popupConfig = configuration.interactiveOptions?.popupConfig ?? null;
  const customFeatureStyle =
    configuration.interactiveOptions?.customFeatureStyle ?? null;

  const labelKey = configuration.interactiveOptions?.labelKey ?? null;
  const labelVisibilityThreshold =
    configuration.interactiveOptions?.labelZoomThreshold ?? null;

  const idleStyle = {
    weight: 1,
    color: "blue",
    fillColor: "lightBlue",
    fillOpacity: 1,
    ...configuration.style,
  };

  const applyLayerStyle = (layer, extraStyle = {}) => {
    layer.setStyle({ ...idleStyle, ...extraStyle });
  };

  const bindPopup = (layer, feature) => {
    const popupContent = popupConfig.isCustom
      ? () => applyCustomPopup(feature)
      : () => applyStandardPopup(feature);

    layer.bindPopup(popupContent);

    layer.on("popupopen", () => {
      layer._popupOpen = true;
      applyLayerStyle(layer, activeStyle);
    });

    layer.on("popupclose", () => {
      layer._popupOpen = false;
      applyLayerStyle(layer);
    });
  };

  const applyCustomPopup = (feature) => {
    const container = document.createElement("div");
    const props = {};

    popupConfig.contentKeys?.forEach((key) => {
      props[key] = feature.properties[key];
    });

    const app = createApp(popupConfig.template, props);
    app.mount(container);

    return container;
  };

  const applyStandardPopup = (feature) => {
    return popupConfig.content?.(feature) ?? "";
  };

  const bindLabel = (layer, feature) => {
    layer.bindTooltip(feature.properties[labelKey], {
      permanent: true,
      direction: "center",
      className: "geojson-label",
      opacity: 0.8,
    });

    const tooltip = layer.getTooltip();

    const toggleVisibility = () => {
      const shouldShow = mapInstance.getZoom() >= labelVisibilityThreshold;
      const el = tooltip.getElement();
      if (el) {
        el.style.display = shouldShow ? "block" : "none";
      }
    };
    mapInstance.on("zoomend", () => {
      toggleVisibility();
    });
    layer.on("add", () => {
      toggleVisibility();
    });
  };

  const layerOptions = {
    style: idleStyle,
    onEachFeature: (feature, layer) => {
      layer._popupOpen = false;
      if (customFeatureStyle?.key && customFeatureStyle?.colorConfig) {
        const attr = feature.properties[customFeatureStyle.key];
        applyLayerStyle(layer, customFeatureStyle.colorConfig[attr] ?? {});
      }

      if (hoverEnabled) {
        layer.on("mouseover", () => {
          applyLayerStyle(layer, activeStyle);
        });

        layer.on("mouseout", () => {
          if (!layer._popupOpen) {
            applyLayerStyle(layer);
          }
        });
      }

      if (popupConfig) {
        bindPopup(layer, feature);
      }

      if (labelKey) {
        bindLabel(layer, feature);
      }
    },
  };
  return leafletIntance.geoJSON(configuration.data, {
    ...layerOptions,
  });
}
