<template>
  <label class="pzh-input-checkbox" :class="additionalClasses" :for="nameId">
    <input
      class="pzh-input-checkbox__input"
      v-model="mutableValue"
      type="checkbox"
      :name="name"
      :disabled="isDisabled"
      :id="nameId"
      @change="handleChange"
    />
    <div class="pzh-input-checkbox__interactive-area">
      <div class="pzh-input-checkbox__replacement">
        <i class="pzh-input-checkbox__checkmark icon-solid--check"></i>
      </div>
      <div class="pzh-input-checkbox__label">
        {{ label }}
      </div>
    </div>
  </label>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  label: String,
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isDisabled: Boolean,
  size: {
    type: String,
    default: "medium",
  },
});

const nameId = computed(() => {
  return `${props.name}-${props.id}`;
});

const emit = defineEmits(["update:modelValue", "change"]);

const mutableValue = ref(props.modelValue);

function syncMutableValue() {
  mutableValue.value = props.modelValue;
}

function handleChange() {
  emit("change", mutableValue.value);
}

watch(
  () => props.modelValue,
  () => {
    syncMutableValue();
  },
);

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-input-checkbox--size-${props.size}`);
  return classes.join(" ");
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputCheckbox/InputCheckbox.scss"
/>
