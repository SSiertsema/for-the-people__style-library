<template>
  <div
    v-if="!popup || isVisible"
    ref="menuRef"
    class="context-menu"
    :class="additionalClasses"
    role="menu"
    :style="popupStyle"
  >
    <!-- Arrow indicator -->
    <div v-if="popup" class="context-menu__arrow" :style="arrowStyle"></div>

    <ul class="context-menu__list">
      <template v-for="(item, index) in model" :key="index">
        <!-- Separator -->
        <li v-if="item.separator" class="context-menu__separator" role="separator"></li>

        <!-- Menu Item -->
        <li
          v-else
          :class="[
            'context-menu__item',
            {
              'context-menu__item--disabled': item.disabled,
            },
            item.class,
          ]"
          role="menuitem"
          :aria-disabled="item.disabled || undefined"
          tabindex="0"
          @click="onItemClick($event, item)"
          @keydown.enter="onItemClick($event, item)"
          @keydown.space.prevent="onItemClick($event, item)"
        >
          <i
            v-if="item.icon"
            :class="item.icon"
            class="context-menu__item-icon"
            aria-hidden="true"
          ></i>
          <span class="context-menu__item-label">{{ item.label }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style src="./ContextMenu.scss"></style>

<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from "vue";

interface MenuItem {
  label?: string;
  icon?: string;
  command?: (payload: { originalEvent: Event; item: MenuItem }) => void;
  disabled?: boolean;
  separator?: boolean;
  class?: string;
}

const props = withDefaults(
  defineProps<{
    model: MenuItem[];
    popup?: boolean;
  }>(),
  {
    model: () => [],
    popup: false,
  }
);

const emit = defineEmits<{
  "item-click": [payload: { originalEvent: Event; item: MenuItem }];
  show: [];
  hide: [];
}>();

const menuRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const triggerElement = ref<HTMLElement | null>(null);
const position = ref({ top: 0, left: 0 });
const initialScrollY = ref(0);
const placement = ref<"below" | "above">("below");
const arrowOffset = ref(0);

const additionalClasses = computed(() =>
  [
    props.popup && "context-menu--popup",
    isVisible.value && "context-menu--visible",
    props.popup && `context-menu--${placement.value}`,
  ]
    .filter(Boolean)
    .join(" ")
);

const popupStyle = computed(() => {
  if (!props.popup) return {};
  return {
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
  };
});

const arrowStyle = computed(() => ({
  left: `${arrowOffset.value}px`,
}));

const onItemClick = (event: Event, item: MenuItem) => {
  if (item.disabled) return;

  emit("item-click", {
    originalEvent: event,
    item,
  });

  if (typeof item.command === "function") {
    item.command({
      originalEvent: event,
      item,
    });
  }

  if (props.popup) {
    hide();
  }
};

const show = (event: Event) => {
  if (!props.popup) return;

  triggerElement.value = (event.currentTarget || event.target) as HTMLElement;
  triggerElement.value?.classList.add("context-menu-trigger--active");
  initialScrollY.value = window.scrollY;
  isVisible.value = true;
  emit("show");

  // Wait for menu to render, then calculate position
  nextTick(() => {
    calculatePosition(event);
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    window.addEventListener("scroll", onWindowScroll, true);
  });
};

const hide = () => {
  if (!props.popup) return;

  triggerElement.value?.classList.remove("context-menu-trigger--active");
  isVisible.value = false;
  emit("hide");

  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
  window.removeEventListener("scroll", onWindowScroll, true);
};

const toggle = (event: Event) => {
  if (isVisible.value) {
    hide();
  } else {
    show(event);
  }
};

const calculatePosition = (event: Event) => {
  const target = event.currentTarget as HTMLElement | null;
  const triggerRect = target?.getBoundingClientRect() || {
    top: (event as MouseEvent).clientY,
    bottom: (event as MouseEvent).clientY,
    left: (event as MouseEvent).clientX,
    right: (event as MouseEvent).clientX,
  };

  const padding = 8;
  const gap = 14;

  if (!menuRef.value) {
    // Fallback: position at trigger
    position.value = { top: triggerRect.bottom + gap, left: triggerRect.left };
    return;
  }

  const menuRect = menuRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top: number;
  let left: number;

  // Vertical positioning: prefer below, fall back to above
  const spaceBelow = viewportHeight - triggerRect.bottom - padding;
  const spaceAbove = triggerRect.top - padding;

  if (menuRect.height <= spaceBelow) {
    top = triggerRect.bottom + gap;
    placement.value = "below";
  } else if (menuRect.height <= spaceAbove) {
    top = triggerRect.top - menuRect.height - gap;
    placement.value = "above";
  } else {
    // Clamp to viewport
    top = Math.max(
      padding,
      Math.min(triggerRect.bottom + gap, viewportHeight - menuRect.height - padding)
    );
    placement.value = "below";
  }

  // Horizontal positioning: prefer left-aligned, fall back to right-aligned
  const spaceRight = viewportWidth - triggerRect.left - padding;
  const spaceLeft = triggerRect.right - padding;

  if (menuRect.width <= spaceRight) {
    left = triggerRect.left;
  } else if (menuRect.width <= spaceLeft) {
    left = triggerRect.right - menuRect.width;
  } else {
    // Clamp to viewport
    left = Math.max(
      padding,
      Math.min(triggerRect.left, viewportWidth - menuRect.width - padding)
    );
  }

  // Calculate arrow offset (center of trigger relative to menu left edge)
  const triggerCenterX = (triggerRect.left + triggerRect.right) / 2;
  arrowOffset.value = Math.max(12, Math.min(triggerCenterX - left, menuRect.width - 12));

  position.value = { top, left };
};

const onDocumentClick = (event: Event) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(event.target as Node) &&
    triggerElement.value !== event.target &&
    !triggerElement.value?.contains(event.target as Node)
  ) {
    hide();
  }
};

const onDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    hide();
  }
};

const onWindowScroll = () => {
  if (Math.abs(window.scrollY - initialScrollY.value) > 15) {
    hide();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
  window.removeEventListener("scroll", onWindowScroll, true);
});

defineExpose({
  show,
  hide,
  toggle,
});
</script>
