<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import HeaderLink from "./HeaderLink.vue";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary.vue";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary.vue";
import ButtonCallToAction from "../ButtonCallToAction/ButtonCallToAction.vue";
import MobileMenu from "../MobileMenu/MobileMenu.vue";

const props = defineProps({
  urlHome: {
    type: String,
    default: "/",
  },
  isNuxtEnvironment: {
    type: Boolean,
    default: false,
  },
  title: String,
  links: Array,
  buttons: Array,

  hasMobileMenu: {
    type: Boolean,
    default: true,
  },
  mobileMenuConfig: Object,
});

const showMobileMenu = ref(false);

function hideMobileMenu() {
  showMobileMenu.value = false;
}

function closeOnEsc(event) {
  if (event.key === "Escape") {
    hideMobileMenu();
  }
}

onMounted(() => {
  document.addEventListener("click", hideMobileMenu);
  document.addEventListener("keydown", closeOnEsc);
});

onUnmounted(() => {
  document.removeEventListener("click", hideMobileMenu);
  document.removeEventListener("keydown", closeOnEsc);
});
</script>

<template>
  <div class="pzh-header">
    <div class="pzh-header__container">
      <NuxtLink
        class="pzh-header__logo-link"
        v-if="isNuxtEnvironment"
        :to="urlHome"
      >
        <img
          class="pzh-header__logo"
          src="https://cdn-pzh.azureedge.net/web/assets/logos/pzh-logo.svg"
        />
      </NuxtLink>
      <a class="pzh-header__logo-link" v-else :href="urlHome">
        <img
          class="pzh-header__logo"
          src="https://cdn-pzh.azureedge.net/web/assets/logos/pzh-logo.svg"
        />
      </a>

      <div class="pzh-header__dynamic-content">
        <div class="pzh-header__slot-left">
          <h1 class="pzh-header__site-title">{{ title }}</h1>
        </div>
        <div class="pzh-header__slot-right">
          <ul class="pzh-header__buttons" v-if="buttons">
            <li v-for="button in buttons">
              <ButtonCallToAction
                v-if="button.type === 'cta'"
                v-bind="button"
                size="small"
                @click="button.callback()"
              />
              <button-primary
                v-if="button.type === 'primary'"
                v-bind="button"
                size="small"
                @click="button.callback()"
              />
              <button-secondary
                v-if="button.type === 'secondary'"
                v-bind="button"
                size="small"
                @click="button.callback()"
              />
            </li>
          </ul>
          <ul class="pzh-header__links" v-if="links">
            <li v-for="link in links">
              <header-link v-bind="link" @click="link.callback()" />
            </li>
          </ul>
        </div>
      </div>
      <slot name="userMenu"></slot>

      <button
        class="button-menu"
        v-if="hasMobileMenu"
        type="button"
        @click.stop="showMobileMenu = true"
      >
        Menu<i class="icon-light--bars"></i>
      </button>
    </div>

    <MobileMenu
      v-if="hasMobileMenu"
      v-bind="mobileMenuConfig"
      :is-visible="showMobileMenu"
      @closeButtonClicked="showMobileMenu = false"
    />
  </div>
</template>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Header/Header.scss"
></style>
