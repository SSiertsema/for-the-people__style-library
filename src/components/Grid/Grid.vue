<template>
  <div class="grid">
    <div>Content 1</div>
    <div>Content 2</div>
    <div>Content 3</div>
    <div>Content 4</div>
    <div>Content 5</div>
    <div>Content 6</div>
  </div>
</template>

<style lang="scss">
@import "../../scss/variables/spacers.scss";
@import "../../scss/fonts.scss";
@import "../../scss/mixins/grid.scss";

.grid {
  @include grid();
  background-color: #750047;

  > * {
    background-color: #d76aac;
    padding: $space-8;
  }
}
</style>
