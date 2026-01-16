<template>
  <div class="chart" :class="additionalClasses">
    <div v-if="title" class="chart__title">{{ title }}</div>

    <div class="chart__wrapper">
      <!-- Loading state -->
      <div v-if="isLoading" class="chart__loading">
        <svg class="chart__spinner" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray="31.4 31.4"
          />
        </svg>
      </div>

      <!-- Empty state -->
      <div v-else-if="!hasData" class="chart__empty">
        <svg class="chart__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
        <span class="chart__empty-text">
          <slot name="empty">No data available</slot>
        </span>
      </div>

      <!-- Chart canvas container -->
      <div v-else ref="chartContainerRef" class="chart__canvas">
        <slot></slot>
      </div>
    </div>

    <!-- Legend slot -->
    <div v-if="$slots.legend" class="chart__legend">
      <slot name="legend"></slot>
    </div>
  </div>
</template>

<style src="./Chart.scss"></style>

<script setup>
import { computed, ref, useSlots } from "vue";

const props = defineProps({
  /**
   * Chart title displayed above the chart
   */
  title: {
    type: String,
    default: null,
  },
  /**
   * Chart type identifier (informational)
   */
  type: {
    type: String,
    default: "bar",
    validator: (v) => ["bar", "line", "pie", "doughnut", "radar", "polar", "scatter", "bubble"].includes(v),
  },
  /**
   * Show loading spinner
   */
  isLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * Chart data object (used to determine if data exists)
   */
  data: {
    type: Object,
    default: null,
  },
  /**
   * Chart height
   */
  height: {
    type: [Number, String],
    default: null,
  },
  /**
   * Chart width
   */
  width: {
    type: [Number, String],
    default: null,
  },
});

const slots = useSlots();
const chartContainerRef = ref(null);

const additionalClasses = computed(() =>
  [
    `chart--type-${props.type}`,
    props.isLoading && "chart--loading",
  ]
    .filter(Boolean)
    .join(" ")
);

const hasData = computed(() => {
  if (props.data) {
    if (Array.isArray(props.data)) {
      return props.data.length > 0;
    }
    if (props.data.datasets) {
      return props.data.datasets.some(ds => ds.data && ds.data.length > 0);
    }
    return Object.keys(props.data).length > 0;
  }
  // If no data prop, check if there's slot content
  return !!slots.default;
});

const containerStyle = computed(() => {
  const style = {};
  if (props.height) {
    style.height = typeof props.height === "number" ? `${props.height}px` : props.height;
  }
  if (props.width) {
    style.width = typeof props.width === "number" ? `${props.width}px` : props.width;
  }
  return style;
});

// Expose the container ref for external chart library integration
defineExpose({
  chartContainerRef,
});
</script>
