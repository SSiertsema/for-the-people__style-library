<template>
  <div class="pzh-input-text" :class="additionalClasses">
    <InputLabel v-if="label" :for-id="id" :text="label" :size="size" />
    <InputDescription v-if="description" :text="description" :size="size" />
    <div class="pzh-input-text__input-icon-wrapper">
      <input
        class="pzh-input-text__input"
        :id="id"
        :placeholder="placeholder"
        :type="inputType"
        :disabled="isDisabled"
        :readonly="isReadonly"
        v-model="model"
      />
      <div
        class="pzh-input-text__icon pzh-input-text__icon--error"
        v-if="state === 'error'"
      >
        <i class="icon-solid--triangle-exclamation"></i>
      </div>
      <div
        class="pzh-input-text__icon pzh-input-text__icon--success"
        v-if="state === 'success'"
      >
        <i class="icon-solid--circle-check"></i>
      </div>
    </div>
    <InputMessages
      v-if="inputMessages"
      :messages="inputMessages"
      :size="size"
    />
  </div>
</template>

<style src="./InputText.scss"></style>

<script setup>
import { computed, useId } from "vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";
import InputMessages from "../InputMessages/InputMessages.vue";

const model = defineModel({ type: String, default: "" });

const props = defineProps({
  description: String,
  inputMessages: Array,
  inputType: {
    type: String,
    default: "text",
    validator: (v) => ["text", "password", "email", "tel", "url", "search", "number"].includes(v),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  label: String,
  placeholder: String,
  size: {
    type: String,
    default: "medium",
    validator: (v) => ["small", "medium", "large"].includes(v),
  },
  state: {
    type: String,
    default: "idle",
    validator: (v) => ["idle", "error", "success"].includes(v),
  },
});

const id = useId();

const additionalClasses = computed(() => [
  `pzh-input-text--size-${props.size}`,
  `pzh-input-text--state-${props.state}`,
].join(" "));
</script>
