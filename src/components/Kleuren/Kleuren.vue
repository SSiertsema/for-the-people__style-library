<template>
  <div class="colors">
    <div v-for="(colors, category) in colorsConfig" :key="category">
      <h2 class="color-swatch-group-name">{{ category }}</h2>
      <ul class="color-swatch-group">
        <li v-for="color in colors" :key="color.class">
          <div class="color-swatch">
            <div
              class="color-swatch__sample"
              :style="'background-color:' + color.hex + ';'"
            ></div>
            <div class="color-swatch__content">
              <div class="color-swatch__name">{{ color.name }}</div>
              <div class="color-swatch__hex">{{ color.hex }}</div>
              <div class="color-swatch__variable">{{ color.variable }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../scss/mixins/container.scss";

body {
  padding: 24px 0 !important;
}

.colors {
  @include container;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.color-swatch-group-name {
  margin-top: 0;
}
.color-swatch-group {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.color-swatch {
  width: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);

  &__sample {
    height: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

  &__hex {
    font-family: monospace;
  }

  &__variable {
    font-family: monospace;
  }
}
</style>

<script setup>
import colorsConfig from "../../variables/colors.src";
</script>
