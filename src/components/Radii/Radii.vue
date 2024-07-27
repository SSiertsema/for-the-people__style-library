<template>
  <ul class="radii">
    <li v-for="radius in radii" :key="radius.name">
      <div class="radius-card">
        <div class="radius-card__content">
          <div
            class="radius-card__sample"
            :style="'border-radius:' + radius.value + ';'"
          ></div>
          <div class="radius-card__name">{{ radius.name }}</div>
          <div class="radius-card__variable">{{ radius.variable }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@import "../../scss/mixins/container.scss";

body {
  padding: 24px 0 !important;
}
.radii {
  @include container;
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
}

.radius-card {
  width: 200px;
  background-color: white;

  &__sample {
    height: 100px;
    background-color: silver;
    margin-bottom: 16px;
  }

  &__content {
    padding: 12px;
    line-height: 1.5;
  }

  &__name {
    text-transform: capitalize;
    font-weight: bold;
    margin-bottom: 4px;
  }

  &__variable {
    font-family: monospace;
  }
}
</style>

<script setup>
import radii from "../../variables/radii.src";
</script>
