<script setup lang="ts">
import VirtualScroller from '@components/VirtualScroller/VirtualScroller.vue'
import '@components/VirtualScroller/VirtualScroller.scss'

// Generate a large list of items
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}`,
}))

const virtualScrollerProps = [
  { name: 'items', type: 'Array', default: '[]', description: 'Array of items to render' },
  { name: 'itemSize', type: 'Number', default: '40', description: 'Height (or width for horizontal) of each item in pixels' },
  { name: 'scrollHeight', type: 'String', default: '"400px"', description: 'Height of the scrollable viewport' },
  { name: 'orientation', type: 'String', default: '"vertical"', description: 'Scroll orientation: vertical or horizontal' },
  { name: 'numToleratedItems', type: 'Number', default: '5', description: 'Number of items to render above/below the visible area' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading indicator' },
  { name: 'striped', type: 'Boolean', default: 'false', description: 'Show striped rows' },
  { name: 'showBorder', type: 'Boolean', default: 'true', description: 'Show border around the scroller' },
  { name: 'dataKey', type: 'String', default: 'null', description: 'Property name for unique item identifier' },
]

const virtualScrollerEvents = [
  { name: 'scroll', description: 'Emitted on scroll with scroll position' },
  { name: 'scroll-index-change', description: 'Emitted when visible index range changes' },
]

const virtualScrollerMethods = [
  { name: 'scrollToIndex(index, behavior)', description: 'Scroll to a specific item index' },
  { name: 'scrollIntoView(index, behavior, align)', description: 'Scroll item into view with alignment options' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="VirtualScroller"
      description="VirtualScroller component for efficiently rendering large lists."
    />

    <ComponentDemo
      name="VirtualScroller"
      description="A virtual scrolling container that only renders visible items for optimal performance."
      :props="virtualScrollerProps"
    >
      <div class="demo-section">
        <h4>Basic (10,000 items)</h4>
        <div class="demo-row">
          <VirtualScroller
            :items="items"
            :item-size="48"
            scroll-height="300px"
            data-key="id"
          >
            <template #default="{ item, index }">
              <div class="demo-item">
                <strong>{{ item.name }}</strong>
                <span>{{ item.description }}</span>
              </div>
            </template>
          </VirtualScroller>
        </div>
      </div>

      <div class="demo-section">
        <h4>Striped</h4>
        <div class="demo-row">
          <VirtualScroller
            :items="items"
            :item-size="48"
            scroll-height="300px"
            data-key="id"
            striped
          >
            <template #default="{ item }">
              <div class="demo-item">
                <strong>{{ item.name }}</strong>
                <span>{{ item.description }}</span>
              </div>
            </template>
          </VirtualScroller>
        </div>
      </div>

      <div class="demo-section">
        <h4>Horizontal</h4>
        <div class="demo-row">
          <VirtualScroller
            :items="items.slice(0, 100)"
            :item-size="150"
            scroll-height="600px"
            orientation="horizontal"
            data-key="id"
            style="height: 100px;"
          >
            <template #default="{ item }">
              <div class="demo-item-horizontal">
                <strong>{{ item.name }}</strong>
              </div>
            </template>
          </VirtualScroller>
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
          <tr v-for="event in virtualScrollerEvents" :key="event.name">
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
          <tr v-for="method in virtualScrollerMethods" :key="method.name">
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

.demo-row {
  max-width: 600px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  strong {
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: var(--doc-text-muted);
  }
}

.demo-item-horizontal {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
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
