<template>
  <div class="pzh-message" :class="additionalClasses">
    <i class="pzh-message__icon" :class="iconClasses"></i>
    <div class="pzh-message__text-section">
      <div v-if="title" class="pzh-message__title">{{ title }}</div>
      <span v-if="message" class="pzh-message__text">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  message: String,
  type: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-message--type-${props.type}`);
  return classes.join(" ");
});

const iconClasses = computed(() => {
  const classes = [];
  let iconType;
  if (props.type === "info") {
    iconType = "circle-info";
  } else if (props.type === "warning") {
    iconType = "triangle-exclamation";
  } else if (props.type === "success") {
    iconType = "circle-check";
  } else if (props.type === "error") {
    iconType = "ban";
  }
  classes.push(`icon-solid--${iconType}`);
  return classes.join(" ");
});
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Message/Message.scss"
  scoped
/>
