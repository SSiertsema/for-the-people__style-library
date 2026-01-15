<template>
  <div class="pzh-user-menu">
    <button
      class="pzh-user-menu__context-button"
      @click.stop="showContextMenu = !showContextMenu"
    >
      <span class="pzh-user-menu__title">{{ userName }}</span>
      <i class="icon-solid--user"></i>
      <i class="icon-solid--chevron-down"></i>
      <ContextMenu v-if="showContextMenu" v-bind="contextMenu" @click.stop>
        <div class="pzh-context-menu__content" v-if="userName || userRole">
          <div class="pzh-user-menu__user-info">
            <div v-if="userName" class="pzh-user-menu__user-name">
              {{ userName }}
            </div>
            <div v-if="userRole" class="pzh-user-menu__user-role">
              {{ userRole }}
            </div>
          </div>
        </div>
        <div v-if="links" class="pzh-context-menu__content">
          <ul class="pzh-user-menu__links">
            <li v-for="link in links">
              <a
                v-if="link.href"
                :href="link.href"
                class="pzh-context-menu__link"
              >
                <i v-if="link.icon" :class="'icon-solid--' + link.icon"></i>
                <span>
                  {{ link.text }}
                </span>
              </a>
              <button
                v-else
                class="pzh-context-menu__link"
                @click="link.callback"
              >
                <i v-if="link.icon" :class="'icon-solid--' + link.icon"></i>
                <span>
                  {{ link.text }}
                </span>
              </button>
            </li>
          </ul>
        </div>
        <slot></slot>
      </ContextMenu>
    </button>
  </div>
</template>

<style
  scoped
  src="@pzh-temporary/html-component-library/src/components/UserMenu/UserMenu.scss"
></style>

<style
  scoped
  src="@pzh-temporary/html-component-library/src/components/ContextMenu/ContextMenu.scss"
></style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ContextMenu from "../ContextMenu/ContextMenu.vue";

const showContextMenu = ref(false);

const props = defineProps({
  userName: String,
  userRole: String,
  links: Array,
  contextMenu: {
    type: Object,
    default: () => {
      return {
        position: "bottom",
        alignment: "right",
      };
    },
  },
});

function hideContextMenu() {
  showContextMenu.value = false;
}

function handleDocumentKeydown(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    hideContextMenu();
  }
}

onMounted(() => {
  document.addEventListener("click", hideContextMenu);
  document.addEventListener("keydown", handleDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", hideContextMenu);
  document.removeEventListener("keydown", handleDocumentKeydown);
});

defineExpose({
  hideContextMenu,
});
</script>
