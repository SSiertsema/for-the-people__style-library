<script setup>
import Spinner from "../Spinner/Spinner.vue";
import { computed } from "vue";

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
  classes.push(`button-secondary--size-${props.size}`);
  return classes.join(" ");
});

const emit = defineEmits(["click"]);
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="button-secondary"
    :class="additionalClasses"
    :title="actionDescription"
  >
    <Spinner v-if="isLoading" size="small" />
    <i v-else-if="icon" :class="'icon-light--' + icon"></i>
    <span v-if="text">{{ text }}</span>
  </a>

  <button
    v-else
    class="button-secondary"
    :class="additionalClasses"
    :disabled="isDisabled"
    :title="actionDescription"
    @click="emit('click')"
  >
    <Spinner v-if="isLoading" size="small" />
    <i v-else-if="icon" :class="'icon-light--' + icon"></i>
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<style scoped lang="scss" src="@pzh-temporary/html-component-library/src/components/ButtonSecondary/ButtonSecondary.scss">
</style>
