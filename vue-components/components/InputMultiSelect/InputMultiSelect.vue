<template>
  <div class="pzh-input-multiselect" :class="modifiers">
    <InputLabel
      v-if="label"
      :text="label"
      :size="size"
      :additional-info="additionalInfo"
    />
    <InputDescription v-if="description" :text="description" />

    <div class="pzh-input-multiselect__button-and-options">
      <button
        class="pzh-input-multiselect__button"
        type="button"
        @click.stop="showOptions = !showOptions"
        :disabled="disabled"
      >
        <div class="pzh-input-multiselect__placeholder">
          {{ conditionalPlaceholder }}
        </div>
        <i class="pzh-input-multiselect__icon icon-solid--chevron-down"></i>
      </button>
      <div
        class="pzh-input-multiselect__options"
        v-if="showOptions"
        :class="additionalClassesOptionsBox"
        @click.stop
      >
        <InputCheckboxes v-model="mutableOptions" size="small" />
      </div>
    </div>
    <TagList
      class="pzh-input-multiselect__selected-options"
      v-if="tags.length > 0"
      :tags="tags"
      @remove="handleTagClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onDeactivated, watch, computed } from "vue";
import InputCheckboxes from "../InputCheckboxes/InputCheckboxes.vue";
import TagList from "../TagList/TagList.vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import InputDescription from "../InputDescription/InputDescription.vue";

const props = defineProps({
  label: String,
  description: String,
  placeholder: String,
  modelValue: Array,
  size: String,
  optionsBoxSize: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  additionalInfo: String,
});

const emit = defineEmits(["update:modelValue"]);

function handleTagClick(tag) {
  const targetId = tag.id;
  for (let i = 0; i < mutableOptions.value.length; i++) {
    const option = mutableOptions.value[i];
    if (option.id === targetId) {
      option.modelValue = false;
      return;
    }
  }
}

const conditionalPlaceholder = computed(() => {
  if (tags.value.length === 0) {
    return props.placeholder;
  }

  if (tags.value.length === 1) {
    return "1 optie geselecteerd";
  }

  if (tags.value.length > 1) {
    return `${tags.value.length} opties geselecteerd`;
  }
});

const mutableOptions = ref(props.modelValue);

const showOptions = ref(false);
const selectedOptions = computed(() => {
  return mutableOptions.value.filter((x) => x.modelValue === true);
});

const tags = computed(() => {
  return selectedOptions.value.map((x) => {
    return {
      text: x.label,
      id: x.id,
      removable: true,
    };
  });
});

function syncMutableOptions() {
  mutableOptions.value = props.modelValue;
}

const modifiers = computed(() => {
  const classes = [];
  if (typeof props.size !== "undefined") {
    classes.push(`pzh-input-multiselect--size-${props.size}`);
  }

  if (props.disabled) {
    classes.push(`pzh-input-multiselect--disabled`);
  }

  if (showOptions.value === true) {
    classes.push(`pzh-input-multiselect--open`);
  }
  return classes.join(" ");
});

function handleDocumentClick() {
  showOptions.value = false;
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    showOptions.value = false;
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleDocumentClick);
});

onDeactivated(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleDocumentClick);
});

watch(
  () => props.modelValue,
  () => {
    syncMutableOptions();
  },
  { deep: true },
);

watch(
  mutableOptions,
  () => {
    emit("update:modelValue", mutableOptions.value);
  },
  { deep: true },
);

const additionalClassesOptionsBox = computed(() => {
  const classes = [];
  if (props.optionsBoxSize)
    classes.push(
      `pzh-input-multiselect__options--size-${props.optionsBoxSize}`,
    );
  return classes.join(" ");
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputSelectMultiple/InputSelectMultiple.scss"
></style>
