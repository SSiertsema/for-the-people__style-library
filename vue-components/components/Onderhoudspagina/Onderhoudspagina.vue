<template>
  <div class="pzh-onderhoudspagina">
    <div class="pzh-onderhoudspagina__content">
      <i class="pzh-onderhoudspagina__icon" :class="'icon-solid--' + icon"></i>
      <span class="pzh-onderhoudspagina__text--primair">{{
        primaryMessage
      }}</span>
      <span class="pzh-onderhoudspagina__text--secondair">{{
        secondaryMessage
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  primaryMessage: {
    type: String,
    default: "Deze applicatie is aan het updaten",
  },
  secondaryMessage: {
    type: String,
    default: "Excuses voor het gemak",
  },
  icon: {
    type: String,
    default: "person-digging",
  },
  state: String,
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Onderhoudspagina/Onderhoudspagina.scss"
></style>
