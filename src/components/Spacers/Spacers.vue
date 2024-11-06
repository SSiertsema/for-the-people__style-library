<template>
  <ul class="spacers">
    <li v-for="spacer in spacers">
      <div class="spacer">
        <div
          class="spacer__sample"
          :style="'width:' + spacer.value + '; height:' + spacer.value + ';'"
        ></div>
        <div class="spacer__variable">
          {{ spacer.variable }}
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@use "../../scss/mixins/container.scss" as *;

body {
  padding: 24px 0 !important;
}

.spacers {
  list-style: none;
  margin: 0;
  display: inline-flex;
  gap: 12px;
  flex-direction: column;
  @include container;
}

.spacer {
  &__sample {
    background-color: #ccc;
    height: 20px;
  }

  &__variable {
    font-size: 11px;
    font-family: monospace;
    white-space: nowrap;
    margin-top: 4px;
  }
}
</style>

<script setup>
import spacers from "../../variables/spacers.src";
</script>
