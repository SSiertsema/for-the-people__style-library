<template>
  <div class="pzh-input-message" :class="additionalClasses">
    <i
      v-if="type === 'success'"
      class="pzh-input-message__icon icon-solid--check"
    ></i>
    <i
      v-if="type === 'warning'"
      class="pzh-input-message__icon icon-solid--circle-info"
    ></i>
    <i
      v-if="type === 'error'"
      class="pzh-input-message__icon icon-solid--triangle-exclamation"
    ></i>
    <div class="pzh-input-message__text">{{ text }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: String,
  text: String,
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium"].includes(value),
  },
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-input-message--${props.type}`);
  classes.push(`pzh-input-message--size-${props.size}`);
  return classes.join(" ");
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputMessage/InputMessage.scss"
/>
