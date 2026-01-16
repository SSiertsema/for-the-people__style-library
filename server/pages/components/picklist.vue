<script setup lang="ts">
import PickList from '@components/PickList/PickList.vue'
import '@components/PickList/PickList.scss'

const sourceItems = ref([
  { id: 1, name: 'React' },
  { id: 2, name: 'Vue' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Svelte' },
  { id: 5, name: 'Ember' },
])

const targetItems = ref([
  { id: 6, name: 'Next.js' },
  { id: 7, name: 'Nuxt' },
])

const picklistProps = [
  { name: 'source', type: 'Array', default: '[]', description: 'Array of items in the source list' },
  { name: 'target', type: 'Array', default: '[]', description: 'Array of items in the target list' },
  { name: 'sourceHeader', type: 'String', default: '""', description: 'Header text for the source list' },
  { name: 'targetHeader', type: 'String', default: '""', description: 'Header text for the target list' },
  { name: 'dataKey', type: 'String', default: 'null', description: 'Property name for unique item identifier' },
  { name: 'labelKey', type: 'String', default: '"label"', description: 'Property name for item label' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Whether the component is disabled' },
]

const picklistEvents = [
  { name: 'update:source', description: 'Emitted when source list changes' },
  { name: 'update:target', description: 'Emitted when target list changes' },
  { name: 'move-to-target', description: 'Emitted when items are moved to target' },
  { name: 'move-to-source', description: 'Emitted when items are moved to source' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="PickList"
      description="PickList component for transferring items between source and target lists."
    />

    <ComponentDemo
      name="PickList"
      description="A dual list component for selecting and transferring items between lists."
      :props="picklistProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <PickList
            v-model:source="sourceItems"
            v-model:target="targetItems"
            source-header="Available"
            target-header="Selected"
            data-key="id"
            label-key="name"
          >
            <template #item="{ item }">
              {{ item.name }}
            </template>
          </PickList>
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
          <tr v-for="event in picklistEvents" :key="event.name">
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
  max-width: 800px;
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
