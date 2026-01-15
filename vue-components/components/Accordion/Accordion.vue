<script setup>
const props = defineProps({
  title: String,
  accordionItems: Array,
});
</script>

<template>
  <div class="pzh-accordion">
    <h3 class="pzh-accordion__title" v-if="title">{{ title }}</h3>
    <ul>
      <li v-for="(item, index) in accordionItems" :key="index">
        <details class="pzh-accordion-item" :open="item.isOpen">
          <summary class="pzh-accordion-item__title">
            {{ item.title }}
            <i class="pzh-accordion-item__icon icon-solid--chevron-down"></i>
          </summary>
          <div class="pzh-accordion-item__description">
            {{ item.description }}
          </div>
        </details>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss" src="@pzh-temporary/html-component-library/src/components/Accordion/Accordion.scss">
</style>
