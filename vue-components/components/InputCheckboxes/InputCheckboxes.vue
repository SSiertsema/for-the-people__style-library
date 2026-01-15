<template>
  <div class="pzh-input-checkboxes" :class="additionalClasses">
    <InputLabel v-if="label" :text="label" :additional-info="additionalInfo" />
    <InputDescription v-if="description" :text="description" />
    <ul class="pzh-input-checkboxes__collection">
      <li v-for="option in mutableOptions" :key="option.id">
        <InputCheckbox
          v-bind="option"
          @update:modelValue="option.modelValue = $event"
          @change="handleChange"
          :size="size"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import InputCheckbox from "../InputCheckbox/InputCheckbox.vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";

const props = defineProps({
  label: String,
  description: String,
  modelValue: Array,
  additionalInfo: String,
  direction: {
    type: String,
    default: "vertical",
  },
  size: {
    type: String,
    default: "medium",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const mutableOptions = ref(props.modelValue);

function syncMutableOptions() {
  mutableOptions.value = props.modelValue;
}

function handleChange() {
  emit("change", mutableOptions.value);
}

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-input-checkboxes--direction-${props.direction}`);
  classes.push(`pzh-input-checkboxes--size-${props.size}`);
  return classes.join(" ");
});

watch(
  mutableOptions,
  () => {
    emit("update:modelValue", mutableOptions.value);
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  () => {
    syncMutableOptions();
  },
  { deep: true },
);
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/html-component-library/src/components/InputCheckboxes/InputCheckboxes.scss"
/>
