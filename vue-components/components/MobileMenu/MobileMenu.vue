<template>
  <Drawer
    class="pzh-mobile-menu"
    position="right"
    :is-visible="isVisible"
    @closeButtonClicked="emit('closeButtonClicked')"
  >
    <template v-slot:header>
      <button
        class="pzh-mobile-menu__link-button pzh-mobile-menu__back-button"
        :class="{ 'pzh-mobile-menu__back-button--visible': showSubnavigation }"
        @click="activeSubmenu = null"
      >
        <i class="icon-solid--chevron-left"></i>Terug
      </button>
    </template>
    <template v-slot:content>
      <ul :class="{ 'pzh-mobile-menu__show-subnavigation': showSubnavigation }">
        <li v-for="link in linkStructure">
          <NuxtLink
            v-if="link.href && link.isNuxtLink"
            class="pzh-mobile-menu__item"
            :to="showSubnavigation ? null : link.href"
            :aria-hidden="showSubnavigation"
          >
            {{ link.text }}
          </NuxtLink>

          <a
            v-else-if="link.href"
            :href="showSubnavigation ? null : link.href"
            class="pzh-mobile-menu__item"
          >
            {{ link.text }}
          </a>

          <template v-else>
            <button
              class="pzh-mobile-menu__link-button pzh-mobile-menu__item"
              @click="activateSubmenu(link)"
              :aria-hidden="showSubnavigation"
              :disabled="showSubnavigation"
            >
              {{ link.text }}<i class="icon-solid--chevron-right"></i>
            </button>

            <ul
              class="pzh-mobile-menu__subnavigation"
              :class="{
                'pzh-mobile-menu__subnavigation--visible':
                  activeSubmenu === link.text,
              }"
              :aria-hidden="activeSubmenu !== link.text"
            >
              <li v-for="sublink in link.children">
                <a
                  v-if="activeSubmenu === link.text"
                  class="pzh-mobile-menu__item"
                  :href="sublink.href"
                  >{{ sublink.text }}</a
                >
                <div v-else class="pzh-mobile-menu__item">
                  {{ sublink.text }}
                </div>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </template>
  </Drawer>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Drawer from "../Drawer/Drawer.vue";

const props = defineProps({
  isVisible: Boolean,
  linkStructure: {
    type: Array,
    default: () => {
      return [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Onderwerpen",
          children: [
            {
              title: "Wonen en ruimte",
              href: "/",
            },
            {
              title: "Verkeer en vervoer",
              href: "/",
            },
            {
              title: "Natuur en landschap",
              href: "/",
            },
            {
              title: "Economie",
              href: "/",
            },
            {
              title: "Energie",
              href: "/",
            },
            {
              title: "Kwaliteit openbaar bestuur",
              href: "/",
            },
            {
              title: "Internationaal",
              href: "/",
            },
            {
              title: "Gezonde en veilige leefomgeving",
              href: "/",
            },
            {
              title: "Milieu",
              href: "/",
            },
            {
              title: "Klimaatadaptie",
              href: "/",
            },
          ],
        },
        {
          title: "Actueel",
          children: [
            {
              title: "Item 1",
              href: "/",
            },
            {
              title: "Item 2",
              href: "/",
            },
            {
              title: "Item 3",
              href: "/",
            },
          ],
        },
        {
          title: "Politiek en bestuur",
          href: "/",
        },
        {
          title: "Online regelen",
          href: "/",
        },
        {
          title: "Contact",
          href: "/",
        },
        {
          title: "Organisatie",
          href: "/",
        },
        {
          title: "Werken bij",
          href: "/",
        },
      ];
    },
  },
});

const activeSubmenu = ref(null);

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue === false) {
      activeSubmenu.value = null;
    }
  }
);

const showSubnavigation = computed(() => {
  return activeSubmenu.value !== null;
});

function activateSubmenu(link) {
  activeSubmenu.value = link.text;
}

const emit = defineEmits(["closeButtonClicked"]);
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/MobileMenu/MobileMenu.scss"
  scoped
/>
