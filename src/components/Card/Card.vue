<template>
  <div class="card">
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>
    <div class="card__body">
      <div v-if="$slots.title || $slots.subtitle" class="card__caption">
        <div v-if="$slots.title" class="card__title">
          <slot name="title" />
        </div>
        <div v-if="$slots.subtitle" class="card__subtitle">
          <slot name="subtitle" />
        </div>
      </div>
      <div v-if="$slots.content || $slots.default" class="card__content">
        <slot name="content">
          <slot />
        </slot>
      </div>
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style src="./Card.scss"></style>

<script setup>
// Card component - a container for content with optional header, title, subtitle, content, and footer sections
// Following the PrimeVue Card API pattern with slots for flexible content

defineOptions({
  name: 'Card'
});
</script>
