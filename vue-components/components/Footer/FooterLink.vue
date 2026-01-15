<template>
  <NuxtLink v-if="isNuxtLink" :to="href" class="pzh-footer__link">
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    <span>
      {{ text }}
    </span>
  </NuxtLink>
  <a v-else :href="href" :target="target" class="pzh-footer__link">
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    <span>
      {{ text }}
    </span>
  </a>
</template>

<script setup>
const props = defineProps({
  text: String,
  icon: String,
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
</script>
