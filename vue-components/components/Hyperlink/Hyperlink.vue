<template>
  <NuxtLink
    class="pzh-hyperlink"
    v-if="isNuxtLink"
    :to="href"
    :target="target"
    :class="additionalClasses"
  >
    <i v-if="iconBefore" :class="'icon-light--' + iconBefore"></i>
    <span>
      {{ text }}
    </span>
    <i v-if="iconAfter" :class="'icon-light--' + iconAfter"></i>
  </NuxtLink>
  <a
    class="pzh-hyperlink"
    v-else
    :href="href"
    :target="target"
    :class="additionalClasses"
  >
    <i v-if="iconBefore" :class="'icon-light--' + iconBefore"></i>
    <span>
      {{ text }}
    </span>
    <i v-if="iconAfter" :class="'icon-light--' + iconAfter"></i>
  </a>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  text: String,
  iconBefore: String,
  iconAfter: String,
  theme: String,
  href: String,
  target: {
    type: String,
    default: "_self",
  },
  isNuxtLink: {
    type: Boolean,
    default: false,
  },
});

const additionalClasses = computed(() => {
  const classes = [];
  if (props.theme) {
    classes.push(`pzh-hyperlink--theme-${props.theme}`);
  }
  return classes;
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Hyperlink/Hyperlink.scss"
/>
