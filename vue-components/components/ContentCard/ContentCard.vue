<script setup>
const props = defineProps({
  imgSrc: String,
  title: String,
  subTitle: String,
  description: String,
  buttonText: String,
});
</script>

<template>
  <div class="content-card">
    <div class="content-card__image-wrapper">
      <img :src="imgSrc" />
    </div>
    <div class="content-card__content">
      <h3 class="content-card__title">{{ title }}</h3>
      <p class="content-card__sub-title">{{ subTitle }}</p>
      <p class="content-card__description">{{ description }}</p>
      <ButtonPrimary :text="buttonText" />
    </div>
  </div>
</template>

<style scoped lang="css" src="@pzh-temporary/pzh-html-component-library/components/content-card.css">
</style>
