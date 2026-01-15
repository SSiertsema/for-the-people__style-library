<template>
  <ul href="#" class="pzh-pagination">
    <li v-for="button in buttonsConfig">
      <PaginationButton
        v-if="button.type === 'page'"
        :text="button.text"
        :is-active="button.isActive"
        :is-disabled="button.isDisabled"
        @click="emit('buttonActivated', button.text)"
      />
      <PaginationButton
        v-if="button.type === 'previous'"
        icon="chevron-left"
        :is-disabled="button.isDisabled"
        @click="emit('buttonActivated', 'previous')"
      />
      <PaginationButton
        v-if="button.type === 'next'"
        icon="chevron-right"
        :is-disabled="button.isDisabled"
        @click="emit('buttonActivated', 'next')"
      />
      <PaginationEllipsis v-if="button.type === 'ellipsis'" />
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import PaginationButton from "./PaginationButton.vue";
import PaginationEllipsis from "./PaginationEllipsis.vue";

const props = defineProps({
  current: Number,
  max: Number,
});

function pageButton(text, isActive = false) {
  return {
    type: "page",
    text,
    isActive,
  };
}

function magic8() {
  // only when exactly 8 pages
  const buttons = [];

  buttons.push({
    type: "previous",
    isDisabled: props.current === 1,
  });

  if (props.current <= 4) {
    for (let i = 1; i <= 5; i++) {
      buttons.push(pageButton(i, i === props.current));
    }
    buttons.push({
      type: "ellipsis",
    });
    buttons.push(pageButton(8));
  } else {
    buttons.push(pageButton(1));
    buttons.push({
      type: "ellipsis",
    });

    for (let i = 4; i <= 8; i++) {
      buttons.push(pageButton(i, i === props.current));
    }
  }

  buttons.push({
    type: "next",
    isDisabled: props.current === props.max,
  });

  return buttons;
}

function startRangeButtonsConfig() {
  const buttons = [];
  const lastPage = props.max;
  const currentPage = props.current;

  buttons.push({
    type: "previous",
    isDisabled: currentPage === 1,
  });

  for (let i = 1; i <= 5; i++) {
    buttons.push(pageButton(i, i === currentPage));
  }

  buttons.push({
    type: "ellipsis",
  });

  buttons.push(pageButton(lastPage));

  buttons.push({
    type: "next",
  });

  return buttons;
}

function endRangeButtonsConfig() {
  const buttons = [];
  const lastPage = props.max;
  const startOfEndRange = lastPage - 4;
  const currentPage = props.current;

  buttons.push({
    type: "previous",
  });

  buttons.push(pageButton(1));

  buttons.push({
    type: "ellipsis",
  });

  for (let i = startOfEndRange; i <= lastPage; i++) {
    buttons.push(pageButton(i, i === currentPage));
  }

  buttons.push({
    type: "next",
    isDisabled: currentPage === lastPage,
  });

  return buttons;
}

function midRangeButtonsConfig() {
  const buttons = [];
  const lastPage = props.max;
  const currentPage = props.current;

  buttons.push({
    type: "previous",
  });

  buttons.push(pageButton(1));

  buttons.push({
    type: "ellipsis",
  });

  buttons.push(pageButton(currentPage - 1));
  buttons.push(pageButton(currentPage, true));
  buttons.push(pageButton(currentPage + 1));

  buttons.push({
    type: "ellipsis",
  });

  buttons.push(pageButton(lastPage));

  buttons.push({
    type: "next",
  });

  return buttons;
}

function simpleButtonsConfig() {
  const buttons = [];

  buttons.push({
    type: "previous",
    isDisabled: props.current === 1,
  });

  for (let i = 1; i <= props.max; i++) {
    buttons.push(pageButton(i, i === props.current));
  }

  buttons.push({
    type: "next",
    isDisabled: props.current === props.max,
  });

  return buttons;
}

const buttonsConfig = computed(() => {
  const lastPage = props.max;
  const startOfEndRange = lastPage - 4;
  const endOfBeginRange = 4;
  const currentPage = props.current;
  const isBeginRange = currentPage <= endOfBeginRange;
  const isEndRange = currentPage > startOfEndRange;

  if (lastPage <= 7) return simpleButtonsConfig();
  if (lastPage === 8) return magic8();
  if (isBeginRange) return startRangeButtonsConfig();
  if (isEndRange) return endRangeButtonsConfig();
  return midRangeButtonsConfig();
});

const emit = defineEmits(["buttonActivated"]);
</script>

<style
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Pagination/Pagination.scss"
  scoped
/>
