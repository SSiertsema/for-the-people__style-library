<script setup lang="ts">
import Menu from '@components/Menu/Menu.vue'
import '@components/Menu/Menu.scss'
import Button from '@components/Button/Button.vue'
import '@components/Button/Button.scss'

const menuRef = ref()

const items = ref([
  { label: 'New', icon: 'pi pi-plus' },
  { label: 'Open', icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Save', icon: 'pi pi-save' },
  { label: 'Save As...', icon: 'pi pi-file-export' },
  { separator: true },
  { label: 'Exit', icon: 'pi pi-times' }
])

const actionItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => alert('Edit clicked!')
  },
  {
    label: 'Duplicate',
    icon: 'pi pi-copy',
    command: () => alert('Duplicate clicked!')
  },
  { separator: true },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => alert('Delete clicked!')
  }
])

const disabledItems = ref([
  { label: 'Active item', icon: 'pi pi-check' },
  { label: 'Disabled item', icon: 'pi pi-ban', disabled: true },
  { label: 'Another active', icon: 'pi pi-star' }
])

const toggleMenu = (event: Event) => {
  menuRef.value?.toggle(event)
}

const componentProps = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, command, separator, disabled properties' },
  { name: 'popup', type: 'Boolean', default: 'false', description: 'Displays as popup menu when true' }
]

const menuEvents = [
  { name: 'item-click', description: 'Emitted when a menu item is clicked' },
  { name: 'show', description: 'Emitted when popup menu is shown' },
  { name: 'hide', description: 'Emitted when popup menu is hidden' }
]

const menuMethods = [
  { name: 'show(event)', description: 'Show the popup menu at the event position' },
  { name: 'hide()', description: 'Hide the popup menu' },
  { name: 'toggle(event)', description: 'Toggle the popup menu visibility' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Menu"
      description="Menu component for displaying a list of actions or navigation items. Supports inline and popup modes."
    />

    <ComponentDemo
      name="Menu"
      description="A menu displaying a list of items."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Inline Menu</h4>
        <div class="demo-row demo-row--inline">
          <Menu :model="items" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Popup Menu</h4>
        <div class="demo-row">
          <Button label="Toggle Menu" icon="pi pi-bars" @click="toggleMenu" />
          <Menu ref="menuRef" :model="actionItems" popup />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Command Callbacks</h4>
        <p class="section-note">Click items to see commands execute</p>
        <div class="demo-row demo-row--inline">
          <Menu :model="actionItems" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled Items</h4>
        <div class="demo-row demo-row--inline">
          <Menu :model="disabledItems" />
        </div>
      </div>
    </ComponentDemo>

    <div class="events-section">
      <h3>Events</h3>
      <table class="events-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in menuEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="methods-section">
      <h3>Methods</h3>
      <table class="events-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in menuMethods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-l);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.section-note {
  font-size: 13px;
  color: var(--doc-text-muted);
  margin: 0 0 var(--doc-space-s);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--doc-space-l);
}

.demo-row--inline {
  max-width: 280px;
}

.events-section,
.methods-section {
  margin-top: var(--doc-space-xl);
  padding: var(--doc-space-l);
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);

  h3 {
    margin: 0 0 var(--doc-space-m);
    font-size: 18px;
    font-weight: 600;
  }
}

.events-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: var(--doc-space-s) var(--doc-space-m);
    border-bottom: 1px solid var(--doc-border-subtle);
  }

  th {
    font-weight: 600;
    font-size: 13px;
    color: var(--doc-text-muted);
  }

  td code {
    background: var(--doc-surface-muted);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
}
</style>
