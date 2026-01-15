<template>
  <div class="layer-control">
    <InputText
      v-model="searchValue"
      type="search"
      size="small"
      label="Filter kaartlagen"
    />
    <InputRadioGroup
      v-model="selectedTopic"
      :options="inputRadioOptions"
      label="Kaartlagen"
    />
  </div>
</template>
jhuy

<script setup>
import { ref, watch, computed, defineEmits } from "vue";
import InputRadioGroup from "../InputRadioGroup/InputRadioGroup.vue";
import InputText from "../InputText/InputText.vue";

const props = defineProps({
  layerTopics: Array,
});

const emit = defineEmits(["selected"]);

const selectedTopic = ref(null);
const searchValue = ref("");

const inputRadioOptions = computed(() => {
  return props.layerTopics.filter((topic) =>
    topic.toLowerCase().includes(searchValue.value.toLowerCase()),
  );
});

watch(
  () => selectedTopic.value,
  (newVal) => {
    emit("selected", newVal);
  },
);
</script>

<style lang="scss" scoped>
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/spacers.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/levitation.scss" as *;
@use "@pzh-temporary/style-library/src/scss/variables/colors.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/breakpoint.scss" as *;

.layer-control {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  width: 200px;
  min-height: 50%;
  max-height: calc(100% - 50px);
  overflow-y: auto;
  @include typography(text, s);
  .input-radio-group {
    margin-top: $space-3;
  }
}
</style>
