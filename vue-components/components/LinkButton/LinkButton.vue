<script setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
  size: String,
  icon: String,
  href: String,
  isNuxtLink: {
    type: Boolean,
    default: false,
  },
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`link-button--${props.size}`);
  return classes.join(" ");
});

const emit = defineEmits(["click"]);
</script>

<template>
  <NuxtLink
    class="link-button"
    v-if="href && isNuxtLink"
    :to="href"
    :class="additionalClasses"
  >
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    {{ text }}
  </NuxtLink>

  <a
    class="link-button"
    v-else-if="href"
    :href="href"
    :class="additionalClasses"
  >
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    {{ text }}
  </a>

  <button
    class="link-button"
    v-else
    :class="additionalClasses"
    @click="emit('click')"
  >
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    {{ text }}
  </button>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/link-button.css"
></style>
