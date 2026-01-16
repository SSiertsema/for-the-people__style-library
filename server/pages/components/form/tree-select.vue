<script setup lang="ts">
import TreeSelect from '@components/TreeSelect/TreeSelect.vue'
import '@components/TreeSelect/TreeSelect.scss'

const selectedSingle = ref<string | null>(null)
const selectedMultiple = ref<string[]>([])

const treeData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'work',
        label: 'Work',
        children: [
          { key: 'reports', label: 'Reports' },
          { key: 'presentations', label: 'Presentations' }
        ]
      },
      {
        key: 'personal',
        label: 'Personal',
        children: [
          { key: 'photos', label: 'Photos' },
          { key: 'music', label: 'Music' }
        ]
      }
    ]
  },
  {
    key: 'downloads',
    label: 'Downloads',
    children: [
      { key: 'software', label: 'Software' },
      { key: 'games', label: 'Games' }
    ]
  },
  {
    key: 'desktop',
    label: 'Desktop'
  }
]

const componentProps = [
  { name: 'modelValue', type: 'String | Array', default: 'null', description: 'Selected value(s) (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Tree structure data' },
  { name: 'selectionMode', type: 'String', default: '"single"', description: 'Selection mode: single, checkbox' },
  { name: 'placeholder', type: 'String', default: '"Select..."', description: 'Placeholder text' },
  { name: 'filter', type: 'Boolean', default: 'false', description: 'Enable filtering' },
  { name: 'labelField', type: 'String', default: '"label"', description: 'Property name for label' },
  { name: 'keyField', type: 'String', default: '"key"', description: 'Property name for key' },
  { name: 'childrenField', type: 'String', default: '"children"', description: 'Property name for children' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="TreeSelect"
      description="Tree-based dropdown selection component for hierarchical data."
    />

    <ComponentDemo
      name="TreeSelect"
      description="Select from a hierarchical tree structure."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Single Selection</h4>
        <div class="demo-row">
          <TreeSelect v-model="selectedSingle" :options="treeData" placeholder="Select a folder" />
        </div>
        <p class="selected-value">Selected: {{ selectedSingle || 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Checkbox Selection</h4>
        <div class="demo-row">
          <TreeSelect
            v-model="selectedMultiple"
            :options="treeData"
            selection-mode="checkbox"
            placeholder="Select folders"
          />
        </div>
        <p class="selected-value">Selected: {{ selectedMultiple.length ? selectedMultiple.join(', ') : 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>With Filter</h4>
        <div class="demo-row">
          <TreeSelect :options="treeData" :filter="true" placeholder="Search and select..." />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <TreeSelect :options="treeData" size="sm" placeholder="Small" />
          <TreeSelect :options="treeData" size="md" placeholder="Medium" />
          <TreeSelect :options="treeData" size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <TreeSelect :options="treeData" placeholder="Default" />
          <TreeSelect :options="treeData" placeholder="Disabled" is-disabled />
          <TreeSelect :options="treeData" placeholder="Invalid" is-invalid />
        </div>
      </div>
    </ComponentDemo>
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
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--doc-space-m);

  .tree-select {
    width: 280px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
