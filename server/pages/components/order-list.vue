<script setup lang="ts">
import OrderList from '@components/OrderList/OrderList.vue'
import '@components/OrderList/OrderList.scss'

const orderListProps = [
  { name: 'modelValue', type: 'Array', default: '[]', description: 'Array of items to display and reorder (v-model)' },
  { name: 'header', type: 'String', default: '""', description: 'Header text displayed above the list' },
  { name: 'dataKey', type: 'String', default: 'null', description: 'Property name to use as the display value when items are objects' },
  { name: 'itemKey', type: 'String', default: 'null', description: 'Property name to use as a unique key for items' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple item selection (ctrl/cmd+click)' }
]

const orderListEvents = [
  { name: 'update:modelValue', description: 'Emitted when the list order changes' },
  { name: 'reorder', description: 'Emitted when items are reordered, provides { value }' },
  { name: 'selection-change', description: 'Emitted when selection changes, provides { selection }' }
]

const orderListSlots = [
  { name: 'header', description: 'Custom header content' },
  { name: 'item', description: 'Custom item template' },
  { name: 'empty', description: 'Content to display when list is empty' }
]

const cities = ref([
  { name: 'San Francisco', code: 'SF' },
  { name: 'London', code: 'LDN' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Berlin', code: 'BER' },
  { name: 'Barcelona', code: 'BCN' }
])

const simpleTasks = ref([
  'Design mockups',
  'Review specifications',
  'Implement features',
  'Write tests',
  'Deploy to staging'
])
</script>

<template>
  <div class="page">
    <PageHeader
      title="OrderList"
      description="OrderList is used to reorder items in a list with drag-and-drop or control buttons."
    />

    <section class="demo-section">
      <h2>Basic OrderList</h2>
      <p class="section-description">Simple list with string items that can be reordered.</p>
      <div class="demo-row">
        <OrderList v-model="simpleTasks" header="Tasks" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Object Items</h2>
      <p class="section-description">OrderList with object items using dataKey for display.</p>
      <div class="demo-row">
        <OrderList v-model="cities" header="Cities" data-key="name" item-key="code">
          <template #item="{ item }">
            <div class="city-item">
              <span class="city-item__name">{{ item.name }}</span>
              <span class="city-item__code">{{ item.code }}</span>
            </div>
          </template>
        </OrderList>
      </div>
    </section>

    <section class="demo-section">
      <h2>Drag and Drop</h2>
      <p class="section-description">Items can be reordered by dragging the handle on the left, or using the control buttons.</p>
      <div class="demo-instructions">
        <ul>
          <li>Click an item to select it</li>
          <li>Use the arrow buttons to move selected items</li>
          <li>Drag items using the grip handle</li>
          <li>Hold Ctrl/Cmd and click to select multiple items (when multiple prop is enabled)</li>
        </ul>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Simple string list -->
  <OrderList v-model="tasks" header="Tasks" />

  <!-- Object list with custom template -->
  <OrderList
    v-model="cities"
    header="Cities"
    data-key="name"
    item-key="code"
    @reorder="onReorder"
  >
    <template #item="{ item }">
      <div class="city-item">
        <span>{{ item.name }}</span>
        <span>{{ item.code }}</span>
      </div>
    </template>
  </OrderList>
</template>

<script setup>
import { ref } from "vue"
import OrderList from "@components/OrderList/OrderList.vue"

const tasks = ref(["Task 1", "Task 2", "Task 3"])

const cities = ref([
  { name: "San Francisco", code: "SF" },
  { name: "London", code: "LDN" },
  { name: "Paris", code: "PRS" }
])

const onReorder = ({ value }) => {
  console.log("New order:", value)
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
          <tr v-for="prop in orderListProps" :key="prop.name">
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
          <tr v-for="event in orderListEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in orderListSlots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
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
  max-width: 500px;
}

.demo-instructions {
  background: var(--doc-surface-muted);
  padding: var(--doc-space-m);
  border-radius: var(--doc-radius-m);

  ul {
    margin: 0;
    padding-left: var(--doc-space-l);
  }

  li {
    margin-bottom: var(--doc-space-xs);
    color: var(--doc-text-default);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__name {
    font-weight: 500;
  }

  &__code {
    font-size: 12px;
    color: var(--doc-text-muted);
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-xs);
    border-radius: var(--doc-radius-xs);
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.slots-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
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
