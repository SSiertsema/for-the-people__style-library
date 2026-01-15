<template>
  <button
    class="pzh-close-button"
    :disabled="isDisabled"
    :title="actionDescription"
    @click="emit('click')"
  >
    <i class="icon-solid--xmark"></i>
  </button>
</template>

<style lang="scss" src="@pzh-temporary/html-component-library/src/components/CloseButton/CloseButton.scss">
</style>

<script setup>
const props = defineProps({
  actionDescription: String,
  isDisabled: Boolean,
});

const emit = defineEmits(["click"]);
</script>
