<template>
  <div class="toast" :class="additionalClasses">
    <i class="toast__icon" :class="'icon-light--' + iconClass"></i>
    {{ message }}
    <button class="toast__close-button" type="button" @click="handleClick()">
      <i class="icon-solid--xmark"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  message: String,
  type: String,
});

const emit = defineEmits(["close"]);

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`toast--${props.type}`);
  return classes.join(" ");
});

const iconClass = computed(() => {
  switch (props.type) {
    case "info":
      return `circle-info`;
    case "success":
      return `circle-check`;
    default:
      return `circle-exclamation`;
  }
});

function handleClick() {
  emit("close");
}
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/toast.css"
/>
