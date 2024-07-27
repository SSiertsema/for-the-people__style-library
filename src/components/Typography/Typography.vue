<template>
  <ul class="typography">
    <li v-for="variant in headingVariants">
      <div class="typography__name-and-usage">
        <span class="typography__name">Heading {{ variant }}</span
        >,
        <span class="typography__usage">
          @include typography(heading, {{ variant }});
        </span>
      </div>
      <div
        :class="'typography__sample typography__sample--heading-' + variant"
        v-html="headingSnippet"
      ></div>
    </li>
    <li v-for="variant in textVariants">
      <div class="typography__name-and-usage">
        <span class="typography__name">Text {{ variant }}</span
        >,
        <span class="typography__usage">
          @include typography(text, {{ variant }});
        </span>
      </div>
      <div
        :class="'typography__sample typography__sample--text-' + variant"
        v-html="textSnippet"
      ></div>
    </li>
  </ul>
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
@import "../../scss/fonts.scss";
@import "../../scss/mixins/typography.scss";
@import "../../scss/mixins/container.scss";

.typography {
  @include container;
  list-style: none;
  display: inline-flex;
  flex-direction: column;
  gap: 24px;

  li {
    border-left: 12px solid #eee;
    border-right: 12px solid #eee;
    border-bottom: 12px solid #eee;
    background-color: white;
  }

  &__name-and-usage {
    background-color: #eee;
    padding: 12px 0 6px 0;
  }

  &__name {
    text-transform: uppercase;
    color: gray;
    font-weight: bold;
  }

  &__usage {
    font-family: monospace;
    color: gray;
    margin-left: 5px;
  }

  &__sample {
    padding: 12px 24px;
  }

  &__sample--heading-xxxl {
    @include typography(heading, xxxl);
  }
  &__sample--heading-xxl {
    @include typography(heading, xxl);
  }
  &__sample--heading-xl {
    @include typography(heading, xl);
  }
  &__sample--heading-l {
    @include typography(heading, l);
  }
  &__sample--heading-m {
    @include typography(heading, m);
  }
  &__sample--heading-s {
    @include typography(heading, s);
  }

  &__sample--text-l {
    @include typography(text, l);
  }
  &__sample--text-m {
    @include typography(text, m);
  }
  &__sample--text-s {
    @include typography(text, s);
  }
}
</style>
