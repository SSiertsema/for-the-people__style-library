<script setup>
const props = defineProps({
  name: String,
  description: String,
});
</script>

<template>
  <div class="custom-popup">
    <h2 v-if="name">{{ name }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;

h2 {
  @include typography(text, m, true);
}

p {
  @include typography(text, s);
}
</style>
