<template>
  <div
    v-if="!popup || isVisible"
    ref="menuRef"
    class="menu"
    :class="additionalClasses"
    role="menu"
    :style="popupStyle"
  >
    <ul class="menu__list">
      <template v-for="(item, index) in model" :key="index">
        <!-- Separator -->
        <li v-if="item.separator" class="menu__separator" role="separator"></li>

        <!-- Menu Item -->
        <li
          v-else
          class="menu__item"
          :class="{
            'menu__item--disabled': item.disabled,
          }"
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
            class="menu__item-icon"
            aria-hidden="true"
          ></i>
          <span class="menu__item-label">{{ item.label }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style src="./Menu.scss"></style>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  model: {
    type: Array,
    default: () => [],
    validator: (value) =>
      value.every(
        (item) =>
          typeof item === "object" &&
          (item.separator === true || item.label !== undefined)
      ),
  },
  popup: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["item-click", "show", "hide"]);

const menuRef = ref(null);
const isVisible = ref(false);
const triggerElement = ref(null);
const position = ref({ top: 0, left: 0 });

const additionalClasses = computed(() =>
  [props.popup && "menu--popup", isVisible.value && "menu--visible"]
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

const onItemClick = (event, item) => {
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

const show = (event) => {
  if (!props.popup) return;

  triggerElement.value = event.currentTarget || event.target;
  calculatePosition(event);
  isVisible.value = true;
  emit("show");

  nextTick(() => {
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
  });
};

const hide = () => {
  if (!props.popup) return;

  isVisible.value = false;
  emit("hide");

  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
};

const toggle = (event) => {
  if (isVisible.value) {
    hide();
  } else {
    show(event);
  }
};

const calculatePosition = (event) => {
  const rect = event.currentTarget?.getBoundingClientRect() || {
    bottom: event.clientY,
    left: event.clientX,
  };

  let top = rect.bottom + window.scrollY + 4;
  let left = rect.left + window.scrollX;

  // Adjust if menu goes off-screen (will be refined after menu renders)
  nextTick(() => {
    if (menuRef.value) {
      const menuRect = menuRef.value.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust horizontal position
      if (left + menuRect.width > viewportWidth) {
        left = viewportWidth - menuRect.width - 8;
      }

      // Adjust vertical position
      if (top + menuRect.height > viewportHeight + window.scrollY) {
        top = rect.top + window.scrollY - menuRect.height - 4;
      }

      position.value = { top, left };
    }
  });

  position.value = { top, left };
};

const onDocumentClick = (event) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    triggerElement.value !== event.target &&
    !triggerElement.value?.contains(event.target)
  ) {
    hide();
  }
};

const onDocumentKeydown = (event) => {
  if (event.key === "Escape") {
    hide();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
});

defineExpose({
  show,
  hide,
  toggle,
});
</script>
