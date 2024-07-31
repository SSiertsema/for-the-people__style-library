<template>
  <ul class="iconography">
    <li v-for="icon in icons">
      <div class="iconography__icon">
        <div class="iconography__sample">
          <i :class="'icon-light--' + icon"></i>
        </div>
        <span class="iconography__name">{{ icon }}</span>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@import "../../scss/mixins/container.scss";

body {
  padding: 24px 0 !important;
}

.docblock-source {
  margin-top: 0;
}

.iconography {
  padding: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @include container;

  p {
    max-width: 70%;
  }

  &__code-caption {
    font-style: italic;
    color: gray;
    font-size: 0.9em;
    margin-bottom: 2px;
  }

  &__code {
    font-family: monospace;
    background-color: #eee;
    padding: 24px;
    margin: 0;
    margin-bottom: 16px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-top: 48px;
  }

  &__icon {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__sample {
    border-radius: 4px;
    border: 1px solid #e3e3e3;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script setup>
// import Icons from "../../variables/Icons/Icons.src";

const icons = [
  "house",
  "check",
  "magnifying-glass",
  "download",
  "user",
  "envelope",
  "location-dot",
  "arrow-up",
  "arrow-right",
  "arrow-down",
  "arrow-left",
  "chevron-up",
  "chevron-right",
  "chevron-down",
  "chevron-left",
];

const sizes = {
  small: "14px",
  medium: "18px",
};

const variants = ["light", "solid"];
</script>
