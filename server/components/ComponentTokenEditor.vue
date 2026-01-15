<script setup lang="ts">
import { Loader2, Save, RotateCcw, ChevronDown, ChevronRight } from 'lucide-vue-next'

interface TokenValue {
  value: string
  type?: string
  description?: string
  resolvedValue?: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

interface FlattenedToken {
  path: string
  name: string
  value: string
  type?: string
  description?: string
  resolvedValue?: string
  category: 'colors' | 'sizes' | 'radii' | 'other'
}

interface TokensResponse {
  path: string
  tokens: TokenGroup
  availableReferences: {
    color: string[]
    dimension: string[]
    shadow: string[]
    other: string[]
  }
}

interface PrimitiveColors {
  [palette: string]: {
    [shade: string]: { value: string; type: string }
  }
}

const props = defineProps<{
  component: string
}>()

const emit = defineEmits<{
  'tokens-changed': [tokens: Record<string, string>]
}>()

// Fetch component tokens from API
const { data: tokensData, pending, error, refresh } = await useFetch<TokensResponse>(
  () => `/api/tokens/components/${props.component}`
)

// Fetch primitive colors for live resolution
const { data: primitivesData } = await useFetch<{ tokens: PrimitiveColors }>(
  '/api/tokens/primitives/color'
)

// Build a lookup map for primitive colors
const colorLookup = computed(() => {
  const lookup: Record<string, string> = {}
  if (primitivesData.value?.tokens) {
    for (const [palette, shades] of Object.entries(primitivesData.value.tokens)) {
      if (typeof shades === 'object' && shades !== null) {
        for (const [shade, token] of Object.entries(shades)) {
          if (token && typeof token === 'object' && 'value' in token) {
            lookup[`${palette}.${shade}`] = token.value
          }
        }
      }
    }
  }
  return lookup
})

// Track changes and UI state
const changes = ref<Record<string, string>>({})
const isSaving = ref(false)
const expandedCategories = ref<string[]>(['colors', 'sizes'])

// Flatten tokens into a list with categories
function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === 'object' && obj !== null && 'value' in obj
}

function flattenTokens(tokens: TokenGroup, prefix = ''): FlattenedToken[] {
  const result: FlattenedToken[] = []

  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('$')) continue
    const path = prefix ? `${prefix}.${key}` : key

    if (isTokenValue(value)) {
      let category: FlattenedToken['category'] = 'other'
      if (value.type === 'color') {
        category = 'colors'
      } else if (value.type === 'dimension') {
        category = path.toLowerCase().includes('radius') ? 'radii' : 'sizes'
      }

      result.push({
        path,
        name: key,
        value: value.value,
        type: value.type,
        description: value.description,
        resolvedValue: value.resolvedValue,
        category
      })
    } else if (typeof value === 'object' && value !== null) {
      result.push(...flattenTokens(value as TokenGroup, path))
    }
  }

  return result
}

const flattenedTokens = computed(() => {
  if (!tokensData.value?.tokens) return []
  const componentTokens = tokensData.value.tokens[props.component] as TokenGroup
  if (!componentTokens) return []
  return flattenTokens(componentTokens, props.component)
})

// Group tokens by category
const groupedTokens = computed(() => {
  const groups: Record<string, FlattenedToken[]> = {
    colors: [],
    sizes: [],
    radii: [],
    other: []
  }

  for (const token of flattenedTokens.value) {
    groups[token.category].push(token)
  }

  return groups
})

// Get current value (with changes applied)
function getCurrentValue(token: FlattenedToken): string {
  return changes.value[token.path] ?? token.value
}

// Check if token has been modified
function isModified(token: FlattenedToken): boolean {
  return token.path in changes.value && changes.value[token.path] !== token.value
}

// Handle value change
function handleValueChange(token: FlattenedToken, newValue: string) {
  if (newValue === token.value) {
    delete changes.value[token.path]
  } else {
    changes.value[token.path] = newValue
  }

  // Emit live CSS variable updates
  emitTokenChanges()
}

