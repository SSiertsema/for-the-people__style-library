<script setup>
const props = defineProps({
  head: Array,
});
</script>

<template>
  <div class="table table--addministration">
    <div class="table__header">
      <div class="table__row">
        <span class="table__cell" v-for="cell in head">{{ cell }}</span>
      </div>
    </div>
    <div class="table__body">
      <slot></slot>
    </div>
  </div>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/table.css"
></style>
