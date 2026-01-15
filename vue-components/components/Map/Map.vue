<template>
  <div class="map">
    <div class="map__pane" id="mapPane"></div>
    <Loader v-if="isLoading" :message="loaderMessage" />
    <MapLegend
      v-if="layersLegendItems && showLegend"
      :legendItems="layersLegendItems"
      :legendButtonText="legendButtonText"
      :legendInitiallyOpen="legendInitiallyOpen"
      @updateLayers="updateLayers"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import { createWmsLayer, createGeojsonLayer } from "./utils/mapLayers";
import MapLegend from "./MapLegend.vue";
import Loader from "../Loader/Loader.vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  leaflet: Object,
  mapConfig: {
    type: Object,
    default: () => ({
      center: [52.0705, 4.3007],
      attributionControl: false,
      minZoom: 5,
      maxZoom: 16,
      zoom: 5,
    }),
  },
  backgroundMapConfig: {
    type: Object,
    default: () => ({
      url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:28992/{z}/{x}/{y}.png",
      maxZoom: 19,
    }),
  },
  loaderMessage: {
    type: String,
    default: "Kaart laden",
  },
  legendButtonText: {
    type: String,
    default: "Selectie ongedaan maken",
  },
  showLegend: {
    type: Boolean,
    default: true,
  },
  legendInitiallyOpen: {
    type: Boolean,
    default: true,
  },
  layers: Object,
});

const map = ref(null);
const isLoading = ref(false);

const layerCache = ref({});

const layersLegendItems = computed(() => {
  const layerCategories = {
    multiSelectable: [],
    singleSelectable: [],
  };

  for (const [layerName, layerData] of Object.entries(props.layers)) {
    const label = formatLabelName(layerName);

    if (layerData.isMultiSelectable ?? true) {
      layerCategories.multiSelectable.push({
        label,
        refrenceName: layerName,
        value: layerData.active,
        id: uuidv4(),
      });
    } else {
      layerCategories.singleSelectable.push({
        label,
        value: layerData.active,
      });
    }
  }

  return layerCategories;
});

const leafletMapConfig = computed(() => {
  return {
    ...props.mapConfig,
    crs: crs.value,
  };
});

const crs = computed(() => {
  return new props.leaflet.Proj.CRS(
    "EPSG:28992",
    "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 " +
      "+k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel " +
      "+towgs84=565.2369,50.0087,465.658,0.4068573303223979," +
      "0.3507326765425633,1.8703473836068,4.0812 +units=m +no_defs",
    {
      origin: [-285401.92, 903401.92],
      resolutions: [
        3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44,
        6.72, 3.36, 1.68,
      ],
    },
  );
});

onMounted(async () => {
  isLoading.value = true;
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 50));
  generateMap();
  initializeLayers();
  drawLayers();
  isLoading.value = false;
});

function generateMap() {
  map.value = props.leaflet.map("mapPane", leafletMapConfig.value);
  props.leaflet
    .tileLayer(props.backgroundMapConfig.url, {
      maxZoom: props.backgroundMapConfig.zoom,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map.value);
}

function initializeLayers() {
  for (const layerName in props.layers) {
    const layerConfiguration = props.layers[layerName];

    if (layerConfiguration.type === "image") {
      layerCache.value[layerName] = createWmsLayer(
        props.leaflet,
        layerConfiguration,
      );
    } else {
      layerCache.value[layerName] = createGeojsonLayer(
        props.leaflet,
        map.value,
        layerConfiguration,
      );
    }
    applyLayerFocus(layerName, layerConfiguration);
  }
}

function applyLayerFocus(layerName, layerConfig) {
  if (layerConfig.focusLayer == null || !layerConfig.active) return;
  const bounds = layerCache.value[layerName]
    .getBounds()
    .pad(layerConfig.focusLayer);
  map.value.fitBounds(bounds);
}

function updateLayers(layer) {
  if (layer.type === "multiSelectable") {
    props.layers[layer.name].active = !props.layers[layer.name].active;
  } else {
    const singleSelectableLayers = Object.fromEntries(
      Object.entries(props.layers).filter(
        ([key, value]) => value.isMultiSelectable === false,
      ),
    );
    Object.entries(singleSelectableLayers).forEach(([key]) => {
      formatLabelName(key) === layer.name
        ? (props.layers[key].active = true)
        : (props.layers[key].active = false);
    });
  }
  drawLayers();
}

function drawLayers() {
  Object.entries(layerCache.value).forEach(([key, item]) => {
    map.value.removeLayer(item);
    if (props.layers[key].active) {
      item.addTo(map.value);
    }
  });
}

function formatLabelName(str) {
  const spacedString = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return (
    spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase()
  );
}
</script>

<style lang="scss">
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/spacers.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/levitation.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/colors.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/breakpoint.scss" as *;

.map {
  position: relative;
  overflow: hidden;
  background-color: #ddd;
  &__pane {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    aspect-ratio: 4/3;
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}
.geojson-label {
  background-color: $color-white;
  padding: $space-1 $space-2;
  border: none;
  box-shadow: none;
  font-size: 12px;
  color: $color-black;
  pointer-events: none;
  font-weight: bold;
}
</style>
