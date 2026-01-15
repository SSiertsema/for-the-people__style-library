<template>
  <button
    type="button"
    class="tag"
    :class="additionalClasses"
    @click="handleClick()"
  >
    <span>{{ text }}</span>
    <i class="tag__icon icon-solid--xmark" v-if="removable"></i>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  removable: Boolean,
  text: String,
});

const emit = defineEmits(["remove"]);

const additionalClasses = computed(() => {
  const classes = [];
  if (props.removable) {
    classes.push(`tag--removable`);
  }
  return classes.join(" ");
});

function handleClick() {
  emit("remove");
}
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/tag.css"
/>
