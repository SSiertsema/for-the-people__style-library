<template>
  <div
    class="segmented-button"
    :class="additionalClasses"
    role="group"
    aria-label="Segmented button group"
  >
    <button
      class="segmented-button__toggle"
      v-for="(toggle, index) in options"
      :class="{
        'segmented-button__toggle--state-active': index === optionSelectedIndex,
      }"
      @click="handleClick(toggle.id)"
      @keydown.space.prevent="handleClick(toggle.id)"
      @keydown.enter.prevent="handleClick(toggle.id)"
      :aria-pressed="index === optionSelectedIndex"
      :aria-label="toggle.label"
    >
      <i
        v-if="toggle.iconBefore"
        :class="`icon-solid--${toggle.iconBefore}`"
        aria-hidden="true"
      ></i>
      {{ toggle.label }}
      <i
        v-if="toggle.iconAfter"
        :class="`icon-solid--${toggle.iconAfter}`"
        aria-hidden="true"
      ></i>
      <span
        class="segmented-button__toggle-border"
        v-if="shouldShowBorder(index)"
      ></span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  options: Array,
  size: {
    type: String,
    default: "regular",
  },
  modelValue: {
    type: [String, Number],
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);

const mutableValue = ref(null);

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`segmented-button-size--${props.size}`);
  return classes;
});

const optionSelectedIndex = computed(() => {
  const selectedItem = props.options.find((option) => {
    return option.id === mutableValue.value;
  });
  return selectedItem ? props.options.indexOf(selectedItem) : 0;
});

onMounted(() => {
  mutableValue.value = props.modelValue;
});

function handleClick(toggleId) {
  mutableValue.value = toggleId;
  emit("update:modelValue", toggleId);
}

function shouldShowBorder(index) {
  return (
    index < props.options.length - 1 &&
    index !== mutableValue.value &&
    index + 1 !== mutableValue.value
  );
}
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/html-component-library/src/components/SegmentedButton/SegmentedButton.scss"
></style>
