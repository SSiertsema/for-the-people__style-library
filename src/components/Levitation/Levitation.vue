<template>
  <div class="levitation">
    <div class="levitation__sample levitate-0">
      <div class="levitation__level">Level 0</div>
      <div class="levitation__usage">@include levitate(0);</div>
    </div>
    <div class="levitation__sample levitate-1">
      <div class="levitation__level">Level 1</div>
      <div class="levitation__usage">@include levitate(1);</div>
    </div>
    <div class="levitation__sample levitate-2">
      <div class="levitation__level">Level 2</div>
      <div class="levitation__usage">@include levitate(2);</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../variables/radii/radii.scss";
@import "../../scss/mixins/levitation.scss";

.levitation {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;

  &__sample {
    padding: 24px;
    width: 200px;
    height: 100px;
    padding: 12px 24px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: $radius-4;
    background-color: white;
  }

  &__level {
    font-weight: bold;
  }

  &__usage {
    font-family: monospace;
    margin-top: 8px;
  }
}

.levitate-0 {
  @include levitate(0);
}

.levitate-1 {
  @include levitate(1);
}

.levitate-2 {
  @include levitate(2);
}
</style>
