<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'

defineProps<{
  title: string
  description?: string
  figmaUrl?: string
}>()
</script>

<template>
  <header class="page-header">
    <div class="header-content">
      <h1 class="title">{{ title }}</h1>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
    <a
      v-if="figmaUrl"
      :href="figmaUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="figma-link"
    >
      <span>View in Figma</span>
      <ExternalLink :size="14" />
    </a>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--doc-space-l);
  margin-bottom: var(--doc-space-xl);
}

.header-content {
  flex: 1;
}

.title {
  margin: 0 0 var(--doc-space-xs);
  font-size: 28px;
  font-weight: 600;
}

.description {
  color: var(--doc-text-muted);
  margin: 0;
  max-width: 600px;
}

.figma-link {
  display: inline-flex;
  align-items: center;
  gap: var(--doc-space-xs);
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: var(--doc-surface-card);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  color: var(--doc-text-default);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.15s;
  white-space: nowrap;
}

.figma-link:hover {
  border-color: var(--doc-accent);
  color: var(--doc-accent);
}
</style>
