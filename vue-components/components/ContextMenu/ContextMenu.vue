<script setup>
import { computed } from "vue";
const props = defineProps({
  position: {
    type: String,
  },
  alignment: {
    type: String,
  },
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`context-menu--position-${props.position}`);
  classes.push(`context-menu--align-${props.alignment}`);
  return classes.join(" ");
});
</script>

<template>
  <div class="context-menu" :class="additionalClasses">
    <slot></slot>
    <div class="context-menu__arrow"></div>
  </div>
</template>

<style
  scoped
  src="@pzh-temporary/pzh-html-component-library/components/context-menu.css"
/>
