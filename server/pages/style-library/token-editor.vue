<script setup lang="ts">
import { AlertCircle, CheckCircle, Pencil, Save, X, Loader2 } from 'lucide-vue-next'

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

// Fetch component tokens from API
const { data: tokensData, pending, error, refresh } = await useFetch<TokensResponse>('/api/tokens/components/avatar')

// Track changes
const changes = ref<Record<string, string>>({})
const isSaving = ref(false)
const saveStatus = ref<'idle' | 'success' | 'error'>('idle')
const saveMessage = ref('')

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
      // Determine category based on type
      let category: FlattenedToken['category'] = 'other'
      if (value.type === 'color') {
        category = 'colors'
      } else if (value.type === 'dimension') {
        if (path.toLowerCase().includes('radius')) {
          category = 'radii'
        } else {
          category = 'sizes'
        }
      }

      result.push({
        path,
        name: path.replace(/\./g, ' > '),
        value: value.value,
        type: value.type,
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
  // Skip the root 'avatar' key
  const avatarTokens = tokensData.value.tokens.avatar as TokenGroup
  if (!avatarTokens) return []
  return flattenTokens(avatarTokens, 'avatar')
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
    // Remove from changes if reverted to original
    delete changes.value[token.path]
  } else {
    changes.value[token.path] = newValue
  }
}

// Check if value is a hex color
function isHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(value)
}

// Count pending changes
const pendingChangesCount = computed(() => Object.keys(changes.value).length)

// Save all changes
async function saveChanges() {
  if (pendingChangesCount.value === 0) return

  isSaving.value = true
  saveStatus.value = 'idle'
  saveMessage.value = ''

  try {
    // Save each changed token
    for (const [tokenPath, value] of Object.entries(changes.value)) {
      await $fetch('/api/tokens/components/avatar', {
        method: 'PUT',
        body: { path: tokenPath, value }
      })
    }

    // Rebuild tokens
    await $fetch('/api/tokens/rebuild', { method: 'POST' })

    // Clear changes and refresh
    changes.value = {}
    await refresh()

    saveStatus.value = 'success'
    saveMessage.value = 'Tokens saved and rebuilt successfully'

    // Clear success message after 3 seconds
    setTimeout(() => {
      saveStatus.value = 'idle'
      saveMessage.value = ''
    }, 3000)
  } catch (err) {
    saveStatus.value = 'error'
    saveMessage.value = err instanceof Error ? err.message : 'Failed to save tokens'
  } finally {
    isSaving.value = false
  }
}

// Discard all changes
function discardChanges() {
  changes.value = {}
}

// Category display names
const categoryNames: Record<string, string> = {
  colors: 'Colors',
  sizes: 'Sizes',
  radii: 'Radii',
  other: 'Other'
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Token Editor"
      description="Edit component design tokens. Changes are saved to the token JSON files and automatically rebuild the CSS output."
    />

    <!-- Error state -->
    <div v-if="error" class="error-message">
      <AlertCircle :size="18" />
      <span>{{ error.message }}</span>
    </div>

    <!-- Loading state -->
    <div v-else-if="pending" class="loading">
      <Loader2 :size="20" class="spinner-icon" />
      <span>Loading tokens...</span>
    </div>

    <!-- Token editor -->
    <template v-else-if="tokensData">
      <!-- Action bar -->
      <div class="action-bar">
        <div class="changes-indicator">
          <span v-if="pendingChangesCount > 0" class="badge">
            {{ pendingChangesCount }} unsaved change{{ pendingChangesCount !== 1 ? 's' : '' }}
          </span>
          <span v-else class="no-changes">No changes</span>
        </div>

        <div class="actions">
          <button
            v-if="pendingChangesCount > 0"
            type="button"
            class="btn btn--secondary"
            @click="discardChanges"
          >
            <X :size="14" />
            <span>Discard</span>
          </button>
          <button
            type="button"
            class="btn btn--primary"
            :disabled="pendingChangesCount === 0 || isSaving"
            @click="saveChanges"
          >
            <Loader2 v-if="isSaving" :size="14" class="spinner-icon" />
            <Save v-else :size="14" />
            <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
          </button>
        </div>
      </div>

      <!-- Save status message -->
      <div
        v-if="saveStatus !== 'idle'"
        class="save-message"
        :class="saveStatus"
      >
        <CheckCircle v-if="saveStatus === 'success'" :size="16" />
        <AlertCircle v-else :size="16" />
        <span>{{ saveMessage }}</span>
      </div>

      <!-- Token groups -->
      <div class="token-groups">
        <template v-for="(tokens, category) in groupedTokens" :key="category">
          <section v-if="tokens.length > 0" class="token-group">
            <h2>{{ categoryNames[category] }}</h2>

            <div class="token-list">
              <div
                v-for="token in tokens"
                :key="token.path"
                class="token-row"
                :class="{ modified: isModified(token) }"
              >
                <div class="token-info">
                  <div class="token-name">{{ token.name }}</div>
                  <div class="token-path">{{ token.path }}</div>
                </div>

                <div class="token-editor">
                  <!-- Color swatch preview -->
                  <div
                    v-if="token.type === 'color' && token.resolvedValue && isHexColor(token.resolvedValue)"
                    class="color-preview"
                    :style="{ backgroundColor: token.resolvedValue }"
                    :title="token.resolvedValue"
                  />

                  <!-- Reference selector for tokens with references -->
                  <TokenReferenceSelector
                    v-if="getCurrentValue(token).startsWith('{')"
                    :model-value="getCurrentValue(token)"
                    :options="getReferencesForType(token.type)"
                    :token-type="token.type"
                    @update:model-value="(v) => handleValueChange(token, v)"
                  />

                  <!-- Direct value input for non-reference values -->
                  <input
                    v-else
                    type="text"
                    class="value-input"
                    :value="getCurrentValue(token)"
                    @input="(e) => handleValueChange(token, (e.target as HTMLInputElement).value)"
                  />

                  <!-- Resolved value display -->
                  <div v-if="token.resolvedValue" class="resolved-value">
                    <span class="resolved-label">Resolved:</span>
                    <code>{{ token.resolvedValue }}</code>
                  </div>
                </div>

                <!-- Modified indicator -->
                <div v-if="isModified(token)" class="modified-indicator">
                  <Pencil :size="14" />
                </div>
              </div>
            </div>
          </section>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1000px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);
  padding: var(--doc-space-m);
  background: var(--doc-feedback-error-subtle);
  border: 1px solid var(--doc-feedback-error);
  border-radius: var(--doc-radius-s);
  color: var(--doc-feedback-error-emphasis);
}

