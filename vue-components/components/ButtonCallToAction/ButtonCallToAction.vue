<script setup>
import { computed } from "vue";
import Spinner from "../Spinner/Spinner.vue";

const props = defineProps({
  text: String,
  size: String,
  icon: String,
  href: String,
  isDisabled: Boolean,
  isLoading: Boolean,
  actionDescription: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`button-call-to-action--size-${props.size}`);
  if (!props.text && props.icon) {
    classes.push(`button-call-to-action--icon-only`);
  }
  return classes.join(" ");
});

const emit = defineEmits(["click"]);
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="button-call-to-action"
    :class="additionalClasses"
    :title="actionDescription"
  >
    <Spinner v-if="isLoading" size="small" />
    <i v-else-if="icon" :class="'icon-light--' + icon"></i>
    <span v-if="text">{{ text }}</span>
  </a>
  <button
    v-else
    class="button-call-to-action"
    :class="additionalClasses"
    :title="actionDescription"
    @click="emit('click')"
  >
    <Spinner v-if="isLoading" size="small" />
    <i v-else-if="icon" :class="'icon-light--' + icon"></i>
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<style scoped lang="scss" src="@pzh-temporary/html-component-library/src/components/ButtonCallToAction/ButtonCallToAction.scss">
</style>
