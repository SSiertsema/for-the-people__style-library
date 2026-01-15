<template>
  <Tippy class="pzh-tooltip" :content="content">
    <button class="pzh-tooltip__button" type="button">
      <i class="icon-solid--circle-info"></i>
    </button>
  </Tippy>
</template>

<script setup>
import { Tippy, setDefaultProps } from "vue-tippy";

const props = defineProps({
  content: String,
  placement: {
    type: String,
    default: "top",
  },
  textAlignment: {
    type: String,
    default: "center",
  },
});

setDefaultProps({
  placement: props.placement,
  arrow: true,
  arrowType: "round",
  animation: "fade",
  trigger: "click",
  allowHTML: true,
  interactive: true,
});
</script>

<style lang="css">
@import "tippy.js/dist/tippy.css";
</style>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Tooltip/Tooltip.scss"
></style>

<style scoped lang="scss">
@use "@pzh-temporary/style-library/src/scss/variables/spacers.scss" as *;
@use "@pzh-temporary/html-component-library/src/scss/keyframes.scss" as *;
@use "@pzh-temporary/style-library/src/scss/mixins/typography.scss" as *;

.html-content {
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: $space-10;
  gap: $space-10;

  ol {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    gap: $space-5;
  }
}

.tippy-content {
  @include typography(text, xs);
  strong {
    @include typography(text, s, true);
  }
}
</style>
