<template>
  <section class="pzh-footer">
    <div class="pzh-footer__container">
      <div class="pzh-footer__grid">
        <div class="pzh-footer__slogan">Krachtig Zuid-Holland</div>
        <div class="pzh-footer__link-lists">
          <ul class="pzh-footer__link-list" v-for="linkGroup in linkGroups">
            <li v-for="link in linkGroup">
              <FooterLink v-bind="link" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FooterLink from "./FooterLink.vue";

const props = defineProps({
  linkGroups: {
    type: Array,
    default: () => {
      return [
        [
          {
            text: "Link",
            icon: "chevron-right",
          },
          {
            text: "Link",
            icon: "chevron-right",
          },
          {
            text: "Link",
            icon: "chevron-right",
          },
        ],
        [
          {
            text: "Facebook",
            icon: "facebook",
          },
          {
            text: "Twitter",
            icon: "twitter",
          },
          {
            text: "LinkedIn",
            icon: "linkedin",
          },
        ],
      ];
    },
  },
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Footer/Footer.scss"
></style>
