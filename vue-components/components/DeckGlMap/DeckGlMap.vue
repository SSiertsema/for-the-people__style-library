<template>
  <div class="h3-map">
    <InterActiveLayerControl
      v-if="showLegend"
      :layerTopics="layerTopics"
      @selected="topicSelected($event)"
    />
    <Loader v-if="isBusy" size="small" :message="loaderMessage" />
    <div class="map-container" id="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick, ref } from "vue";
import InterActiveLayerControl from "./InterActiveLayerControl.vue";
import Loader from "../Loader/Loader.vue";

const props = defineProps({
  maplibregl: {
    type: Object,
    required: true,
  },
  MapboxOverlay: {
    type: Function,
    required: true,
  },
  mapConfig: {
    type: Object,
    default: () => ({
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [4.5055, 51.993],
      zoom: 12,
    }),
  },
  loaderMessage: {
    type: String,
    default: "",
  },
  showLegend: {
    type: Boolean,
    default: true,
  },
  isBusy: {
    type: Boolean,
    default: false,
  },
  layers: {
    type: Object,
    default: () => ({}),
  },
  tooltip: {
    type: Function,
    default: () => null,
  },
});

const emit = defineEmits(["mapBusy"]);

const map = ref(null);
const mapContainer = ref(null);
const mapboxOverlay = ref(null);

const layerTopics = computed(() => {
  return Object.keys(props.layers);
});

onMounted(async () => {
  map.value = new props.maplibregl.Map({
    ...props.mapConfig,
    container: mapContainer.value,
  });
  addMapBoxOverlay();
  emit("mapBusy", false);
});

function addMapBoxOverlay() {
  mapboxOverlay.value = new props.MapboxOverlay({
    getTooltip: typeof props.tooltip === "function" ? props.tooltip : null,
    layers: [],
  });

  map.value.addControl(mapboxOverlay.value);
}

async function topicSelected(topicLabel) {
  emit("mapBusy", true);
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 50));
  const targetLayer = props.layers[topicLabel];
  mapboxOverlay.value.setProps({ layers: [targetLayer] });
  await new Promise((resolve) => setTimeout(resolve, 100));
  emit("mapBusy", false);
}
</script>

<style lang="scss" scoped>
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/spacers.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/levitation.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/colors.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/breakpoint.scss" as *;

.h3-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  z-index: 1;
  background-color: $color-gray-200;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: rgba(255, 255, 255, 1);
  }
}

.map-container {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
