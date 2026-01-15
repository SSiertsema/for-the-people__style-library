<script setup>
const props = defineProps({
  items: Array,
  isNuxtLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <ul class="pzh-breadcrumbs">
    <li v-for="item in items">
      <NuxtLink
        v-if="item.href && isNuxtLink"
        :to="item.href"
        class="pzh-breadcrumbs__link"
      >
        <span>
          {{ item.text }}
        </span>
      </NuxtLink>
      <a v-else-if="item.href" :href="item.href" class="pzh-breadcrumbs__link">
        <span>
          {{ item.text }}
        </span>
      </a>
      <span v-else class="pzh-breadcrumbs__text">{{ item.text }}</span>
    </li>
  </ul>
</template>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Breadcrumbs/Breadcrumbs.scss"
></style>
