<script setup lang="ts">
import { ref } from 'vue'
import TieredMenu from '@components/TieredMenu/TieredMenu.vue'
import '@components/TieredMenu/TieredMenu.scss'
import Button from '@components/Button/Button.vue'
import '@components/Button/Button.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, url, items (submenu), command, and disabled properties' },
  { name: 'popup', type: 'Boolean', default: 'false', description: 'Display as a popup overlay triggered by an external element' }
]

const events = [
  { name: 'item-click', description: 'Fired when a menu item is clicked. Payload: { originalEvent, item }' },
  { name: 'show', description: 'Fired when the popup menu is shown (popup mode only)' },
  { name: 'hide', description: 'Fired when the popup menu is hidden (popup mode only)' }
]

const methods = [
  { name: 'show(event)', description: 'Show the popup menu at the target element position' },
  { name: 'hide()', description: 'Hide the popup menu' },
  { name: 'toggle(event)', description: 'Toggle the popup menu visibility' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

// Demo data
const popupMenuRef = ref()

const basicItems = [
  { label: 'New', icon: 'pi pi-plus' },
  { label: 'Open', icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save', icon: 'pi pi-save' },
  { label: 'Save As', icon: 'pi pi-file-export' }
]

const nestedItems = [
  { label: 'File', icon: 'pi pi-file',
    items: [
      { label: 'New', icon: 'pi pi-plus' },
      { label: 'Open', icon: 'pi pi-folder-open' },
      { label: 'Recent Files',
        items: [
          { label: 'Document1.txt' },
          { label: 'Document2.txt' },
          { label: 'Document3.txt' }
        ]
      }
    ]
  },
  { label: 'Edit', icon: 'pi pi-pencil',
    items: [
      { label: 'Undo', icon: 'pi pi-undo' },
      { label: 'Redo', icon: 'pi pi-refresh' },
      { separator: true },
      { label: 'Cut', icon: 'pi pi-copy' },
      { label: 'Copy', icon: 'pi pi-clone' },
      { label: 'Paste', icon: 'pi pi-clipboard' }
    ]
  },
  { label: 'View', icon: 'pi pi-eye',
    items: [
      { label: 'Zoom In', icon: 'pi pi-search-plus' },
      { label: 'Zoom Out', icon: 'pi pi-search-minus' },
      { separator: true },
      { label: 'Full Screen', icon: 'pi pi-window-maximize' }
    ]
  },
  { label: 'Help', icon: 'pi pi-question-circle' }
]

const itemsWithDisabled = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Reports', icon: 'pi pi-chart-bar', disabled: true },
  { separator: true },
  { label: 'Settings', icon: 'pi pi-cog',
    items: [
      { label: 'General' },
      { label: 'Advanced', disabled: true },
      { label: 'Notifications' }
    ]
  }
]

function togglePopupMenu(event: Event) {
  popupMenuRef.value?.toggle(event)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="TieredMenu"
      description="TieredMenu displays nested submenus in flyout panels on hover."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple inline menu with items and separators.</p>
      <div class="demo-row">
        <div class="demo-menu-container">
          <TieredMenu :model="basicItems" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Nested Submenus</h2>
      <p class="section-description">Menu items with nested submenus that appear as flyouts on hover.</p>
      <div class="demo-row">
        <div class="demo-menu-container">
          <TieredMenu :model="nestedItems" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Popup Mode</h2>
      <p class="section-description">Use popup mode to display the menu as an overlay triggered by a button.</p>
      <div class="demo-row">
        <Button label="Show Menu" icon="pi pi-bars" @click="togglePopupMenu" />
        <TieredMenu ref="popupMenuRef" :model="nestedItems" :popup="true" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled Items</h2>
      <p class="section-description">Menu items and submenus can be individually disabled.</p>
      <div class="demo-row">
        <div class="demo-menu-container">
          <TieredMenu :model="itemsWithDisabled" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Inline menu -->
  <TieredMenu :model="items" @item-click="onItemClick" />

  <!-- Popup menu -->
  <Button label="Menu" @click="toggleMenu" />
  <TieredMenu ref="menuRef" :model="items" :popup="true" />
</template>

<script setup>
import { ref } from "vue"
import TieredMenu from "@components/TieredMenu/TieredMenu.vue"
import "@components/TieredMenu/TieredMenu.scss"

const menuRef = ref()

const items = [
  { label: "File", icon: "pi pi-file",
    items: [
      { label: "New", icon: "pi pi-plus" },
      { label: "Open", icon: "pi pi-folder-open" },
      { label: "Recent",
        items: [
          { label: "Document1.txt" },
          { label: "Document2.txt" }
        ]
      }
    ]
  },
  { label: "Edit", icon: "pi pi-pencil",
    items: [
      { label: "Undo", icon: "pi pi-undo" },
      { label: "Redo", icon: "pi pi-refresh" }
    ]
  }
]

function toggleMenu(event) {
  menuRef.value.toggle(event)
}

function onItemClick({ item }) {
  console.log("Clicked:", item.label)
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
      <p class="section-description">Customize tieredmenu tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="tieredmenu"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Basic</span>
              <div class="preview-row">
                <div class="demo-menu-container">
                  <TieredMenu :model="basicItems" />
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Submenus</span>
              <div class="preview-row">
                <div class="demo-menu-container">
                  <TieredMenu :model="nestedItems" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  align-items: flex-start;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
  position: relative;
}

.demo-menu-container {
  width: 240px;
  max-width: 100%;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
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
  gap: var(--doc-space-l);
}

.preview-group {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.preview-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--doc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-row {
  display: flex;
  align-items: flex-start;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
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
