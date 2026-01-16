<script setup lang="ts">
import Dialog from '@components/Dialog/Dialog.vue'
import '@components/Dialog/Dialog.scss'

const props = [
  { name: 'visible', type: 'Boolean', default: 'false', description: 'Controls dialog visibility (v-model supported)' },
  { name: 'header', type: 'String', default: '""', description: 'Title text displayed in the header' },
  { name: 'closable', type: 'Boolean', default: 'true', description: 'Whether to show the close button' },
  { name: 'modal', type: 'Boolean', default: 'true', description: 'Displays an overlay behind the dialog' },
  { name: 'draggable', type: 'Boolean', default: 'false', description: 'Enables dragging the dialog by its header' },
  { name: 'dismissableMask', type: 'Boolean', default: 'false', description: 'Closes dialog when clicking the overlay' },
  { name: 'closeOnEscape', type: 'Boolean', default: 'true', description: 'Closes dialog when pressing Escape key' },
  { name: 'size', type: 'String', default: '"md"', description: 'Dialog width: sm, md, lg, xl' }
]

const events = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'show', description: 'Emitted when dialog becomes visible' },
  { name: 'hide', description: 'Emitted when dialog is closed' }
]

const slots = [
  { name: 'default', description: 'Main content of the dialog' },
  { name: 'header', description: 'Custom header content (overrides header prop)' },
  { name: 'footer', description: 'Footer content, typically for action buttons' }
]

// Dialog visibility states
const basicVisible = ref(false)
const headerVisible = ref(false)
const modalVisible = ref(false)
const sizesVisible = ref({ sm: false, md: false, lg: false, xl: false })
const footerVisible = ref(false)

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})
const previewVisible = ref(false)

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Dialog"
      description="Dialog component for modal windows, confirmations, and overlay content."
    />

    <section class="demo-section">
      <h2>Basic Dialog</h2>
      <p class="section-description">A simple dialog with default settings.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicVisible = true">
          Open Basic Dialog
        </button>
      </div>

      <Dialog v-model:visible="basicVisible" header="Basic Dialog">
        <p>This is a basic dialog with a header and closable button.</p>
        <p>Click the X button or press Escape to close.</p>
      </Dialog>
    </section>

    <section class="demo-section">
      <h2>Dialog with Custom Header</h2>
      <p class="section-description">Use the header slot for custom header content.</p>
      <div class="demo-row">
        <button class="demo-button" @click="headerVisible = true">
          Open Custom Header Dialog
        </button>
      </div>

      <Dialog v-model:visible="headerVisible">
        <template #header>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">*</span>
            <span style="font-weight: 600; font-size: 18px;">Custom Header</span>
          </div>
        </template>
        <p>This dialog has a custom header with an icon.</p>
      </Dialog>
    </section>

    <section class="demo-section">
      <h2>Modal Overlay</h2>
      <p class="section-description">Modal dialogs display a backdrop overlay that blocks interaction with the page.</p>
      <div class="demo-row">
        <button class="demo-button" @click="modalVisible = true">
          Open Modal Dialog
        </button>
      </div>

      <Dialog
        v-model:visible="modalVisible"
        header="Modal Dialog"
        :modal="true"
        :dismissable-mask="true"
      >
        <p>This modal has a dark overlay backdrop.</p>
        <p>You can click outside the dialog or press Escape to close it.</p>
      </Dialog>
    </section>

    <section class="demo-section">
      <h2>Dialog with Footer</h2>
      <p class="section-description">Use the footer slot for action buttons.</p>
      <div class="demo-row">
        <button class="demo-button" @click="footerVisible = true">
          Open Dialog with Footer
        </button>
      </div>

      <Dialog v-model:visible="footerVisible" header="Confirm Action">
        <p>Are you sure you want to proceed with this action?</p>
        <template #footer>
          <button class="demo-button demo-button--secondary" @click="footerVisible = false">
            Cancel
          </button>
          <button class="demo-button" @click="footerVisible = false">
            Confirm
          </button>
        </template>
      </Dialog>
    </section>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="section-description">Four size variants are available: sm, md, lg, xl.</p>
      <div class="demo-row">
        <button class="demo-button" @click="sizesVisible.sm = true">Small</button>
        <button class="demo-button" @click="sizesVisible.md = true">Medium</button>
        <button class="demo-button" @click="sizesVisible.lg = true">Large</button>
        <button class="demo-button" @click="sizesVisible.xl = true">XLarge</button>
      </div>

      <Dialog v-model:visible="sizesVisible.sm" header="Small Dialog" size="sm">
        <p>This is a small dialog (400px width).</p>
      </Dialog>
      <Dialog v-model:visible="sizesVisible.md" header="Medium Dialog" size="md">
        <p>This is a medium dialog (560px width).</p>
      </Dialog>
      <Dialog v-model:visible="sizesVisible.lg" header="Large Dialog" size="lg">
        <p>This is a large dialog (720px width).</p>
      </Dialog>
      <Dialog v-model:visible="sizesVisible.xl" header="XLarge Dialog" size="xl">
        <p>This is an extra large dialog (960px width).</p>
      </Dialog>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic dialog -->
  <button @click="visible = true">Open Dialog</button>

  <Dialog v-model:visible="visible" header="Dialog Title">
    <p>Dialog content goes here.</p>
  </Dialog>

  <!-- Dialog with footer -->
  <Dialog v-model:visible="confirmVisible" header="Confirm">
    <p>Are you sure?</p>
    <template #footer>
      <button @click="confirmVisible = false">Cancel</button>
      <button @click="onConfirm">Confirm</button>
    </template>
  </Dialog>

  <!-- Non-modal, dismissable dialog -->
  <Dialog
    v-model:visible="infoVisible"
    header="Information"
    :modal="false"
    :dismissable-mask="true"
  >
    <p>Click outside to close.</p>
  </Dialog>
</template>

<script setup>
import { ref } from "vue"
import Dialog from "@components/Dialog/Dialog.vue"

const visible = ref(false)
const confirmVisible = ref(false)
const infoVisible = ref(false)

const onConfirm = () => {
  // handle confirmation
  confirmVisible.value = false
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

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the dialog tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="dialog"
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

      <Dialog
        v-model:visible="previewVisible"
        header="Token Preview"
        :style="previewStyles"
      >
        <p>This dialog reflects the token values from the editor.</p>
        <p>Adjust the tokens on the left to see changes.</p>
        <template #footer>
          <button class="demo-button" @click="previewVisible = false">
            Close
          </button>
        </template>
      </Dialog>
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
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.slots-section,
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