// Emit current token values as CSS variables
function emitTokenChanges() {
  const cssVars: Record<string, string> = {}

  for (const token of flattenedTokens.value) {
    const value = getCurrentValue(token)
    // Resolve the value if it's a reference
    const resolved = resolveValue(value, token)
    const varName = `--${token.path.replace(/\./g, '-')}`
    cssVars[varName] = resolved
  }

  emit('tokens-changed', cssVars)
}

// Resolve token references to actual values for live preview
function resolveValue(value: string, token: FlattenedToken): string {
  if (!value.startsWith('{') || !value.endsWith('}')) {
    return value
  }

  const refPath = value.slice(1, -1) // Remove { and }

  // Check if it's a primitive color reference (e.g., "navy.600")
  if (colorLookup.value[refPath]) {
    return colorLookup.value[refPath]
  }

  // For unchanged values, use the pre-resolved value from API
  if (value === token.value && token.resolvedValue) {
    return token.resolvedValue
  }

  // Fallback to original resolved value or a placeholder
  return token.resolvedValue || value
}

// Check if value is a hex color
function isHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(value)
}

// Count pending changes
const pendingChangesCount = computed(() => Object.keys(changes.value).length)

// Toggle category expansion
function toggleCategory(category: string) {
  const index = expandedCategories.value.indexOf(category)
  if (index === -1) {
    expandedCategories.value.push(category)
  } else {
    expandedCategories.value.splice(index, 1)
  }
}

// Save all changes
async function saveChanges() {
  if (pendingChangesCount.value === 0) return

  isSaving.value = true

  try {
    for (const [tokenPath, value] of Object.entries(changes.value)) {
      await $fetch(`/api/tokens/components/${props.component}`, {
        method: 'PUT',
        body: { path: tokenPath, value }
      })
    }

    await $fetch('/api/tokens/rebuild', { method: 'POST' })
    changes.value = {}
    await refresh()
  } catch (err) {
    console.error('Failed to save tokens:', err)
  } finally {
    isSaving.value = false
  }
}

// Discard all changes
function discardChanges() {
  changes.value = {}
  emitTokenChanges()
}

// Get available references for a token type
function getReferencesForType(type?: string): string[] {
  if (!tokensData.value?.availableReferences) return []

  if (type === 'color') {
    return tokensData.value.availableReferences.color
  } else if (type === 'dimension') {
    return [
      ...tokensData.value.availableReferences.dimension,
      ...tokensData.value.availableReferences.other
    ]
  }

  return []
}

const categoryLabels: Record<string, string> = {
  colors: 'Kleuren',
  sizes: 'Groottes',
  radii: 'Radii',
  other: 'Overig'
}

// Get live resolved value for display (updates when reference changes)
function getLiveResolvedValue(token: FlattenedToken): string {
  const currentValue = getCurrentValue(token)
  return resolveValue(currentValue, token)
}

// Initial emit and watch for primitives data
onMounted(() => {
  emitTokenChanges()
})

// Re-emit when primitives load (for proper initial resolution)
watch(() => primitivesData.value, () => {
  emitTokenChanges()
}, { immediate: true })
</script>

