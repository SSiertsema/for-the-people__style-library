<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="preview-frame">
    <div v-if="title" class="frame-header">
      <span class="frame-title">{{ title }}</span>
    </div>
    <div class="frame-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.preview-frame {
  background: var(--doc-surface-card);
  border-radius: var(--doc-radius-m);
  border: 1px solid var(--doc-border);
  overflow: hidden;
}

.frame-header {
  padding: var(--doc-space-s) var(--doc-space-m);
  background: var(--doc-surface-muted);
  border-bottom: 1px solid var(--doc-border);
}

.frame-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--doc-text-muted);
}

.frame-content {
  padding: var(--doc-space-l);
}
</style>
