<template>
  <label class="input-radio" for="id">
    <input
      class="input-radio__input"
      id="id"
      v-model="mutableValue"
      type="radio"
      name="input-radio"
    />
    <div class="input-radio__interactive-area">
      <div class="input-radio__replacement">
        <i class="input-radio__check"></i>
      </div>
      <div class="input-radio__label">
        {{ label }}
      </div>
    </div>
  </label>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  label: String,
  modelValue: Boolean,
});

const mutableValue = ref("");

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  mutableValue.value = props.modelValue;
});

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/input-radio.css"
/>
