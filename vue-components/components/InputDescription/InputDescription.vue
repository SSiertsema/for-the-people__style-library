<template>
  <p class="pzh-input-description">
    {{ text }}
  </p>
</template>

<style src="./InputDescription.scss"></style>

<script setup>
const props = defineProps({
  text: String,
});
</script>
