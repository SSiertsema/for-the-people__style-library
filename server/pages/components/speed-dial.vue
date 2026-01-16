<script setup lang="ts">
import SpeedDial from '@components/SpeedDial/SpeedDial.vue'
import '@components/SpeedDial/SpeedDial.scss'

const actions = [
  {
    label: 'Add',
    icon: 'pi pi-plus',
    command: () => console.log('Add clicked')
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => console.log('Edit clicked')
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => console.log('Delete clicked')
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    command: () => console.log('Share clicked')
  }
]

const componentProps = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of action items with label, icon, and command' },
  { name: 'direction', type: 'String', default: '"up"', description: 'Direction: up, down, left, right' },
  { name: 'type', type: 'String', default: '"linear"', description: 'Layout type: linear, circle, semi-circle, quarter-circle' },
  { name: 'radius', type: 'Number', default: '80', description: 'Radius for circular layouts (in pixels)' },
  { name: 'showLabels', type: 'Boolean', default: 'true', description: 'Show action labels' },
  { name: 'openOnHover', type: 'Boolean', default: 'false', description: 'Open menu on hover' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="SpeedDial"
      description="Floating action button that reveals a menu of related actions."
    />

    <ComponentDemo
      name="SpeedDial"
      description="FAB (Floating Action Button) with expandable action menu."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Directions (Linear)</h4>
        <div class="demo-grid">
          <div class="demo-cell demo-cell--center">
            <SpeedDial :model="actions" direction="up" />
            <span class="demo-label">Up</span>
          </div>
          <div class="demo-cell demo-cell--center">
            <SpeedDial :model="actions" direction="down" />
            <span class="demo-label">Down</span>
          </div>
          <div class="demo-cell demo-cell--center">
            <SpeedDial :model="actions" direction="left" />
            <span class="demo-label">Left</span>
          </div>
          <div class="demo-cell demo-cell--center">
            <SpeedDial :model="actions" direction="right" />
            <span class="demo-label">Right</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Circular Layouts</h4>
        <div class="demo-grid demo-grid--large">
          <div class="demo-cell demo-cell--large">
            <SpeedDial :model="actions" type="circle" :radius="80" />
            <span class="demo-label">Circle</span>
          </div>
          <div class="demo-cell demo-cell--large">
            <SpeedDial :model="actions" type="semi-circle" direction="up" :radius="80" />
            <span class="demo-label">Semi-circle (up)</span>
          </div>
          <div class="demo-cell demo-cell--large">
            <SpeedDial :model="actions" type="quarter-circle" direction="up" :radius="80" />
            <span class="demo-label">Quarter-circle</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Without Labels</h4>
        <div class="demo-cell demo-cell--center">
          <SpeedDial :model="actions" direction="right" :show-labels="false" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Open on Hover</h4>
        <div class="demo-cell demo-cell--center">
          <SpeedDial :model="actions" direction="up" :open-on-hover="true" />
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
  margin-bottom: var(--doc-space-2xl);

  h4 {
    margin: 0 0 var(--doc-space-m);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--doc-space-xl);

  &--large {
    grid-template-columns: repeat(3, 1fr);
  }
}

.demo-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--doc-space-m);
  padding: var(--doc-space-2xl);
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  min-height: 200px;

  &--center {
    justify-content: center;
  }

  &--large {
    min-height: 250px;
  }
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
  margin-top: auto;
}
</style>
