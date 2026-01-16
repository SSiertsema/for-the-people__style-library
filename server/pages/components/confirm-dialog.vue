<script setup lang="ts">
import ConfirmDialog from '@components/ConfirmDialog/ConfirmDialog.vue'
import '@components/ConfirmDialog/ConfirmDialog.scss'

const props = [
  { name: 'visible', type: 'Boolean', default: 'false', description: 'Controls dialog visibility (v-model supported)' },
  { name: 'header', type: 'String', default: '"Confirmation"', description: 'Title text displayed in the header' },
  { name: 'message', type: 'String', default: '"Are you sure you want to proceed?"', description: 'Confirmation message displayed in the dialog' },
  { name: 'icon', type: 'String', default: '"warning"', description: 'Icon type: warning, danger, info, or empty string for no icon' },
  { name: 'acceptLabel', type: 'String', default: '"Yes"', description: 'Label for the accept button' },
  { name: 'rejectLabel', type: 'String', default: '"No"', description: 'Label for the reject button' },
  { name: 'dismissableMask', type: 'Boolean', default: 'false', description: 'Closes dialog when clicking the overlay' },
  { name: 'closeOnEscape', type: 'Boolean', default: 'true', description: 'Closes dialog when pressing Escape key' }
]

const events = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'accept', description: 'Emitted when the accept button is clicked' },
  { name: 'reject', description: 'Emitted when the reject button is clicked or dialog is dismissed' }
]

// Dialog visibility states
const basicVisible = ref(false)
const warningVisible = ref(false)
const dangerVisible = ref(false)
const infoVisible = ref(false)
const customVisible = ref(false)

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})
const previewVisible = ref(false)

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

function handleAccept() {
  console.log('Accepted')
}

function handleReject() {
  console.log('Rejected')
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="ConfirmDialog"
      description="Confirmation modal dialog for confirming user actions with accept/reject buttons."
    />

    <section class="demo-section">
      <h2>Basic ConfirmDialog</h2>
      <p class="section-description">A simple confirmation dialog with default warning icon.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicVisible = true">
          Delete Item
        </button>
      </div>

      <ConfirmDialog
        v-model:visible="basicVisible"
        header="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        @accept="handleAccept"
        @reject="handleReject"
      />
    </section>

    <section class="demo-section">
      <h2>Icon Variants</h2>
      <p class="section-description">Different icon types for various confirmation contexts.</p>
      <div class="demo-row">
        <button class="demo-button" @click="warningVisible = true">Warning</button>
        <button class="demo-button demo-button--danger" @click="dangerVisible = true">Danger</button>
        <button class="demo-button demo-button--secondary" @click="infoVisible = true">Info</button>
      </div>

      <ConfirmDialog
        v-model:visible="warningVisible"
        header="Warning"
        message="This action may have unintended consequences. Do you want to continue?"
        icon="warning"
      />
      <ConfirmDialog
        v-model:visible="dangerVisible"
        header="Delete Account"
        message="This will permanently delete your account and all associated data."
        icon="danger"
        accept-label="Delete"
        reject-label="Cancel"
      />
      <ConfirmDialog
        v-model:visible="infoVisible"
        header="Information"
        message="You are about to change your notification preferences."
        icon="info"
        accept-label="Continue"
        reject-label="Go Back"
      />
    </section>

    <section class="demo-section">
      <h2>Custom Labels</h2>
      <p class="section-description">Customize the accept and reject button labels.</p>
      <div class="demo-row">
        <button class="demo-button" @click="customVisible = true">
          Save Changes
        </button>
      </div>

      <ConfirmDialog
        v-model:visible="customVisible"
        header="Save Changes"
        message="Do you want to save your changes before leaving?"
        icon=""
        accept-label="Save"
        reject-label="Discard"
      />
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <button @click="visible = true">Delete</button>

  <ConfirmDialog
    v-model:visible="visible"
    header="Confirm Delete"
    message="Are you sure you want to delete this item?"
    icon="warning"
    accept-label="Delete"
    reject-label="Cancel"
    @accept="onDelete"
    @reject="onCancel"
  />
</template>

<script setup>
import { ref } from "vue"
import ConfirmDialog from "@components/ConfirmDialog/ConfirmDialog.vue"

const visible = ref(false)

const onDelete = () => {
  // Handle delete action
  console.log("Item deleted")
}

const onCancel = () => {
  // Handle cancel
  console.log("Delete cancelled")
}
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Props</h2>
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

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the confirm dialog tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="confirmDialog"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <button class="demo-button" @click="previewVisible = true">
              Open Preview Dialog
            </button>
            <div class="preview-note">
              Note: The live preview dialog will open in a portal.
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        v-model:visible="previewVisible"
        header="Token Preview"
        message="This dialog reflects the token values from the editor."
        :style="previewStyles"
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

  &--secondary {
    color: var(--doc-text-default);
    background-color: transparent;
    border: 1px solid var(--doc-border);

    &:hover {
      background-color: var(--doc-surface-muted);
    }
  }

  &--danger {
    background-color: var(--doc-danger, #dc2626);

    &:hover {
      background-color: var(--doc-danger-hover, #b91c1c);
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
.events-section,
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

.token-editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--doc-space-l);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.token-editor-panel {
  min-width: 0;
}

.live-preview-panel {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.preview-header {
  padding: var(--doc-space-m);
  border-bottom: 1px solid var(--doc-border);
  background: var(--doc-surface-muted);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.preview-content {
  padding: var(--doc-space-l);
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
  align-items: flex-start;
}

.preview-note {
  font-size: 13px;
  color: var(--doc-text-muted);
  font-style: italic;
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
