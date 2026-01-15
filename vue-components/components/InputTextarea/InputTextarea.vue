<template>
  <div class="pzh-input-textarea" :class="additionalClasses">
    <InputLabel
      v-if="label"
      :text="label"
      :size="size"
      :for-id="id"
      :additional-info="additionalInfo"
    />
    <InputDescription v-if="description" :text="description" />
    <div class="pzh-input-textarea__input-icon-wrapper">
      <textarea
        class="pzh-input-textarea__input"
        v-model="mutableValue"
        :id="id"
        :placeholder="placeholder"
        :disabled="disabled"
        rows="5"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>

      <div
        class="pzh-input-textarea__icon pzh-input-textarea__icon--success"
        v-if="showSuccessState"
      >
        <i class="icon-solid--circle-check"></i>
      </div>
      <div
        class="pzh-input-textarea__icon pzh-input-textarea__icon--error"
        v-if="showError"
      >
        <i class="icon-solid--exclamation"></i>
      </div>
    </div>

    <InputMessages
      v-if="messagesToShow.length"
      :messages="messagesToShow"
      :size="size"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import {
  validate,
  validationConfigurationProp as validationConfiguration,
} from "../../composables/validation";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";
import InputMessages from "../InputMessages/InputMessages.vue";

const props = defineProps({
  label: String,
  description: String,
  placeholder: String,
  additionalInfo: String,
  modelValue: [String, Number],
  disabled: {
    type: Boolean,
    default: false,
  },
  validationConfiguration,
  shouldShowSuccessState: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: Array,
    default: () => {
      return [];
    },
  },
  description: String,
  size: String,
  name: String,
});

const emit = defineEmits(["update:modelValue"]);

const haveBeenBlurred = ref(false);
const hasFocus = ref(false);
const mutableValue = ref("");
const forcedValidation = ref(false);
const initialValue = ref("");
const id = ref("");

const messagesToShow = computed(() => {
  if (showError.value === false) {
    return props.messages;
  }

  const validationMessages = validationReport.value.messages.map((x) => {
    return { type: "error", text: x };
  });

  return [...props.messages, ...validationMessages];
});

const additionalClasses = computed(() => {
  const classes = [];
  if (props.size) classes.push(`pzh-input-textarea--size-${props.size}`);

  if (showError.value === true) {
    classes.push(`pzh-input-textarea--state-error`);
  } else if (showSuccessState.value) {
    classes.push(`pzh-input-textarea--state-success`);
  }
  return classes.join(" ");
});

const valueHasChanged = computed(() => {
  return initialValue.value !== mutableValue.value;
});

const hasValue = computed(() => {
  if (typeof mutableValue.value === "undefined") return false;
  return mutableValue.value.trim().length > 0;
});

const showError = computed(() => {
  if (typeof props.validationConfiguration === "undefined") return false;
  const invalid = !valueIsValid.value;

  if (forcedValidation.value && invalid) {
    return true;
  }

  if (!hasValue.value && !valueHasChanged.value && !haveBeenBlurred.value) {
    return false;
  }
  if (hasFocus.value) {
    if (haveBeenBlurred.value && invalid) {
      return true;
    }
  } else {
    if (invalid) {
      return true;
    }
  }

  return false;
});

const showSuccessState = computed(() => {
  if (typeof props.validationConfiguration === "undefined") return false;
  if (!props.shouldShowSuccessState) return false;

  if (forcedValidation.value && valueIsValid.value) {
    return true;
  }

  return valueHasChanged.value && valueIsValid.value;
});

const validationReport = computed(() => {
  if (typeof props.validationConfiguration === "undefined") return;
  return validate(props.validationConfiguration, mutableValue.value);
});

const valueIsValid = computed(() => {
  if (typeof validationReport.value === "undefined") return true;
  return validationReport.value.isValid;
});

function handleBlur() {
  hasFocus.value = false;
  haveBeenBlurred.value = true;
}

function handleFocus() {
  hasFocus.value = true;
}

function forceValidation() {
  forcedValidation.value = true;
  return validationReport.value;
}

onMounted(() => {
  id.value = uuidv4();
  initialValue.value = props.modelValue;
  mutableValue.value = props.modelValue;
});

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});

defineExpose({ forceValidation, valueIsValid });
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputTextarea/InputTextarea.scss"
/>