<template>
  <div class="token-editor">
    <div class="editor-header">
      <h3>Design Tokens</h3>
      <div class="editor-actions">
        <button
          v-if="pendingChangesCount > 0"
          type="button"
          class="btn btn--ghost"
          @click="discardChanges"
        >
          <RotateCcw :size="14" />
          Reset
        </button>
        <button
          type="button"
          class="btn btn--primary"
          :disabled="pendingChangesCount === 0 || isSaving"
          @click="saveChanges"
        >
          <Loader2 v-if="isSaving" :size="14" class="spin" />
          <Save v-else :size="14" />
          {{ isSaving ? 'Opslaan...' : `Opslaan${pendingChangesCount > 0 ? ` (${pendingChangesCount})` : ''}` }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="loading">
      <Loader2 :size="16" class="spin" />
      Laden...
    </div>

    <div v-else-if="error" class="error">
      Kon tokens niet laden: {{ error.message }}
    </div>

    <div v-else class="token-categories">
      <template v-for="(tokens, category) in groupedTokens" :key="category">
        <div v-if="tokens.length > 0" class="category">
          <button
            type="button"
            class="category-header"
            @click="toggleCategory(category)"
          >
            <ChevronRight
              :size="16"
              class="chevron"
              :class="{ expanded: expandedCategories.includes(category) }"
            />
            <span>{{ categoryLabels[category] }}</span>
            <span class="count">{{ tokens.length }}</span>
          </button>

          <div v-if="expandedCategories.includes(category)" class="category-tokens">
            <div
              v-for="token in tokens"
              :key="token.path"
              class="token-row"
              :class="{ modified: isModified(token) }"
            >
              <div class="token-info">
                <span class="token-name">{{ token.name }}</span>
                <span v-if="token.description" class="token-desc">{{ token.description }}</span>
              </div>

              <div class="token-value">
                <!-- Color preview (live updated) -->
                <div
                  v-if="token.type === 'color' && isHexColor(getLiveResolvedValue(token))"
                  class="color-swatch"
                  :style="{ backgroundColor: getLiveResolvedValue(token) }"
                  :title="getLiveResolvedValue(token)"
                />

                <!-- Reference selector -->
                <TokenReferenceSelector
                  v-if="getCurrentValue(token).startsWith('{')"
                  :model-value="getCurrentValue(token)"
                  :options="getReferencesForType(token.type)"
                  :token-type="token.type"
                  @update:model-value="(v) => handleValueChange(token, v)"
                />

                <!-- Direct input -->
                <input
                  v-else
                  type="text"
                  class="value-input"
                  :value="getCurrentValue(token)"
                  @input="(e) => handleValueChange(token, (e.target as HTMLInputElement).value)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.token-editor {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--doc-space-m);
  border-bottom: 1px solid var(--doc-border);
  background: var(--doc-surface-muted);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.editor-actions {
  display: flex;
  gap: var(--doc-space-xs);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--doc-space-2xs);
  padding: var(--doc-space-2xs) var(--doc-space-s);
  border-radius: var(--doc-radius-s);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &--primary {
    background: var(--doc-accent);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--ghost {
    background: transparent;
    color: var(--doc-text-muted);
    border: none;

    &:hover {
      color: var(--doc-text-default);
      background: var(--doc-surface-muted);
    }
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading, .error {
  padding: var(--doc-space-l);
  text-align: center;
  color: var(--doc-text-muted);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--doc-space-s);
}

.error {
  color: var(--doc-feedback-error);
}

.token-categories {
  max-height: 500px;
  overflow-y: auto;
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--doc-space-xs);
  width: 100%;
  padding: var(--doc-space-s) var(--doc-space-m);
  background: none;
  border: none;
  border-bottom: 1px solid var(--doc-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--doc-text-default);
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--doc-surface-muted);
  }

  .chevron {
    transition: transform 0.15s;
    color: var(--doc-text-muted);

    &.expanded {
      transform: rotate(90deg);
    }
  }

  .count {
    margin-left: auto;
    color: var(--doc-text-muted);
    font-weight: 400;
  }
}

.category-tokens {
  border-bottom: 1px solid var(--doc-border);
}

.token-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--doc-space-m);
  padding: var(--doc-space-s) var(--doc-space-m);
  padding-left: var(--doc-space-xl);
  border-bottom: 1px solid var(--doc-border-subtle, rgba(0,0,0,0.05));
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--doc-surface-muted);
  }

  &.modified {
    background: var(--doc-feedback-warning-subtle);
  }
}

.token-info {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-3xs);
  min-width: 0;
  flex: 1;
}

.token-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--doc-text-default);
}

.token-desc {
  font-size: 11px;
  color: var(--doc-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.token-value {
  display: flex;
  align-items: center;
  gap: var(--doc-space-xs);
  flex-shrink: 0;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: var(--doc-radius-xs);
  border: 1px solid var(--doc-border);
  flex-shrink: 0;
}

.value-input {
  width: 140px;
  padding: var(--doc-space-2xs) var(--doc-space-xs);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-xs);
  font-size: 12px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  background: var(--doc-surface-canvas);

  &:focus {
    outline: none;
    border-color: var(--doc-accent);
  }
}
</style>
