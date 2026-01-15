<template>
  <div class="pzh-input-text" :class="additionalClasses">
    <InputLabel
      v-if="label"
      :text="label"
      :size="size"
      :for-id="id"
      :additional-info="additionalInfo"
    />
    <InputDescription v-if="description" :text="description" />
    <div class="pzh-input-text__input-icon-wrapper">
      <input
        class="pzh-input-text__input"
        v-bind="$attrs"
        v-model="mutableValue"
        :name="name"
        :id="id"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :disabled="disabled"
        :list="list"
      />

      <datalist v-if="suggestions && enableDatalist" :id="list">
        <option
          v-for="suggestion in suggestions"
          :value="suggestion.value"
        ></option>
      </datalist>

      <div
        class="pzh-input-text__icon pzh-input-text__icon--success"
        v-if="showSuccessState"
      >
        <i class="icon-solid--circle-check"></i>
      </div>
    </div>
    <InputMessages v-if="messagesToShow.length" :messages="messagesToShow" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";
import InputMessages from "../InputMessages/InputMessages.vue";
import {
  validate,
  validationConfigurationProp as validationConfiguration,
} from "../../composables/validation";

const props = defineProps({
  label: String,
  description: String,
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
  size: String,
  name: String,
  list: String,
  suggestions: Array,
  suggestionThreshold: Number,
  disableNativeWidget: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "change"]);

const haveBeenBlurred = ref(false);
const hasFocus = ref(false);
const mutableValue = ref("");
const forcedValidation = ref(false);
const initialValue = ref("");
const id = ref("");
const datalist = ref(null);

function handleChange() {
  emit("change", mutableValue.value);
}

const enableDatalist = computed(() => {
  if (mutableValue.value == null) return false;
  if (typeof props.suggestionThreshold === "undefined") return true;
  return mutableValue.value.length >= props.suggestionThreshold;
});

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
  if (props.size) classes.push(`pzh-input-text--size-${props.size}`);

  if (props.disableNativeWidget) {
    classes.push(`pzh-input-text--native-widget-disabled`);
  }

  if (showError.value === true) {
    classes.push(`pzh-input-text--state-error`);
  } else if (showSuccessState.value) {
    classes.push(`pzh-input-text--state-success`);
  }
  return classes.join(" ");
});

const valueHasChanged = computed(() => {
  return initialValue.value !== mutableValue.value;
});

const hasValue = computed(() => {
  if (typeof mutableValue.value === "undefined") return false;
  if (mutableValue.value === null) return false;
  return String(mutableValue.value).trim().length > 0;
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
  return validate(props.validationConfiguration, mutableValue.value);
});

const valueIsValid = computed(() => {
  return validationReport.value.isValid;
});

function handleBlur() {
  hasFocus.value = false;
  haveBeenBlurred.value = true;
  emit("blur", mutableValue.value);
}

function handleFocus() {
  hasFocus.value = true;
}

function forceValidation() {
  forcedValidation.value = true;
  return validationReport.value;
}

initialValue.value = props.modelValue;
mutableValue.value = props.modelValue;

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});

watch(
  () => props.modelValue,
  () => {
    initialValue.value = props.modelValue;
    mutableValue.value = props.modelValue;
  },
);

onMounted(() => {
  id.value = uuidv4();
});

defineExpose({ forceValidation, valueIsValid, hasFocus });
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputText/InputText.scss"
/>
