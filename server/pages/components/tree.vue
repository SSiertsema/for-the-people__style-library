<script setup lang="ts">
import Tree from '@components/Tree/Tree.vue'
import '@components/Tree/Tree.scss'

const selectedKey = ref(null)
const selectedKeys = ref([])
const expandedKeys = ref(['1', '2'])

const treeNodes = [
  {
    key: '1',
    label: 'Documents',
    children: [
      { key: '1-1', label: 'Work' },
      { key: '1-2', label: 'Personal' },
    ]
  },
  {
    key: '2',
    label: 'Images',
    children: [
      { key: '2-1', label: 'Vacation' },
      { key: '2-2', label: 'Family' },
      { key: '2-3', label: 'Pets' },
    ]
  },
  {
    key: '3',
    label: 'Videos',
    children: [
      { key: '3-1', label: 'Movies' },
      { key: '3-2', label: 'TV Shows' },
    ]
  },
]

const treeProps = [
  { name: 'modelValue', type: 'String | Number | Array', default: 'null', description: 'Selected node key(s)' },
  { name: 'nodes', type: 'Array', default: '[]', description: 'Array of tree nodes' },
  { name: 'expandedKeys', type: 'Array', default: '[]', description: 'Array of expanded node keys' },
  { name: 'selectionMode', type: 'String', default: '"single"', description: 'Selection mode: single, multiple, checkbox, or null' },
  { name: 'filter', type: 'Boolean', default: 'false', description: 'Show filter input' },
  { name: 'labelField', type: 'String', default: '"label"', description: 'Property name for node label' },
  { name: 'keyField', type: 'String', default: '"key"', description: 'Property name for node key' },
  { name: 'childrenField', type: 'String', default: '"children"', description: 'Property name for node children' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Whether the component is disabled' },
]

const treeEvents = [
  { name: 'update:modelValue', description: 'Emitted when selection changes' },
  { name: 'update:expandedKeys', description: 'Emitted when expanded nodes change' },
  { name: 'node-select', description: 'Emitted when a node is selected' },
  { name: 'node-expand', description: 'Emitted when a node is expanded' },
  { name: 'node-collapse', description: 'Emitted when a node is collapsed' },
  { name: 'filter', description: 'Emitted when filter value changes' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Tree"
      description="Tree component for displaying hierarchical data with expand/collapse and selection."
    />

    <ComponentDemo
      name="Tree"
      description="A hierarchical tree view component."
      :props="treeProps"
    >
      <div class="demo-section">
        <h4>Single Selection</h4>
        <div class="demo-row">
          <Tree
            v-model="selectedKey"
            v-model:expanded-keys="expandedKeys"
            :nodes="treeNodes"
            selection-mode="single"
          />
          <p class="demo-info">Selected: {{ selectedKey || 'None' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>Checkbox Selection</h4>
        <div class="demo-row">
          <Tree
            v-model="selectedKeys"
            :nodes="treeNodes"
            selection-mode="checkbox"
          />
          <p class="demo-info">Selected: {{ selectedKeys.length > 0 ? selectedKeys.join(', ') : 'None' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Filter</h4>
        <div class="demo-row">
          <Tree
            :nodes="treeNodes"
            selection-mode="single"
            filter
          />
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
          <tr v-for="event in treeEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
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

.demo-row {
  max-width: 400px;
}

.demo-info {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}

.events-section {
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
