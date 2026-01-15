<template>
  <div class="input-checkbox-button" :class="modifiers" :title="title">
    <input
      v-model="mutableValue"
      class="input-checkbox-button__input"
      type="checkbox"
      :name="name"
      :id="id"
      :disabled="disabled"
      @change="emit('change', mutableValue)"
    />
    <label class="input-checkbox-button__button" :for="id">
      <div class="input-checkbox-button__replacement">
        <i class="input-checkbox-button__checkmark icon-solid--check"></i>
      </div>
      <div class="input-checkbox-button__label">
        <i v-if="icon" :class="'icon-' + iconType + '--' + icon"></i>
        <template v-else>{{ label }}</template>
      </div>
    </label>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  label: String,
  size: String,
  modelValue: Boolean,
  name: String,
  icon: String,
  title: String,
  iconType: {
    type: String,
    default: "light",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const mutableValue = ref(props.modelValue);
const id = ref();
const emit = defineEmits(["update:modelValue", "change"]);

const modifiers = computed(() => {
  const classes = [];
  if (typeof props.size !== "undefined")
    classes.push(`input-checkbox-button--${props.size}`);

  if (props.disabled) {
    classes.push(`input-checkbox-button--disabled`);
  }
  return classes.join(" ");
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      mutableValue.value = props.modelValue;
    }
  }
);

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});

onMounted(() => {
  id.value = uuidv4();
});
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/input-checkbox-button.css"
/>
