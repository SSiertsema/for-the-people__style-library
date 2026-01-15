<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  variable: string
  value: string
}>()

const { copied, copy } = useClipboard()

function isLight(hex: string): boolean {
  // Convert hex to RGB and calculate luminance
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
</script>

<template>
  <div class="color-swatch" @click="copy(variable)">
    <div
      class="swatch"
      :style="{ backgroundColor: value }"
      :class="{ 'is-light': isLight(value) }"
    >
      <span class="copy-hint">
        <Check v-if="copied" :size="16" />
        <Copy v-else :size="16" />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </span>
    </div>
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="variable">{{ variable }}</div>
      <div class="hex">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
.color-swatch {
  cursor: pointer;
  transition: transform 0.15s;
}

.color-swatch:hover {
  transform: translateY(-2px);
}

.color-swatch:hover .swatch .copy-hint {
  opacity: 1;
}

.swatch {
  height: 80px;
  border-radius: var(--doc-radius-m) var(--doc-radius-m) 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.swatch .copy-hint {
  display: inline-flex;
  align-items: center;
  gap: var(--doc-space-2xs);
  color: white;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.15s;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.swatch.is-light .copy-hint {
  color: var(--doc-text-default);
  text-shadow: none;
}

.info {
  background: var(--doc-surface-card);
  padding: var(--doc-space-s);
  border-radius: 0 0 var(--doc-radius-m) var(--doc-radius-m);
  border: 1px solid var(--doc-border);
  border-top: none;
}

.name {
  font-weight: 500;
  font-size: 14px;
  color: var(--doc-text-default);
  margin-bottom: var(--doc-space-3xs);
}

.variable {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--doc-accent);
  margin-bottom: var(--doc-space-3xs);
}

.hex {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--doc-text-subtle);
}
</style>
