<script setup lang="ts">
import SplitButton from '@components/SplitButton/SplitButton.vue'
import '@components/SplitButton/SplitButton.scss'

const menuItems = [
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => console.log('Update clicked')
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => console.log('Delete clicked')
  },
  {
    label: 'Export',
    icon: 'pi pi-upload',
    command: () => console.log('Export clicked')
  }
]

const onMainClick = () => {
  console.log('Main button clicked')
}

const componentProps = [
  { name: 'label', type: 'String', default: '-', description: 'Button text label' },
  { name: 'icon', type: 'String', default: '-', description: 'Icon class (e.g., pi pi-save)' },
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, and command' },
  { name: 'severity', type: 'String', default: '"primary"', description: 'Style: primary, secondary, outlined' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="SplitButton"
      description="Button with a dropdown menu for additional actions."
    />

    <ComponentDemo
      name="SplitButton"
      description="Combines a main action button with a dropdown menu of related actions."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <SplitButton label="Save" :model="menuItems" @click="onMainClick" />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Icon</h4>
        <div class="demo-row">
          <SplitButton label="Save" icon="pi pi-save" :model="menuItems" @click="onMainClick" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Severities</h4>
        <div class="demo-row">
          <div class="demo-item">
            <SplitButton label="Primary" :model="menuItems" severity="primary" />
            <span class="demo-label">Primary</span>
          </div>
          <div class="demo-item">
            <SplitButton label="Secondary" :model="menuItems" severity="secondary" />
            <span class="demo-label">Secondary</span>
          </div>
          <div class="demo-item">
            <SplitButton label="Outlined" :model="menuItems" severity="outlined" />
            <span class="demo-label">Outlined</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <div class="demo-item">
            <SplitButton label="Small" :model="menuItems" size="sm" />
            <span class="demo-label">Small</span>
          </div>
          <div class="demo-item">
            <SplitButton label="Medium" :model="menuItems" size="md" />
            <span class="demo-label">Medium</span>
          </div>
          <div class="demo-item">
            <SplitButton label="Large" :model="menuItems" size="lg" />
            <span class="demo-label">Large</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled</h4>
        <div class="demo-row">
          <SplitButton label="Disabled" :model="menuItems" is-disabled />
          <SplitButton label="Disabled" :model="menuItems" severity="secondary" is-disabled />
          <SplitButton label="Disabled" :model="menuItems" severity="outlined" is-disabled />
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
  align-items: flex-end;
  gap: var(--doc-space-xl);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--doc-space-s);
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
