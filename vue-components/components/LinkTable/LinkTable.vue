<script setup>
import ContextMenu from "../ContextMenu/ContextMenu.vue";
import ContextMenuSection from "../ContextMenuSection/ContextMenuSection.vue";
import LinkButton from "../LinkButton/LinkButton.vue";
import { ref, onMounted, onDeactivated } from "vue";

const props = defineProps({
  head: Array,
  rows: Array,
  showTableOptions: Boolean,
  isNuxt: {
    type: Boolean,
    default: false,
  },
});

const contextMenusVisibility = ref([]);

props.rows.forEach((x) => {
  contextMenusVisibility.value.push(false);
});

function hideContextMenus() {
  for (let i = 0; i < contextMenusVisibility.value.length; i++) {
    contextMenusVisibility.value[i] = false;
  }
}

function handleOptionsButtonClick(index) {
  const isVisible = contextMenusVisibility.value[index];
  hideContextMenus();
  if (!isVisible) {
    contextMenusVisibility.value[index] = true;
  }
}

function handleDocumentClick() {
  hideContextMenus();
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    hideContextMenus();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleDocumentClick);
});

onDeactivated(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleDocumentClick);
});

const emit = defineEmits(["delete", "click"]);

defineExpose({
  hideContextMenus,
});
</script>

<template>
  <div class="table table--link">
    <div class="table__header">
      <div class="table__row">
        <span class="table__cell" v-for="cell in head">{{ cell }}</span>
      </div>
    </div>
    <div class="table__body">
      <div
        class="table__row"
        :title="row.title"
        v-for="(row, index) in rows"
        :class="{
          'table__row--active': row.isActive,
          'table__row--warn': row.showWarnState,
          'table__row--options-visible': contextMenusVisibility[index],
        }"
      >
        <NuxtLink
          v-if="isNuxt"
          v-for="cell in row.cells"
          :to="row.href"
          class="table__cell"
          @click="emit('click', row)"
        >
          {{ cell }}
        </NuxtLink>
        <a
          v-else
          v-for="cell in row.cells"
          :href="row.href"
          class="table__cell"
          @click="emit('click', row)"
        >
          {{ cell }}
        </a>
        <span class="table__cell table__cell--options" v-if="showTableOptions">
          <div class="button-context-wrapper">
            <LinkButton
              icon="ellipsis-vertical"
              @click="handleOptionsButtonClick(index)"
            />
            <ContextMenu
              v-if="contextMenusVisibility[index] === true"
              position="bottom"
              alignment="right"
              @click.stop
            >
              <ContextMenuSection>
                <LinkButton
                  text="Archiveren"
                  icon="archive"
                  @click="emit('delete', row)"
                />
              </ContextMenuSection>
            </ContextMenu>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/table.css"
></style>

<style lang="scss">
.context-menu {
  z-index: 1000;
}
</style>
