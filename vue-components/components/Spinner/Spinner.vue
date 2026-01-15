<template>
  <div class="pzh-spinner" :class="additionalClasses">
    <i class="pzh-spinner__icon icon-solid--spinner"></i>
  </div>
</template>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Spinner/Spinner.scss"
></style>

<script setup>
import { computed } from "vue";

const props = defineProps({
  size: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-spinner--size-${props.size}`);
  return classes.join(" ");
});
</script>
