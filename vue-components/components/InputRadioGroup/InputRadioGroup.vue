<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  label: String,
  modelValue: String,
  options: Array,
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const mutableValue = ref(props.modelValue);

watch(mutableValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (newVal) => {
    mutableValue.value = newVal;
  },
);
</script>

<template>
  <div class="input-radio-group">
    <label class="input-radio-group__label">{{ label }}</label>
    <ul class="input-radio-group__list">
      <li v-for="option in options" :key="option">
        <label class="pzh-input-radio" :for="props.name + '-' + option">
          <input
            class="pzh-input-radio__input"
            v-model="mutableValue"
            type="radio"
            :name="props.name"
            :value="option"
            :id="props.name + '-' + option"
          />
          <div class="pzh-input-radio__interactive-area">
            <div class="pzh-input-radio__replacement">
              <i class="pzh-input-radio__check"></i>
            </div>
            <div class="pzh-input-radio__label">{{ option }}</div>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use "@pzh-temporary/pzh-html-component-library/components/input-radio-group.css"
  as *;
@use "@pzh-temporary/html-component-library/src/components/RadioButton/RadioButton.scss"
  as *;
</style>
