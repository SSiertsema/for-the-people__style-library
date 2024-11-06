<template>
  <div class="container"><div class="container-content">Content</div></div>
</template>

<style lang="scss">
@use "../../scss/variables/spacers.scss" as *;
@use "../../scss/fonts.scss" as *;
@use "../../scss/mixins/grid.scss" as *;
@use "../../scss/mixins/container.scss" as *;

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
