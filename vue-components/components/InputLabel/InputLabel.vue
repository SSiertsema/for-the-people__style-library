<template>
  <div class="pzh-input-label" :class="additionalClasses">
    <label :for="forId">{{ text }} </label>
    <Tooltip v-if="additionalInfo" :content="additionalInfo" />
  </div>
</template>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputLabel/InputLabel.scss"
/>

<script setup>
import Tooltip from "../Tooltip/Tooltip.vue";
import { computed } from "vue";

const props = defineProps({
  text: String,
  forId: String,
  size: String,
  additionalInfo: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  if (props.size) classes.push(`pzh-input-label--size-${props.size}`);
  return classes.join(" ");
});
</script>
