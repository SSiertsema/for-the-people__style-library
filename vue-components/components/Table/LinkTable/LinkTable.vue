<template>
  <div class="pzh-link-table">
    <div class="pzh-link-table__thead">
      <div class="pzh-link-table__tr">
        <div class="pzh-link-table__th" v-for="header in headers">
          {{ header }}
        </div>
      </div>
    </div>
    <div class="pzh-link-table__tbody">
      <template v-for="row in rows" :key="row.id">
        <NuxtLink
          class="pzh-link-table__tr"
          v-if="row.href && row.isNuxtLink"
          :to="row.href"
          @click="emit('rowActivated', row)"
        >
          <div class="pzh-link-table__td" v-for="cell in row.data">
            {{ cell }}
          </div>
        </NuxtLink>
        <a
          class="pzh-link-table__tr"
          v-else-if="row.href"
          :href="row.href"
          @click="emit('rowActivated', row)"
        >
          <div class="pzh-link-table__td" v-for="cell in row.data">
            {{ cell }}
          </div>
        </a>
        <a
          class="pzh-link-table__tr"
          v-else
          href="#"
          @click.stop="emit('rowActivated', row)"
        >
          <div class="pzh-link-table__td" v-for="cell in row.data">
            {{ cell }}
          </div>
        </a>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: Array,
  rows: Array,
});

const emit = defineEmits(["rowActivated"]);
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Table/LinkTable/LinkTable.scss"
  scoped
/>
