<template>
  <div class="map-legend">
    <ButtonSecondary
      v-show="!showLegend"
      text="Filters"
      size="small"
      icon="layer-group"
      @click="toggleLegend"
    />
    <div class="map-legend__container" v-show="showLegend">
      <div class="map-legend__action-row">
        <h4>Filters</h4>
        <button @click="toggleLegend"><i class="icon-solid--x"></i></button>
      </div>
      <div class="map-legend__content">
        <div class="map-legend__layers">
          <div
            class="map-legend__item"
            v-for="item in legendItems.multiSelectable"
            :key="item.id"
          >
            <InputCheckbox
              :id="item.id.toString()"
              :label="item.label"
              :name="item.label"
              :modelValue="item.value"
              @change="handleCheckBoxChange(item.refrenceName)"
            />
          </div>
        </div>
        <div class="map-legend__layers" v-if="selectedRadioValue !== null">
          <InputRadioGroup
            v-model="selectedRadioValue"
            :options="singleSelectableItems"
          />
          <div class="map-legend__button-row">
            <ButtonSecondary
              size="small"
              :text="legendButtonText"
              @click="selectedRadioValue = ''"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits } from "vue";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary.vue";
import InputCheckbox from "../InputCheckbox/InputCheckbox.vue";
import InputRadioGroup from "../InputRadioGroup/InputRadioGroup.vue";

const props = defineProps({
  legendItems: Object,
  legendButtonText: String,
  legendInitiallyOpen: Boolean,
});

const emit = defineEmits(["updateLayers"]);

const showLegend = ref(false);
const selectedRadioValue = ref(null);

const singleSelectableItems = computed(() => {
  return props.legendItems.singleSelectable.map((item) => item.label) || [];
});

watch(
  () => selectedRadioValue.value,
  (newVal) => {
    handleRadioButtonChange();
  },
);

onMounted(() => {
  showLegend.value = props.legendInitiallyOpen;
  setInitialRadioValue();
});

function toggleLegend() {
  showLegend.value = !showLegend.value;
}

function setInitialRadioValue() {
  const activeItem = props.legendItems?.singleSelectable?.find(
    (item) => item.value,
  );
  selectedRadioValue.value = activeItem?.label ? activeItem.label : "";
}

function handleCheckBoxChange(layerName) {
  const layer = {
    name: layerName,
    type: "multiSelectable",
  };
  emit("updateLayers", layer);
}

function handleRadioButtonChange() {
  const layer = {
    name: selectedRadioValue.value,
    type: "singleSelectable",
  };
  emit("updateLayers", layer);
}
</script>

<style lang="scss" scoped>
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/spacers.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/levitation.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/colors.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/breakpoint.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/radii.scss" as *;

.map-legend {
  position: absolute;
  top: $space-3;
  right: $space-3;
  z-index: 5;
  &__container {
    width: 260px;
    height: auto;
    border-radius: $radius-4;
    padding: $space-4;
    background-color: $color-white;
  }
  &__action-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $space-4;
    h4 {
      padding: 0;
      margin: 0;
      @include typography(text, m, true);
    }
    button {
      color: $color-blue-500;
      background-color: $color-white;
      cursor: pointer;
      border: none;
      &:hover {
        color: $color-green-500;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }
  &__layers {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }
  &__button-row {
    margin-top: $space-4;
    margin-bottom: $space-6;
    display: flex;
    justify-content: center;
  }
}
</style>
