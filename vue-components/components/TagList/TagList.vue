<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag">
      <Tag
        :text="tag.text"
        :removable="tag.removable"
        @click="handleClick(tag)"
      />
    </li>
  </ul>
</template>

<script setup>
import Tag from "../Tag/Tag.vue";

const props = defineProps({
  tags: Array,
});

const emit = defineEmits(["remove"]);

function handleClick(tag) {
  if (!tag.removable) {
    return;
  }
  emit("remove", tag);
}
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/tag-list.css"
></style>
