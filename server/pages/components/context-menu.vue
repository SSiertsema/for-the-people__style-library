<script setup lang="ts">
import ContextMenu from '@components/ContextMenu/ContextMenu.vue'
import '@components/ContextMenu/ContextMenu.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, command, shortcut, items (for submenus), separator, disabled properties' },
  { name: 'global', type: 'Boolean', default: 'false', description: 'When true, attaches to document for global right-click menu' },
  { name: 'appendTo', type: 'String', default: '"body"', description: 'Element to append the menu to' }
]

const events = [
  { name: 'show', description: 'Emitted when the context menu becomes visible' },
  { name: 'hide', description: 'Emitted when the context menu is hidden' }
]

const methods = [
  { name: 'show(event)', description: 'Shows the context menu at the event position' },
  { name: 'hide()', description: 'Hides the context menu' },
  { name: 'toggle(event)', description: 'Toggles the context menu visibility' }
]

// Demo refs
const basicMenu = ref<InstanceType<typeof ContextMenu> | null>(null)
const submenuMenu = ref<InstanceType<typeof ContextMenu> | null>(null)

// Basic menu model
const basicItems = ref([
  { label: 'View', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
  { label: 'Edit', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' },
  { separator: true },
  { label: 'Copy', shortcut: 'Ctrl+C' },
  { label: 'Paste', shortcut: 'Ctrl+V' },
  { separator: true },
  { label: 'Delete', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' }
])

// Submenu model
const submenuItems = ref([
  {
    label: 'File',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>',
    items: [
      { label: 'New', shortcut: 'Ctrl+N' },
      { label: 'Open', shortcut: 'Ctrl+O' },
      { separator: true },
      { label: 'Save', shortcut: 'Ctrl+S' },
      { label: 'Save As...' }
    ]
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: 'Ctrl+Z' },
      { label: 'Redo', shortcut: 'Ctrl+Y' },
      { separator: true },
      { label: 'Cut', shortcut: 'Ctrl+X' },
      { label: 'Copy', shortcut: 'Ctrl+C' },
      { label: 'Paste', shortcut: 'Ctrl+V' }
    ]
  },
  { separator: true },
  { label: 'Refresh', shortcut: 'F5' },
  { label: 'Properties', disabled: true }
])

// Global menu model
const globalItems = ref([
  { label: 'Back', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>' },
  { label: 'Forward', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' },
  { label: 'Reload', shortcut: 'F5' },
  { separator: true },
  { label: 'View Page Source', shortcut: 'Ctrl+U' },
  { label: 'Inspect', shortcut: 'F12' }
])

function onBasicRightClick(event: MouseEvent) {
  basicMenu.value?.show(event)
}

function onSubmenuRightClick(event: MouseEvent) {
  submenuMenu.value?.show(event)
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
      title="ContextMenu"
      description="Right-click context menu with support for nested items, icons, keyboard shortcuts, and separators."
    />

    <section class="demo-section">
      <h2>Basic Context Menu</h2>
      <p class="section-description">Right-click on the area below to open the context menu.</p>
      <div
        class="demo-area"
        @contextmenu.prevent="onBasicRightClick"
      >
        Right-click here
      </div>
      <ContextMenu ref="basicMenu" :model="basicItems" />
    </section>

    <section class="demo-section">
      <h2>With Submenus</h2>
      <p class="section-description">Context menu with nested submenus for hierarchical navigation.</p>
      <div
        class="demo-area"
        @contextmenu.prevent="onSubmenuRightClick"
      >
        Right-click for submenu demo
      </div>
      <ContextMenu ref="submenuMenu" :model="submenuItems" />
    </section>

    <section class="demo-section">
      <h2>Global Context Menu</h2>
      <p class="section-description">A context menu that attaches to the entire document. Use the <code>global</code> prop.</p>
      <CodeSnippet
        language="vue"
        code='<ContextMenu :model="items" :global="true" />'
      />
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic usage with ref -->
  <div @contextmenu.prevent="onRightClick">
    Right-click me
  </div>
  <ContextMenu ref="menu" :model="items" />

  <!-- Global context menu -->
  <ContextMenu :model="globalItems" :global="true" />
</template>

<script setup>
import { ref } from "vue"
import ContextMenu from "@components/ContextMenu/ContextMenu.vue"

const menu = ref(null)

const items = [
  { label: "View", icon: "..." },
  { label: "Edit", command: ({ item }) => console.log(item) },
  { separator: true },
  { label: "Copy", shortcut: "Ctrl+C" },
  {
    label: "More",
    items: [
      { label: "Option 1" },
      { label: "Option 2" }
    ]
  }
]

function onRightClick(event) {
  menu.value.show(event)
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
      <p class="section-description">Customize the context menu appearance using design tokens.</p>
      <ComponentTokenEditor
        component="context-menu"
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

.demo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  padding: var(--doc-space-l);
  background: var(--doc-surface-panel);
  border: 2px dashed var(--doc-border);
  border-radius: var(--doc-radius-m);
  color: var(--doc-text-muted);
  font-size: 14px;
  cursor: context-menu;
  user-select: none;
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
