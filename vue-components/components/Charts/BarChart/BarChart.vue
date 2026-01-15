<template>
  <div class="pzh-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  annotationPlugin,
);

const props = defineProps({
  labels: {
    type: Array,
    default: () => ["1", "2", "3", "4", "5"],
  },
  values: {
    type: Array,
    default: () => [100, 200, 250, 350, 300],
  },
  datasets: {
    type: Array,
  },
  backgroundColors: {
    type: Array,
    default: () => ["#7BADDE"],
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    }),
  },
});

const chartData = computed(() => {
  const data = {
    labels: props.labels,
  };

  if (props.datasets) {
    data.datasets = props.datasets;
  } else {
    data.datasets = [
      {
        backgroundColor: props.backgroundColors,
        data: props.values,
        maxBarThickness: props.chartOptions.maxBarThickness || 35,
      },
    ];
  }

  return data;
});
</script>

<style lang="scss" scoped>
.pzh-chart {
  aspect-ratio: 2 / 1;
}
</style>
