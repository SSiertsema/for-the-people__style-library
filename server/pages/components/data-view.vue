<script setup lang="ts">
import DataView from '@components/DataView/DataView.vue'
import '@components/DataView/DataView.scss'
import Card from '@components/Card/Card.vue'
import '@components/Card/Card.scss'

const dataViewProps = [
  { name: 'value', type: 'Array', default: '[]', description: 'Array of data objects to display' },
  { name: 'layout', type: 'String', default: '"list"', description: 'Layout mode: "list" or "grid"' },
  { name: 'gridColumns', type: 'Number', default: '3', description: 'Number of columns in grid layout' },
  { name: 'paginator', type: 'Boolean', default: 'false', description: 'Enable pagination' },
  { name: 'rows', type: 'Number', default: '9', description: 'Number of items per page when paginator is enabled' },
  { name: 'showLayoutSwitcher', type: 'Boolean', default: 'true', description: 'Show layout switcher buttons' }
]

const dataViewEvents = [
  { name: 'update:layout', description: 'Emitted when layout changes' },
  { name: 'page', description: 'Emitted when page changes, provides { page }' }
]

const dataViewSlots = [
  { name: 'header', description: 'Custom header content' },
  { name: 'footer', description: 'Custom footer content' },
  { name: 'empty', description: 'Content to display when there are no records' },
  { name: 'item', description: 'Default item template for both layouts' },
  { name: 'list', description: 'Item template for list layout' },
  { name: 'grid', description: 'Item template for grid layout' }
]

const products = [
  { id: 1, name: 'Product Alpha', category: 'Electronics', price: 299, rating: 4.5 },
  { id: 2, name: 'Product Beta', category: 'Clothing', price: 59, rating: 4.2 },
  { id: 3, name: 'Product Gamma', category: 'Electronics', price: 149, rating: 4.8 },
  { id: 4, name: 'Product Delta', category: 'Home', price: 89, rating: 4.0 },
  { id: 5, name: 'Product Epsilon', category: 'Electronics', price: 449, rating: 4.7 },
  { id: 6, name: 'Product Zeta', category: 'Clothing', price: 79, rating: 4.3 }
]

const currentLayout = ref('list')
</script>

<template>
  <div class="page">
    <PageHeader
      title="DataView"
      description="DataView displays data in grid or list layout with layout switching and pagination support."
    />

    <section class="demo-section">
      <h2>Basic DataView</h2>
      <p class="section-description">Display data with list/grid layout switching.</p>
      <div class="demo-row">
        <DataView :value="products" v-model:layout="currentLayout">
          <template #header>
            <span class="header-title">Products ({{ products.length }})</span>
          </template>
          <template #list="{ data }">
            <div class="list-item">
              <div class="list-item__info">
                <div class="list-item__name">{{ data.name }}</div>
                <div class="list-item__category">{{ data.category }}</div>
              </div>
              <div class="list-item__price">${{ data.price }}</div>
            </div>
          </template>
          <template #grid="{ data }">
            <Card>
              <template #title>{{ data.name }}</template>
              <template #subtitle>{{ data.category }}</template>
              <template #content>
                <div class="grid-item__price">${{ data.price }}</div>
                <div class="grid-item__rating">Rating: {{ data.rating }}/5</div>
              </template>
            </Card>
          </template>
        </DataView>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Pagination</h2>
      <p class="section-description">Enable pagination for large datasets.</p>
      <div class="demo-row">
        <DataView :value="products" layout="list" paginator :rows="3" :show-layout-switcher="false">
          <template #item="{ data }">
            <div class="list-item">
              <div class="list-item__info">
                <div class="list-item__name">{{ data.name }}</div>
                <div class="list-item__category">{{ data.category }}</div>
              </div>
              <div class="list-item__price">${{ data.price }}</div>
            </div>
          </template>
        </DataView>
      </div>
    </section>

    <section class="demo-section">
      <h2>Grid Layout Only</h2>
      <p class="section-description">Fixed grid layout without switcher.</p>
      <div class="demo-row">
        <DataView :value="products.slice(0, 3)" layout="grid" :show-layout-switcher="false">
          <template #grid="{ data }">
            <Card>
              <template #title>{{ data.name }}</template>
              <template #content>
                <p class="grid-item__price">${{ data.price }}</p>
              </template>
            </Card>
          </template>
        </DataView>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <DataView :value="products" v-model:layout="layout">
    <template #header>
      <span>Products</span>
    </template>

    <template #list="{ data }">
      <div class="list-item">
        <span>{{ data.name }}</span>
        <span>${{ data.price }}</span>
      </div>
    </template>

    <template #grid="{ data }">
      <Card>
        <template #title>{{ data.name }}</template>
        <template #content>${{ data.price }}</template>
      </Card>
    </template>
  </DataView>
</template>

<script setup>
import { ref } from "vue"
import DataView from "@components/DataView/DataView.vue"

const layout = ref("list")
const products = [
  { name: "Product A", price: 99 },
  { name: "Product B", price: 149 }
]
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
          <tr v-for="prop in dataViewProps" :key="prop.name">
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
          <tr v-for="event in dataViewEvents" :key="event.name">
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
          <tr v-for="slot in dataViewSlots" :key="slot.name">
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
  max-width: 800px;
}

.header-title {
  font-weight: 600;
  color: var(--doc-text-heading);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--doc-space-3xs);
  }

  &__name {
    font-weight: 500;
    color: var(--doc-text-default);
  }

  &__category {
    font-size: 13px;
    color: var(--doc-text-muted);
  }

  &__price {
    font-weight: 600;
    color: var(--doc-text-heading);
  }
}

.grid-item {
  &__price {
    font-size: 18px;
    font-weight: 600;
    color: var(--doc-text-heading);
    margin-bottom: var(--doc-space-xs);
  }

  &__rating {
    font-size: 13px;
    color: var(--doc-text-muted);
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
