<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  text: String,
  iconBefore: String,
  iconAfter: String,
  href: String,
  isNuxtLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <NuxtLink v-if="href && isNuxtLink" :to="href" class="link">
    <i v-if="iconBefore" :class="'icon-solid--' + iconBefore"></i>
    <span>
      {{ text }}
    </span>
    <i v-if="iconAfter" :class="'icon-solid--' + iconAfter"></i>
  </NuxtLink>
  <a v-else-if="href" :href="href" class="link">
    <i v-if="iconBefore" :class="'icon-solid--' + iconBefore"></i>
    <span>
      {{ text }}
    </span>
    <i v-if="iconAfter" :class="'icon-solid--' + iconAfter"></i>
  </a>
  <button v-else class="link" @click="emit('click')">
    <i v-if="iconBefore" :class="'icon-solid--' + iconBefore"></i>
    <span>
      {{ text }}
    </span>
    <i v-if="iconAfter" :class="'icon-solid--' + iconAfter"></i>
  </button>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/link.css"
></style>
