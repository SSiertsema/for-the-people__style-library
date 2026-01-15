<template>
  <div class="pzh-placeholder">
    <div class="pzh-placeholder__title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Placeholder/Placeholder.scss"
  scoped
/>
