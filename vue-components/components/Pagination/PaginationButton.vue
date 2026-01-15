<template>
  <button
    class="pzh-pagination-button"
    :class="additionalClasses"
    :disabled="isDisabled"
  >
    <template v-if="text">{{ text }}</template>
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  text: [String, Number],
  icon: String,
  isDisabled: Boolean,
  isActive: Boolean,
});

const additionalClasses = computed(() => {
  const classes = [];
  if (props.isActive) {
    classes.push(`pzh-pagination-button--active`);
  }
  return classes.join(" ");
});
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Pagination/PaginationButton.scss"
  scoped
/>
