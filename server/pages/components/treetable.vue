<script setup lang="ts">
import TreeTable from '@components/TreeTable/TreeTable.vue'
import '@components/TreeTable/TreeTable.scss'

const selectedKey = ref(null)
const expandedKeys = ref(['1', '2'])

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'size', header: 'Size' },
  { field: 'type', header: 'Type' },
]

const treeTableNodes = [
  {
    key: '1',
    name: 'Documents',
    size: '100 MB',
    type: 'Folder',
    children: [
      { key: '1-1', name: 'Work', size: '50 MB', type: 'Folder' },
      { key: '1-2', name: 'Personal', size: '50 MB', type: 'Folder' },
    ]
  },
  {
    key: '2',
    name: 'Images',
    size: '250 MB',
    type: 'Folder',
    children: [
      { key: '2-1', name: 'vacation.jpg', size: '5 MB', type: 'Image' },
      { key: '2-2', name: 'family.png', size: '3 MB', type: 'Image' },
      { key: '2-3', name: 'pet.gif', size: '2 MB', type: 'Image' },
    ]
  },
  {
    key: '3',
    name: 'readme.txt',
    size: '10 KB',
    type: 'Text',
  },
]

const treeTableProps = [
  { name: 'modelValue', type: 'String | Number | Array', default: 'null', description: 'Selected row key(s)' },
  { name: 'nodes', type: 'Array', default: '[]', description: 'Array of tree table nodes' },
  { name: 'columns', type: 'Array', default: '[]', description: 'Array of column definitions with field and header' },
  { name: 'expandedKeys', type: 'Array', default: '[]', description: 'Array of expanded row keys' },
  { name: 'selectionMode', type: 'String', default: 'null', description: 'Selection mode: single, multiple, checkbox, or null' },
  { name: 'keyField', type: 'String', default: '"key"', description: 'Property name for row key' },
  { name: 'childrenField', type: 'String', default: '"children"', description: 'Property name for row children' },
  { name: 'striped', type: 'Boolean', default: 'false', description: 'Show striped rows' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Whether the component is disabled' },
]

const treeTableEvents = [
  { name: 'update:modelValue', description: 'Emitted when selection changes' },
  { name: 'update:expandedKeys', description: 'Emitted when expanded rows change' },
  { name: 'node-select', description: 'Emitted when a row is selected' },
  { name: 'node-expand', description: 'Emitted when a row is expanded' },
  { name: 'node-collapse', description: 'Emitted when a row is collapsed' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="TreeTable"
      description="TreeTable component for displaying hierarchical data in a table format."
    />

    <ComponentDemo
      name="TreeTable"
      description="A table component with hierarchical row expansion."
      :props="treeTableProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <TreeTable
            v-model="selectedKey"
            v-model:expanded-keys="expandedKeys"
            :nodes="treeTableNodes"
            :columns="columns"
            selection-mode="single"
          />
          <p class="demo-info">Selected: {{ selectedKey || 'None' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>Striped Rows</h4>
        <div class="demo-row">
          <TreeTable
            :nodes="treeTableNodes"
            :columns="columns"
            striped
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>Checkbox Selection</h4>
        <div class="demo-row">
          <TreeTable
            :nodes="treeTableNodes"
            :columns="columns"
            selection-mode="checkbox"
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
          <tr v-for="event in treeTableEvents" :key="event.name">
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
  max-width: 700px;
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
