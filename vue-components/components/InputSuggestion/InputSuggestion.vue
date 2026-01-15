<template>
  <InputText
    v-bind="$attrs"
    v-model="mutableValue"
    ref="input"
    :list="list"
    :suggestions="suggestions"
    :suggestionThreshold="suggestionThreshold"
    autocomplete="off"
    @blur="handleBlur"
    @change="handleChange"
    :additional-info="additionalInfo"
  />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import InputText from "../InputText/InputText.vue";

const props = defineProps({
  modelValue: String,
  additionalInfo: String,
  list: String,
  suggestionThreshold: {
    type: Number,
    default: 2,
  },
  suggestions: {
    type: Array,
    default: () => {
      return [
        {
          value: "Edge",
          otherProp: "otherProp",
        },
        {
          value: "Chrome",
          otherProp: "otherProp",
        },
      ];
    },
  },
});

const input = ref(null);

const mutableValue = ref(props.modelValue);

const valueHasExactMatch = computed(() => {
  return props.suggestions.some(
    (suggestion) => suggestion.value === mutableValue.value,
  );
});

function handleChange() {
  const exactMatch = valueHasExactMatch.value;
  const inputHasFocus = input.value.hasFocus;
  if (inputHasFocus && exactMatch) {
    emit("suggestionSelected", mutableValue.value);
  }
}

const selectedSuggestion = computed(() => {
  return props.suggestions.find(
    (suggestion) => suggestion.value === mutableValue.value,
  );
});

function handleBlur() {
  emit("blur", mutableValue.value);
}

const emit = defineEmits(["update:modelValue", "suggestionSelected", "blur"]);

watch(
  () => props.modelValue,
  () => {
    mutableValue.value = props.modelValue;
  },
);

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/input-suggestion.css"
/>
