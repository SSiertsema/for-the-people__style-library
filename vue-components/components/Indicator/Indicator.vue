<template>
  <div class="pzh-indicator" :class="additionalClasses">
    <span>
      {{ text }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  text: String,
  size: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-indicator--size-${props.size}`);
  if (props.text) {
    if (props.text.length > 1) {
      classes.push("pzh-indicator--has-multiple-digits");
    } else {
      classes.push("pzh-indicator--has-single-digit");
    }
  } else {
    classes.push("pzh-indicator--without-content");
  }
  return classes.join(" ");
});
</script>

<style scoped lang="scss" src="@pzh-temporary/html-component-library/src/components/Indicator/Indicator.scss">
</style>
