<template>
  <ul class="link-list" :class="additionalClasses">
    <li v-for="option in options" :key="option">
      <Link v-bind="option" />
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import Link from "../Link/Link.vue";

const props = defineProps({
  options: Array,
  direction: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`link-list--${props.direction}`);
  return classes.join(" ");
});
</script>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/link-list.css"
/>
