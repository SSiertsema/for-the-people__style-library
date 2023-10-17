<template>
  <div class="container">
    <div class="grid">
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
      <div>Content 4</div>
      <div>Content 5</div>
      <div>Content 6</div>
    </div>
  </div>
</template>

<script setup>
const headingVariants = ["xxxl", "xxl", "xl", "l", "m", "s"];
const headingSnippet = `The fox jumps over the lazy brown dog`;

const textVariants = ["l", "m", "s"];
const textSnippet = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat.
  <strong>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
  dolore eu fugiat nulla pariatur.</strong>
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
  officia deserunt mollit anim id est laborum.
`;
</script>

<style lang="scss">
@import "../../scss/variables/spacers.scss";
@import "../../scss/fonts.scss";
@import "../../scss/mixins/grid.scss";

.container {
  background-color: #d5d5d5;
}

.grid {
  @include grid();
  background-color: #750047;

  > * {
    background-color: #d76aac;
    padding: $space-8;
  }
}
</style>
