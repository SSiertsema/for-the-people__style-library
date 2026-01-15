<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="header in headers">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data">
        <td v-for="cell in row">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  headers: Array,
  data: Array,
});
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Table/DataTable/DataTable.scss"
  scoped
/>
