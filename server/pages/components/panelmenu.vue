<script setup lang="ts">
import PanelMenu from '@components/PanelMenu/PanelMenu.vue'
import '@components/PanelMenu/PanelMenu.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of panel objects with label, icon, items, and disabled properties' },
  { name: 'expandedKeys', type: 'Object', default: '{}', description: 'Object of expanded panel indices. Supports v-model:expandedKeys' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple panels to be expanded simultaneously' }
]

const events = [
  { name: 'update:expandedKeys', description: 'Fired when expanded panels change. Supports v-model:expandedKeys' },
  { name: 'panel-open', description: 'Fired when a panel is expanded. Payload: { index, panel }' },
  { name: 'panel-close', description: 'Fired when a panel is collapsed. Payload: { index, panel }' },
  { name: 'item-click', description: 'Fired when a menu item is clicked. Payload: { originalEvent, item }' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

// Demo data
const expandedKeys = ref({ 0: true })
const multipleExpandedKeys = ref({ 0: true, 1: true })

const basicItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    items: [
      { label: 'Overview', icon: 'pi pi-chart-line' },
      { label: 'Analytics', icon: 'pi pi-chart-bar' },
      { label: 'Reports', icon: 'pi pi-file' }
    ]
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    items: [
      { label: 'All Users', icon: 'pi pi-list' },
      { label: 'Add User', icon: 'pi pi-user-plus' },
      { label: 'Roles', icon: 'pi pi-shield' }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { label: 'General', icon: 'pi pi-sliders-h' },
      { label: 'Security', icon: 'pi pi-lock' },
      { label: 'Notifications', icon: 'pi pi-bell' }
    ]
  }
]

const nestedItems = [
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      { label: 'New', icon: 'pi pi-plus' },
      { label: 'Open', icon: 'pi pi-folder-open' },
      { separator: true },
      {
        label: 'Export',
        icon: 'pi pi-download',
        items: [
          { label: 'PDF', icon: 'pi pi-file-pdf' },
          { label: 'Excel', icon: 'pi pi-file-excel' },
          { label: 'CSV' }
        ]
      }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      { label: 'Undo', icon: 'pi pi-undo' },
      { label: 'Redo', icon: 'pi pi-refresh' },
      { separator: true },
      { label: 'Cut', icon: 'pi pi-copy' },
      { label: 'Paste', icon: 'pi pi-clipboard' }
    ]
  }
]

const itemsWithDisabled = [
  {
    label: 'Active Panel',
    icon: 'pi pi-check',
    items: [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Disabled Item', disabled: true }
    ]
  },
  {
    label: 'Disabled Panel',
    icon: 'pi pi-ban',
    disabled: true,
    items: [
      { label: 'Hidden Item 1' },
      { label: 'Hidden Item 2' }
    ]
  },
  {
    label: 'Another Panel',
    icon: 'pi pi-star',
    items: [
      { label: 'Item A' },
      { label: 'Item B' }
    ]
  }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="PanelMenu"
      description="PanelMenu is a hybrid of Accordion and Tree components for vertical navigation."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">An accordion-style menu with expandable sections. Click panel headers to expand/collapse.</p>
      <div class="demo-row">
        <div class="demo-panel-container">
          <PanelMenu v-model:expandedKeys="expandedKeys" :model="basicItems" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Expansion</h2>
      <p class="section-description">Set multiple prop to allow expanding multiple panels at once.</p>
      <div class="demo-row">
        <div class="demo-panel-container">
          <PanelMenu v-model:expandedKeys="multipleExpandedKeys" :model="basicItems" :multiple="true" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Nested Items</h2>
      <p class="section-description">Menu items can have nested submenus for hierarchical navigation.</p>
      <div class="demo-row">
        <div class="demo-panel-container">
          <PanelMenu :model="nestedItems" :expandedKeys="{ 0: true }" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled States</h2>
      <p class="section-description">Panels and individual items can be disabled.</p>
      <div class="demo-row">
        <div class="demo-panel-container">
          <PanelMenu :model="itemsWithDisabled" :expandedKeys="{ 0: true }" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <PanelMenu
    v-model:expandedKeys="expandedKeys"
    :model="model"
    :multiple="true"
    @panel-open="onPanelOpen"
    @item-click="onItemClick"
  />
</template>

<script setup>
import { ref } from "vue"
import PanelMenu from "@components/PanelMenu/PanelMenu.vue"
import "@components/PanelMenu/PanelMenu.scss"

const expandedKeys = ref({ 0: true })

const model = [
  {
    label: "Dashboard",
    icon: "pi pi-home",
    items: [
      { label: "Overview", icon: "pi pi-chart-line" },
      { label: "Analytics", icon: "pi pi-chart-bar" }
    ]
  },
  {
    label: "Settings",
    icon: "pi pi-cog",
    items: [
      { label: "General" },
      { label: "Security" }
    ]
  }
]

function onPanelOpen({ index, panel }) {
  console.log("Panel opened:", panel.label)
}

function onItemClick({ item }) {
  console.log("Item clicked:", item.label)
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
      <p class="section-description">Customize panelmenu tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="panelmenu"
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
                <div class="demo-panel-container">
                  <PanelMenu :model="basicItems" :expandedKeys="{ 0: true }" />
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
}

.demo-panel-container {
  width: 320px;
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
