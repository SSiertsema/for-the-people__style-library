<script setup>
import { computed } from "vue";

const props = defineProps({
  message: String,
  size: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  if (props.size) classes.push(`loader--${props.size}`);
  return classes.join(" ");
});
</script>

<template>
  <div class="loader" :class="additionalClasses">
    <i class="loader__icon icon-solid--spinner"></i>
    <div class="loader__message" v-if="message">
      {{ message }}
    </div>
    <slot></slot>
  </div>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/loader.css"
></style>
