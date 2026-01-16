<script setup lang="ts">
import Toast from '@components/Toast/Toast.vue'
import '@components/Toast/Toast.scss'

const props = [
  { name: 'position', type: 'String', default: '"top-right"', description: 'Position of toast container: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, center' },
  { name: 'group', type: 'String', default: 'null', description: 'Group name for filtering toasts' },
  { name: 'showIcon', type: 'Boolean', default: 'true', description: 'Show severity icon' },
  { name: 'showProgress', type: 'Boolean', default: 'true', description: 'Show auto-dismiss progress bar' }
]

const toastProps = [
  { name: 'severity', type: 'String', description: 'Toast type: default, success, info, warning, error' },
  { name: 'summary', type: 'String', description: 'Main title text' },
  { name: 'detail', type: 'String', description: 'Secondary description text' },
  { name: 'life', type: 'Number', description: 'Auto-dismiss duration in ms (0 for sticky)' },
  { name: 'closable', type: 'Boolean', description: 'Show close button (default: true)' },
  { name: 'group', type: 'String', description: 'Group identifier for the toast' }
]

const methods = [
  { name: 'add(toast)', description: 'Adds a new toast and returns its ID' },
  { name: 'remove(id)', description: 'Removes a toast by ID' },
  { name: 'removeGroup(group)', description: 'Removes all toasts in a group' },
  { name: 'removeAllGroups()', description: 'Removes all toasts' }
]

// Toast refs for different positions
const toastTopRight = ref<InstanceType<typeof Toast> | null>(null)
const toastTopCenter = ref<InstanceType<typeof Toast> | null>(null)
const toastBottomRight = ref<InstanceType<typeof Toast> | null>(null)

// Position demo
const currentPosition = ref('top-right')
const positionToast = ref<InstanceType<typeof Toast> | null>(null)

function showSuccess() {
  toastTopRight.value?.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Your changes have been saved successfully.',
    life: 3000
  })
}

function showInfo() {
  toastTopRight.value?.add({
    severity: 'info',
    summary: 'Information',
    detail: 'A new software update is available.',
    life: 3000
  })
}

function showWarning() {
  toastTopRight.value?.add({
    severity: 'warning',
    summary: 'Warning',
    detail: 'Your session will expire in 5 minutes.',
    life: 4000
  })
}

function showError() {
  toastTopRight.value?.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to connect to the server. Please try again.',
    life: 5000
  })
}

function showSticky() {
  toastTopRight.value?.add({
    severity: 'info',
    summary: 'Sticky Toast',
    detail: 'This toast will not auto-dismiss. Click the X to close.',
    life: 0
  })
}

function showPositionToast() {
  positionToast.value?.add({
    severity: 'info',
    summary: `Position: ${currentPosition.value}`,
    detail: 'Toast displayed at the selected position.',
    life: 2000
  })
}

function showMultiple() {
  toastTopRight.value?.add({
    severity: 'success',
    summary: 'File Uploaded',
    detail: 'document.pdf uploaded successfully.',
    life: 3000
  })

  setTimeout(() => {
    toastTopRight.value?.add({
      severity: 'info',
      summary: 'Processing',
      detail: 'Your file is being processed...',
      life: 4000
    })
  }, 500)

  setTimeout(() => {
    toastTopRight.value?.add({
      severity: 'success',
      summary: 'Complete',
      detail: 'All operations completed.',
      life: 3000
    })
  }, 1000)
}

