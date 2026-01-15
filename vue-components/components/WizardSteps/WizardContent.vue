<template>
  <InputSelect :options="options" />
</template>

<script setup>
import InputSelect from "../InputSelect/InputSelect.vue";

const options = [
  {
    value: "1",
    text: "Complete",
  },
  {
    value: "2",
    text: "Error",
  },
  {
    value: "3",
    text: "Incomplete",
  },
];
</script>
