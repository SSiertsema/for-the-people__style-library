<template>
  <div class="pzh-input-select" :class="additionalClasses">
    <InputLabel
      v-if="label"
      :text="label"
      :size="size"
      :for-id="id"
      :additional-info="additionalInfo"
    />
    <InputDescription v-if="description" :text="description" />
    <div class="pzh-input-select__input-wrapper" :class="additionalClasses">
      <select
        class="pzh-input-select__input"
        v-model="mutableValue"
        :id="id"
        :disabled="disabled"
        :title="title"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="emitChange($event.target.value)"
      >
        <option v-if="placeholder" :value="null" selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <i class="pzh-input-select__icon icon-light--chevron-down"></i>
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
import InputMessages from "../InputMessages/InputMessages.vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";

import {
  validate,
  validationConfigurationProp as validationConfiguration,
} from "../../composables/validation";

const props = defineProps({
  label: String,
  description: String,
  options: Array,
  title: String,
  modelValue: [String, Number],
  additionalInfo: String,
  placeholder: {
    type: String,
    default: "Selecteer een optie",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  validationConfiguration,
  size: {
    type: String,
    default: "medium",
  },

  messages: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const haveBeenBlurred = ref(false);
const hasFocus = ref(false);
const mutableValue = ref("");
const forcedValidation = ref(false);
const initialValue = ref("");

const id = ref();

const additionalClasses = computed(() => {
  const classes = [];
  if (props.size) classes.push(`pzh-input-select--${props.size}`);
  if (props.disabled) classes.push("pzh-input-select--disabled");
  if (showError.value === true) {
    classes.push(`pzh-input-select--state-error`);
  }
  return classes.join(" ");
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

const hasValue = computed(() => {
  if (typeof mutableValue.value === "undefined") return false;
  if (mutableValue.value === null) return false;
  return String(mutableValue.value).trim().length > 0;
});

const valueHasChanged = computed(() => {
  return initialValue.value !== mutableValue.value;
});

const validationReport = computed(() => {
  return validate(props.validationConfiguration, mutableValue.value);
});

const valueIsValid = computed(() => {
  return validationReport.value.isValid;
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

function handleBlur() {
  hasFocus.value = false;
  haveBeenBlurred.value = true;
  emit("blur", mutableValue.value);
}

function syncModelValue() {
  mutableValue.value = props.modelValue === "" ? null : props.modelValue;
  initialValue.value = mutableValue.value;
}

function emitChange(value) {
  emit("change", value);
}

function forceValidation() {
  forcedValidation.value = true;
  return validationReport.value;
}

onMounted(() => {
  id.value = uuidv4();
  syncModelValue();
});

watch(mutableValue, () => {
  emit("update:modelValue", mutableValue.value);
});

watch(
  () => props.modelValue,
  () => {
    syncModelValue();
  },
);

defineExpose({ forceValidation, valueIsValid });
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputSelect/InputSelect.scss"
></style>
