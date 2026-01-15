<template>
  <div class="pzh-input-file" :class="additionalClasses">
    <InputLabel
      :text="label"
      for-id="input-file"
      :additional-info="additionalInfo"
    />
    <InputDescription :text="beschrijving" />
    <div class="pzh-input-file__input-wrapper">
      <input
        class="pzh-input-file__input"
        id="input-file"
        type="file"
        ref="fileInput"
        :accept="allowedFileTypes ? allowedFileTypes.join(',') : null"
        @change="handleFileSelect"
      />
      <InputText
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :modelValue="fileName"
        readonly
      />
      <ButtonPrimary :text="buttonText" :size="size" :disabled="disabled" />
    </div>
  </div>
</template>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputFile/InputFile.scss"
></style>

<script setup>
import { ref, watch, computed } from "vue";
import InputText from "../InputText/InputText.vue";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary.vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";

const props = defineProps({
  label: String,
  beschrijving: String,
  buttonText: String,
  placeholder: String,
  size: String,
  disabled: Boolean,
  modelValue: Object,
  additionalInfo: String,
  allowedFileTypes: Array,
});

const mutableValue = ref(props.modelValue);

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-input-file--size-${props.size}`);
  return classes;
});

function handleFileSelect(event) {
  mutableValue.value = event.target.files[0];
  emit("update:modelValue", mutableValue.value);
}

const fileName = computed(() => {
  if (mutableValue.value instanceof File) {
    return mutableValue.value.name;
  } else {
    return mutableValue.value?.filename ?? "Geen bestand geselecteerd";
  }
});

watch(
  () => props.modelValue,
  () => {
    upSync();
  },
);

function upSync() {
  mutableValue.value = props.modelValue;
}

const emit = defineEmits(["update:modelValue"]);
</script>
