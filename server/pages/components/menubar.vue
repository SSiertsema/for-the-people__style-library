<script setup lang="ts">
import MenuBar from '@components/MenuBar/MenuBar.vue'
import '@components/MenuBar/MenuBar.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, url, items (submenu), command, and disabled properties' }
]

const events = [
  { name: 'item-click', description: 'Fired when a menu item is clicked. Payload: { originalEvent, item }' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

// Demo data
const basicItems = [
  { label: 'Home', icon: 'pi pi-home' },
  { label: 'Features', icon: 'pi pi-star' },
  { label: 'Projects', icon: 'pi pi-folder' },
  { label: 'Contact', icon: 'pi pi-envelope' }
]

const itemsWithSubmenu = [
  { label: 'Home', icon: 'pi pi-home', url: '#' },
  {
    label: 'Products',
    icon: 'pi pi-box',
    items: [
      { label: 'Electronics', icon: 'pi pi-bolt' },
      { label: 'Clothing', icon: 'pi pi-tag' },
      { separator: true },
      { label: 'Home & Garden', icon: 'pi pi-home' }
    ]
  },
  {
    label: 'Services',
    icon: 'pi pi-cog',
    items: [
      { label: 'Consulting', icon: 'pi pi-users' },
      { label: 'Support', icon: 'pi pi-question-circle' },
      {
        label: 'Training',
        icon: 'pi pi-book',
        items: [
          { label: 'Online Courses' },
          { label: 'Workshops' },
          { label: 'Certifications' }
        ]
      }
    ]
  },
  { label: 'About', icon: 'pi pi-info-circle' }
]

const itemsWithDisabled = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Settings', icon: 'pi pi-cog', disabled: true },
  { separator: true },
  { label: 'Help', icon: 'pi pi-question-circle' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="MenuBar"
      description="MenuBar is a horizontal menu component with support for dropdown submenus."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple horizontal menu bar with icons and labels.</p>
      <div class="demo-row">
        <MenuBar :model="basicItems" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Submenus</h2>
      <p class="section-description">Menu items can have nested submenus that appear on hover.</p>
      <div class="demo-row">
        <MenuBar :model="itemsWithSubmenu" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Disabled Items</h2>
      <p class="section-description">Menu items can be disabled and include separators.</p>
      <div class="demo-row">
        <MenuBar :model="itemsWithDisabled" />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <MenuBar :model="items" @item-click="onItemClick" />
</template>

<script setup>
import MenuBar from "@components/MenuBar/MenuBar.vue"
import "@components/MenuBar/MenuBar.scss"

const items = [
  { label: "Home", icon: "pi pi-home", url: "/" },
  {
    label: "Products",
    icon: "pi pi-box",
    items: [
      { label: "Electronics", icon: "pi pi-bolt" },
      { label: "Clothing", icon: "pi pi-tag" },
      { separator: true },
      { label: "All Products" }
    ]
  },
  { label: "About", icon: "pi pi-info-circle" }
]

function onItemClick({ originalEvent, item }) {
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

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize menubar tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="menubar"
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
                <MenuBar :model="basicItems" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Submenus</span>
              <div class="preview-row">
                <MenuBar :model="itemsWithSubmenu" />
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
