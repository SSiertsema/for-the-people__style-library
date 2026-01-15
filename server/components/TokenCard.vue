<script setup lang="ts">
defineProps<{
  name: string
  variable: string
  value: string
}>()

const { copied, copy } = useClipboard()
</script>

<template>
  <div class="token-card" @click="copy(variable)">
    <div class="preview">
      <slot />
    </div>
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="variable">{{ variable }}</div>
      <div class="value">{{ value }}</div>
      <div class="copy-hint">{{ copied ? 'Copied!' : 'Click to copy' }}</div>
    </div>
  </div>
</template>

<style scoped>
.token-card {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  background: var(--doc-surface-card);
  padding: var(--doc-space-m);
  border-radius: var(--doc-radius-m);
  border: 1px solid var(--doc-border);
  cursor: pointer;
  transition: all 0.15s;
}

.token-card:hover {
  border-color: var(--doc-accent);
  box-shadow: var(--doc-shadow-xs);
}

.token-card:hover .copy-hint {
  opacity: 1;
}

.preview {
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-weight: 500;
  font-size: 14px;
  color: var(--doc-text-default);
  margin-bottom: var(--doc-space-3xs);
}

.variable {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 13px;
  color: var(--doc-accent);
  margin-bottom: var(--doc-space-3xs);
}

.value {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--doc-text-subtle);
}

.copy-hint {
  font-size: 11px;
  color: var(--doc-text-subtle);
  margin-top: var(--doc-space-xs);
  opacity: 0;
  transition: opacity 0.15s;
}
</style>
