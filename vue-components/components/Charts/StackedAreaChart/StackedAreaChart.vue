<template>
  <div class="pzh-stacked-area-chart">
    <Line :data="decoratedData" :options="decoratedOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
);

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        labels: ["2020", "2025", "2030", "2035"],
        datasets: [
          {
            label: "Dataset 1",
            data: [1, 2, 1.5, 1.2],
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Dataset 2",
            data: [1.2, 1.8, 1.6, 1],
            backgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };
    },
  },
  options: {
    type: Object,
  },
});

const decoratedOptions = computed(() => {
  const defaultOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  if (!props.options) {
    return defaultOptions;
  }

  return {
    ...defaultOptions,
    ...props.options,
  };
});

const options = computed(() => {
  return {
    responsive: true,
    ...props.options,
  };
});

const decoratedData = computed(() => {
  return {
    ...props.data,
    datasets: props.data.datasets.map((dataset) => {
      return {
        fill: true,
        tension: 0,
        ...dataset,
      };
    }),
  };
});
</script>

<style scoped>
.pzh-stacked-area-chart {
  height: 100%;
  width: 100%;
}
</style>
