<template>
  <div class="pzh-modal" :class="modifiers">
    <div class="pzh-modal__backdrop" @click="handleBackdropClick"></div>
    <div class="pzh-modal__box" @click.stop>
      <CloseButton v-if="enableCloseButton" @click="handleCloseButtonClick" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import CloseButton from "../../CloseButton/CloseButton.vue";
import { computed, onMounted, watch, onBeforeUnmount } from "vue";
const props = defineProps({
  size: {
    type: String,
    default: "medium",
  },
  enableCloseButton: {
    type: Boolean,
    default: false,
  },
});

const modifiers = computed(() => {
  const classes = [];
  classes.push(`pzh-modal--size-${props.size}`);
  return classes.join(" ");
});

const emit = defineEmits(["backdropClick", "closeButtonClick", "close"]);

function handleBackdropClick() {
  emit("backdropClick");
  emit("close");
}

function handleCloseButtonClick() {
  exitFullscreen();
  emit("closeButtonClick");
  emit("close");
}

function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen(); // Firefox
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(); // Chrome, Safari and Opera
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen(); // IE/Edge
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

watch(
  () => props.size,
  (newSize) => {
    if (newSize === "full-screen") {
      enterFullScreen();
    }
  },
  { immediate: true },
);

onMounted(() => {
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === null) {
      emit("close");
    }
  });
});
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Modal/Modal.scss"
  scoped
/>
