<template>
  <div class="container"></div>
</template>

<style lang="scss">
@import "../../scss/variables/spacers.scss";
@import "../../scss/fonts.scss";
@import "../../scss/mixins/grid.scss";

.container {
  @include container();
  background-color: #d5d5d5;
  min-height: 200px;
}
</style>
