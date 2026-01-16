<template>
  <Teleport to="body">
    <Transition name="context-menu-fade">
      <div
        v-if="isVisible"
        ref="menuRef"
        class="context-menu"
        :style="menuStyle"
        role="menu"
        @contextmenu.prevent
      >
        <ul class="context-menu__list">
          <template v-for="(item, index) in model" :key="item.key || index">
            <li v-if="item.separator" class="context-menu__separator" role="separator" />
            <li
              v-else
              class="context-menu__item"
              :class="{
                'context-menu__item--disabled': item.disabled,
                'context-menu__item--has-submenu': item.items?.length
              }"
              role="menuitem"
              :aria-disabled="item.disabled"
              @click="onItemClick(item, $event)"
              @mouseenter="onItemMouseEnter(item, $event)"
              @mouseleave="onItemMouseLeave"
            >
              <span v-if="item.icon" class="context-menu__icon">
                <component :is="item.icon" v-if="typeof item.icon === 'object'" />
                <span v-else v-html="item.icon" />
              </span>
              <span class="context-menu__label">{{ item.label }}</span>
              <span v-if="item.shortcut" class="context-menu__shortcut">{{ item.shortcut }}</span>
              <span v-if="item.items?.length" class="context-menu__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>

              <!-- Submenu -->
              <Transition name="context-menu-fade">
                <ul
                  v-if="item.items?.length && activeSubmenu === item"
                  class="context-menu__submenu"
                  role="menu"
                >
                  <template v-for="(subItem, subIndex) in item.items" :key="subItem.key || subIndex">
                    <li v-if="subItem.separator" class="context-menu__separator" role="separator" />
                    <li
                      v-else
                      class="context-menu__item"
                      :class="{ 'context-menu__item--disabled': subItem.disabled }"
                      role="menuitem"
                      :aria-disabled="subItem.disabled"
                      @click="onItemClick(subItem, $event)"
                    >
                      <span v-if="subItem.icon" class="context-menu__icon">
                        <component :is="subItem.icon" v-if="typeof subItem.icon === 'object'" />
                        <span v-else v-html="subItem.icon" />
                      </span>
                      <span class="context-menu__label">{{ subItem.label }}</span>
                      <span v-if="subItem.shortcut" class="context-menu__shortcut">{{ subItem.shortcut }}</span>
                    </li>
                  </template>
                </ul>
              </Transition>
            </li>
          </template>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<style src="./ContextMenu.scss"></style>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

const props = defineProps({
  model: {
    type: Array,
    default: () => [],
  },
  global: {
    type: Boolean,
    default: false,
  },
  appendTo: {
    type: String,
    default: "body",
  },
});

const emit = defineEmits(["show", "hide"]);

const isVisible = ref(false);
const menuRef = ref(null);
const position = ref({ x: 0, y: 0 });
const activeSubmenu = ref(null);
let submenuTimeout = null;

const menuStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
}));

function show(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  position.value = {
    x: event?.clientX || 0,
    y: event?.clientY || 0,
  };

  isVisible.value = true;
  emit("show", event);

  nextTick(() => {
    adjustPosition();
  });
}

function hide() {
  isVisible.value = false;
  activeSubmenu.value = null;
  emit("hide");
}

function toggle(event) {
  if (isVisible.value) {
    hide();
  } else {
    show(event);
  }
}

function adjustPosition() {
  if (!menuRef.value) return;

  const rect = menuRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const padding = 8;

  let x = position.value.x;
  let y = position.value.y;

  if (x + rect.width > viewportWidth - padding) {
    x = viewportWidth - rect.width - padding;
  }

  if (y + rect.height > viewportHeight - padding) {
    y = viewportHeight - rect.height - padding;
  }

  x = Math.max(padding, x);
  y = Math.max(padding, y);

  position.value = { x, y };
}

function onItemClick(item, event) {
  if (item.disabled) {
    event.stopPropagation();
    return;
  }

  if (item.items?.length) {
    event.stopPropagation();
    return;
  }

  if (item.command) {
    item.command({ originalEvent: event, item });
  }

  hide();
}

function onItemMouseEnter(item, event) {
  clearTimeout(submenuTimeout);

  if (item.items?.length && !item.disabled) {
    submenuTimeout = setTimeout(() => {
      activeSubmenu.value = item;
    }, 100);
  } else {
    activeSubmenu.value = null;
  }
}

function onItemMouseLeave() {
  clearTimeout(submenuTimeout);
  submenuTimeout = setTimeout(() => {
    activeSubmenu.value = null;
  }, 200);
}

function onDocumentClick(event) {
  if (isVisible.value && menuRef.value && !menuRef.value.contains(event.target)) {
    hide();
  }
}

function onDocumentContextMenu(event) {
  if (props.global) {
    show(event);
  }
}

function onEscapeKey(event) {
  if (event.key === "Escape" && isVisible.value) {
    hide();
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onEscapeKey);

  if (props.global) {
    document.addEventListener("contextmenu", onDocumentContextMenu);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onEscapeKey);
  document.removeEventListener("contextmenu", onDocumentContextMenu);
  clearTimeout(submenuTimeout);
});

// Expose methods for external use
defineExpose({
  show,
  hide,
  toggle,
});
</script>