.loading {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);
  padding: var(--doc-space-xl);
  color: var(--doc-text-muted);
}

.spinner-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--doc-space-m);
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  margin-bottom: var(--doc-space-l);
}

.changes-indicator {
  .badge {
    display: inline-flex;
    align-items: center;
    padding: var(--doc-space-2xs) var(--doc-space-s);
    background: var(--doc-feedback-warning-subtle);
    color: var(--doc-feedback-warning-emphasis);
    border-radius: var(--doc-radius-s);
    font-size: 13px;
    font-weight: 500;
  }

  .no-changes {
    color: var(--doc-text-muted);
    font-size: 13px;
  }
}

.actions {
  display: flex;
  gap: var(--doc-space-s);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--doc-space-xs);
  padding: var(--doc-space-xs) var(--doc-space-m);
  border-radius: var(--doc-radius-s);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 100px;

  &--primary {
    background: var(--doc-accent);
    color: var(--doc-text-inverse);
    border: none;

    &:hover:not(:disabled) {
      background: var(--doc-accent-hover);
    }

    &:disabled {
      background: var(--doc-accent-disabled);
      cursor: not-allowed;
    }
  }

  &--secondary {
    background: var(--doc-surface-panel);
    color: var(--doc-text-default);
    border: 1px solid var(--doc-border);

    &:hover {
      background: var(--doc-surface-muted);
    }
  }
}

.save-message {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);
  padding: var(--doc-space-s) var(--doc-space-m);
  border-radius: var(--doc-radius-s);
  margin-bottom: var(--doc-space-l);
  font-size: 14px;

  &.success {
    background: var(--doc-feedback-success-subtle);
    color: var(--doc-feedback-success-emphasis);
    border: 1px solid var(--doc-feedback-success);
  }

  &.error {
    background: var(--doc-feedback-error-subtle);
    color: var(--doc-feedback-error-emphasis);
    border: 1px solid var(--doc-feedback-error);
  }
}

.token-groups {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xl);
}

.token-group {
  h2 {
    margin: 0 0 var(--doc-space-m);
    font-size: 18px;
    color: var(--doc-text-default);
  }
}

.token-list {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.token-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr auto;
  gap: var(--doc-space-m);
  align-items: center;
  padding: var(--doc-space-m);
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: var(--doc-border-strong);
  }

  &.modified {
    border-color: var(--doc-feedback-warning);
    background: var(--doc-feedback-warning-subtle);
  }
}

.token-info {
  min-width: 0;
}

.token-name {
  font-weight: 500;
  font-size: 14px;
  color: var(--doc-text-default);
  margin-bottom: var(--doc-space-3xs);
}

.token-path {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 12px;
  color: var(--doc-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.token-editor {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);
  flex-wrap: wrap;
}

.color-preview {
  width: 32px;
  height: 32px;
  border-radius: var(--doc-radius-s);
  border: 1px solid var(--doc-border);
  flex-shrink: 0;
}

.value-input {
  padding: var(--doc-space-xs) var(--doc-space-s);
  background: var(--doc-surface-canvas);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  font-size: 13px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  color: var(--doc-text-default);
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--doc-accent);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.resolved-value {
  display: flex;
  align-items: center;
  gap: var(--doc-space-2xs);
  font-size: 12px;

  .resolved-label {
    color: var(--doc-text-subtle);
  }

  code {
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    background: var(--doc-surface-muted);
    border-radius: var(--doc-radius-xs);
    color: var(--doc-text-muted);
    font-family: 'SF Mono', Monaco, Consolas, monospace;
  }
}

.modified-indicator {
  color: var(--doc-feedback-warning);
  font-size: 14px;
}
</style>
