<template>
  <div class="grid-collection">
    <div class="container">
      <div class="grid grid--sample-12-items">
        <div v-for="index in 12">{{ index }}</div>
      </div>
    </div>

    <div class="container">
      <div class="grid grid--sample-6-items">
        <div v-for="index in 6">{{ index }}</div>
      </div>
    </div>

    <div class="container">
      <div class="grid grid--sample-3-items">
        <div v-for="index in 3">{{ index }}</div>
      </div>
    </div>
    <div class="container">
      <div class="grid grid--sample-2-items">
        <div v-for="index in 2">{{ index }}</div>
      </div>
    </div>

    <div class="container">
      <div class="grid grid--sample-1-item">
        <div v-for="index in 1">{{ index }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../scss/variables/spacers.scss" as *; 
@use "../../scss/fonts.scss" as *;
@use "../../scss/mixins/container.scss" as *;
@use "../../scss/mixins/grid.scss" as *;
@use "../../scss/mixins/breakpoint.scss" as *;

body {
  padding: 0 !important;
}

.grid-collection {
  display: flex;
  flex-direction: column;
  gap: $space-20;
}

.container {
  background-color: #d5d5d5;

  @include container;
}

.grid {
  background-color: #750047;
  overflow: hidden;

  @include grid;

  > * {
    background-color: #d76aac;
    text-align: center;
    padding: $space-3 $space-1;
  }

  &--sample-6-items {
    grid-column: span 12;
    > * {
      @include breakpoint-from(tablet) {
        grid-column: span 2;
      }
    }
  }

  &--sample-3-items {
    grid-column: span 12;
    > * {
      @include breakpoint-from(tablet) {
        grid-column: span 2;
      }
    }
  }

  &--sample-2-items {
    > * {
      grid-column: span 12;
      @include breakpoint-from(tablet) {
        grid-column: span 2;
      }
      @include breakpoint-from(laptop) {
        grid-column: span 3;
      }
    }
  }

  &--sample-1-item {
    > * {
      grid-column: span 12;
    }
  }
}
</style>
