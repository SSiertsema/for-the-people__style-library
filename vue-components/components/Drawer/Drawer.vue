<template>
  <div class="pzh-drawer" :class="additionalClasses" @click.stop>
    <div class="pzh-drawer__header">
      <slot name="header"></slot>
      <CloseButton @click="emit('closeButtonClicked')" />
    </div>
    <div class="pzh-drawer__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import CloseButton from "../CloseButton/CloseButton.vue";
const props = defineProps({
  position: {
    type: String,
    default: "right",
  },
  isVisible: Boolean,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-drawer--position-${props.position}`);

  if (props.isVisible) {
    classes.push(`pzh-drawer--visible`);
  }
  return classes;
});

const emit = defineEmits(["closeButtonClicked"]);
</script>

<style lang="scss" src="@pzh-temporary/html-component-library/src/components/Drawer/Drawer.scss">
</style>