// Live preview
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Toast"
      description="Notification toasts for displaying brief, auto-dismissing messages with different severity levels."
    />

    <!-- Toast containers -->
    <Toast ref="toastTopRight" position="top-right" />
    <Toast ref="positionToast" :position="currentPosition" />

    <section class="demo-section">
      <h2>Severity Types</h2>
      <p class="section-description">Different severity levels for various notification types.</p>
      <div class="demo-row">
        <button class="demo-button demo-button--success" @click="showSuccess">
          Success
        </button>
        <button class="demo-button demo-button--info" @click="showInfo">
          Info
        </button>
        <button class="demo-button demo-button--warning" @click="showWarning">
          Warning
        </button>
        <button class="demo-button demo-button--error" @click="showError">
          Error
        </button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Sticky Toast</h2>
      <p class="section-description">Set life to 0 for toasts that don't auto-dismiss.</p>
      <div class="demo-row">
        <button class="demo-button" @click="showSticky">
          Show Sticky Toast
        </button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Toasts</h2>
      <p class="section-description">Toasts stack when multiple are shown.</p>
      <div class="demo-row">
        <button class="demo-button" @click="showMultiple">
          Show Multiple Toasts
        </button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Position</h2>
      <p class="section-description">Toasts can appear in different screen positions.</p>
      <div class="position-controls">
        <button
          v-for="pos in ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']"
          :key="pos"
          class="demo-button demo-button--small"
          :class="{ 'demo-button--active': currentPosition === pos }"
          @click="currentPosition = pos"
        >
          {{ pos }}
        </button>
      </div>
      <div class="demo-row">
        <button class="demo-button" @click="showPositionToast">
          Show Toast
        </button>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <Toast ref="toast" position="top-right" />

  <button @click="showToast">Show Toast</button>
</template>

<script setup>
import { ref } from "vue"
import Toast from "@components/Toast/Toast.vue"

const toast = ref(null)

function showToast() {
  toast.value.add({
    severity: "success",
    summary: "Success",
    detail: "Operation completed successfully.",
    life: 3000
  })
}

// Show error toast (sticky)
function showError() {
  toast.value.add({
    severity: "error",
    summary: "Error",
    detail: "Something went wrong.",
    life: 0,  // Sticky - no auto-dismiss
    closable: true
  })
}

// Remove all toasts
function clearAll() {
  toast.value.removeAllGroups()
}
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Component Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="props-section">
      <h2>Toast Object Properties</h2>
      <p class="section-description">Properties for the toast object passed to the add() method.</p>
      <table class="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in toastProps" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="methods-section">
      <h2>Methods</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in methods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the toast appearance using design tokens.</p>
      <ComponentTokenEditor
        component="toast"
        @tokens-changed="handleTokensChanged"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.demo-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
}

.position-controls {
  display: flex;
  gap: var(--doc-space-s);
  margin-bottom: var(--doc-space-m);
  flex-wrap: wrap;
}

.demo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--doc-space-s) var(--doc-space-m);
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: var(--doc-brand-primary, #1a365d);
  border: none;
  border-radius: var(--doc-radius-m);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--doc-brand-primary-hover, #2d4a7c);
  }

  &--success {
    background-color: #059669;
    &:hover { background-color: #047857; }
  }

  &--info {
    background-color: #0284c7;
    &:hover { background-color: #0369a1; }
  }

  &--warning {
    background-color: #d97706;
    &:hover { background-color: #b45309; }
  }

  &--error {
    background-color: #dc2626;
    &:hover { background-color: #b91c1c; }
  }

  &--small {
    padding: var(--doc-space-xs) var(--doc-space-s);
    font-size: 12px;
    color: var(--doc-text-default);
    background-color: var(--doc-surface-muted);
    border: 1px solid var(--doc-border);

    &:hover {
      background-color: var(--doc-surface-panel);
    }
  }

  &--active {
    background-color: var(--doc-brand-primary, #1a365d);
    border-color: var(--doc-brand-primary, #1a365d);
    color: white;

    &:hover {
      background-color: var(--doc-brand-primary-hover, #2d4a7c);
    }
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.methods-section,
.tokens-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
  }
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);
  overflow: hidden;

  th, td {
    padding: var(--doc-space-s) var(--doc-space-m);
    text-align: left;
    border-bottom: 1px solid var(--doc-border);
  }

  th {
    background: var(--doc-surface-muted);
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--doc-text-muted);
  }

  td {
    font-size: 14px;
  }

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
    font-size: 13px;
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>
