<template>
  <div class="container"><div class="container-content">Content</div></div>
</template>

<style lang="scss">
@import "../../scss/variables/spacers.scss";
@import "../../scss/fonts.scss";
@import "../../scss/mixins/grid.scss";
@import "../../scss/mixins/container.scss";

body {
  padding: 24px 0 !important;
}

.container {
  background-color: #d5d5d5;
  @include container();
  &-content {
    background-color: #eee;
    padding: 24px;
    min-height: 200px;
  }
}
</style>
