<script setup lang="ts">
import OverlayPanel from '@components/OverlayPanel/OverlayPanel.vue'
import '@components/OverlayPanel/OverlayPanel.scss'

const props = [
  { name: 'visible', type: 'Boolean', default: 'undefined', description: 'Controls panel visibility (v-model supported). If not provided, uses internal state.' },
  { name: 'appendTo', type: 'String', default: '"body"', description: 'Element selector to append the panel to' },
  { name: 'dismissable', type: 'Boolean', default: 'true', description: 'Closes panel when clicking outside or pressing Escape' },
  { name: 'showCloseIcon', type: 'Boolean', default: 'false', description: 'Shows a close button in the panel' }
]

const events = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'show', description: 'Emitted when panel becomes visible' },
  { name: 'hide', description: 'Emitted when panel is hidden' }
]

const slots = [
  { name: 'default', description: 'Content of the panel' }
]

const methods = [
  { name: 'show(event)', description: 'Shows the panel positioned relative to the event target' },
  { name: 'hide()', description: 'Hides the panel' },
  { name: 'toggle(event)', description: 'Toggles the panel visibility' }
]

// Refs for panels
const basicPanel = ref()
const closeIconPanel = ref()
const nonDismissablePanel = ref()
const richContentPanel = ref()

// Live preview
const previewStyles = ref<Record<string, string>>({})
const previewPanel = ref()

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="OverlayPanel"
      description="Click-triggered overlay panel for displaying contextual content, menus, or forms."
    />

    <section class="demo-section">
      <h2>Basic OverlayPanel</h2>
      <p class="section-description">A simple panel that appears when clicking the trigger button.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicPanel?.toggle($event)">
          Toggle Panel
        </button>
      </div>

      <OverlayPanel ref="basicPanel">
        <div class="panel-content">
          <h4>Panel Title</h4>
          <p>This is a basic overlay panel with some content.</p>
        </div>
      </OverlayPanel>
    </section>

    <section class="demo-section">
      <h2>With Close Icon</h2>
      <p class="section-description">Display a close button in the panel corner.</p>
      <div class="demo-row">
        <button class="demo-button" @click="closeIconPanel?.toggle($event)">
          Open Panel
        </button>
      </div>

      <OverlayPanel ref="closeIconPanel" :show-close-icon="true">
        <div class="panel-content panel-content--with-close">
          <h4>Closeable Panel</h4>
          <p>Click the X button to close this panel.</p>
        </div>
      </OverlayPanel>
    </section>

    <section class="demo-section">
      <h2>Non-Dismissable</h2>
      <p class="section-description">Panel that stays open when clicking outside. Must be closed explicitly.</p>
      <div class="demo-row">
        <button class="demo-button" @click="nonDismissablePanel?.toggle($event)">
          Open Sticky Panel
        </button>
      </div>

      <OverlayPanel ref="nonDismissablePanel" :dismissable="false" :show-close-icon="true">
        <div class="panel-content panel-content--with-close">
          <h4>Sticky Panel</h4>
          <p>This panel won't close when clicking outside.</p>
          <p>Use the close button to dismiss.</p>
        </div>
      </OverlayPanel>
    </section>

    <section class="demo-section">
      <h2>Rich Content</h2>
      <p class="section-description">Panels can contain forms, lists, and other interactive content.</p>
      <div class="demo-row">
        <button class="demo-button" @click="richContentPanel?.toggle($event)">
          Settings
        </button>
      </div>

      <OverlayPanel ref="richContentPanel">
        <div class="panel-settings">
          <h4>Quick Settings</h4>
          <div class="panel-settings__item">
            <label>
              <input type="checkbox" checked>
              Enable notifications
            </label>
          </div>
          <div class="panel-settings__item">
            <label>
              <input type="checkbox">
              Dark mode
            </label>
          </div>
          <div class="panel-settings__item">
            <label>
              <input type="checkbox" checked>
              Auto-save
            </label>
          </div>
          <div class="panel-settings__footer">
            <button class="panel-button" @click="richContentPanel?.hide()">
              Done
            </button>
          </div>
        </div>
      </OverlayPanel>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <button @click="panel?.toggle($event)">Toggle Panel</button>

  <OverlayPanel ref="panel" :show-close-icon="true">
    <div>
      <h4>Panel Content</h4>
      <p>Your content here...</p>
    </div>
  </OverlayPanel>

  <!-- Controlled mode with v-model -->
  <button @click="isOpen = !isOpen">Open</button>

  <OverlayPanel v-model:visible="isOpen">
    <div>Controlled panel content</div>
  </OverlayPanel>
</template>

<script setup>
import { ref } from "vue"
import OverlayPanel from "@components/OverlayPanel/OverlayPanel.vue"

const panel = ref()
const isOpen = ref(false)
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
      <p class="section-description">Customize the overlay panel tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="overlayPanel"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <button class="demo-button" @click="previewPanel?.toggle($event)">
              Open Preview Panel
            </button>
          </div>
        </div>
      </div>

      <OverlayPanel ref="previewPanel" :style="previewStyles">
        <div class="panel-content">
          <h4>Token Preview</h4>
          <p>This panel reflects the token values from the editor.</p>
        </div>
      </OverlayPanel>
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
}

.panel-content {
  min-width: 200px;

  &--with-close {
    padding-right: var(--doc-space-xl);
  }

  h4 {
    margin: 0 0 var(--doc-space-xs);
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.panel-settings {
  min-width: 220px;

  h4 {
    margin: 0 0 var(--doc-space-m);
    font-size: 16px;
  }

  &__item {
    padding: var(--doc-space-xs) 0;

    label {
      display: flex;
      align-items: center;
      gap: var(--doc-space-s);
      cursor: pointer;
      font-size: 14px;
    }

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
  }

  &__footer {
    margin-top: var(--doc-space-m);
    padding-top: var(--doc-space-m);
    border-top: 1px solid var(--doc-border);
    display: flex;
    justify-content: flex-end;
  }
}

.panel-button {
  padding: var(--doc-space-xs) var(--doc-space-m);
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: var(--doc-brand-primary, #1a365d);
  border: none;
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--doc-brand-primary-hover, #2d4a7c);
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
