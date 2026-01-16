<script setup lang="ts">
import OrganizationChart from '@components/OrganizationChart/OrganizationChart.vue'
import '@components/OrganizationChart/OrganizationChart.scss'

const orgChartProps = [
  { name: 'value', type: 'Object', default: 'null', description: 'Hierarchical data object representing the organization structure' },
  { name: 'selectionMode', type: 'String', default: 'null', description: 'Selection mode: "single", "multiple", or null (no selection)' },
  { name: 'selectedKeys', type: 'Object', default: '{}', description: 'Object of selected node keys' },
  { name: 'expandedKeys', type: 'Object', default: '{}', description: 'Object of expanded node keys' },
  { name: 'collapsible', type: 'Boolean', default: 'false', description: 'Whether all nodes are collapsible' }
]

const orgChartEvents = [
  { name: 'update:selectedKeys', description: 'Emitted when selection changes' },
  { name: 'update:expandedKeys', description: 'Emitted when expanded state changes' },
  { name: 'node-select', description: 'Emitted when a node is selected, provides { node }' },
  { name: 'node-unselect', description: 'Emitted when a node is unselected, provides { node }' },
  { name: 'node-expand', description: 'Emitted when a node is expanded, provides { node }' },
  { name: 'node-collapse', description: 'Emitted when a node is collapsed, provides { node }' }
]

const orgChartSlots = [
  { name: 'default', description: 'Custom node template, receives { node } as slot props' }
]

const orgData = {
  key: 'ceo',
  label: 'Sarah Johnson',
  type: 'CEO',
  children: [
    {
      key: 'cto',
      label: 'Michael Chen',
      type: 'CTO',
      children: [
        { key: 'dev-lead', label: 'Emily Davis', type: 'Dev Lead' },
        { key: 'qa-lead', label: 'James Wilson', type: 'QA Lead' }
      ]
    },
    {
      key: 'cfo',
      label: 'David Brown',
      type: 'CFO',
      children: [
        { key: 'accounting', label: 'Lisa Martinez', type: 'Accounting' },
        { key: 'finance', label: 'Robert Taylor', type: 'Finance' }
      ]
    },
    {
      key: 'cmo',
      label: 'Amanda White',
      type: 'CMO',
      children: [
        { key: 'marketing', label: 'Kevin Lee', type: 'Marketing' }
      ]
    }
  ]
}

const simpleOrgData = {
  key: 'root',
  label: 'Root Node',
  type: 'Parent',
  children: [
    { key: 'child1', label: 'Child 1', type: 'Child' },
    { key: 'child2', label: 'Child 2', type: 'Child' },
    { key: 'child3', label: 'Child 3', type: 'Child' }
  ]
}

const selectedKeys = ref({})
const expandedKeys = ref({})
</script>

<template>
  <div class="page">
    <PageHeader
      title="OrganizationChart"
      description="OrganizationChart visualizes hierarchical organization data with collapsible nodes."
    />

    <section class="demo-section">
      <h2>Basic Organization Chart</h2>
      <p class="section-description">Display a simple hierarchical structure.</p>
      <div class="demo-row">
        <OrganizationChart :value="simpleOrgData" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Company Hierarchy</h2>
      <p class="section-description">A complete organization chart with multiple levels.</p>
      <div class="demo-row demo-row--wide">
        <OrganizationChart :value="orgData" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Selection</h2>
      <p class="section-description">Enable single selection mode to select nodes.</p>
      <div class="demo-row demo-row--wide">
        <OrganizationChart
          :value="orgData"
          selection-mode="single"
          v-model:selected-keys="selectedKeys"
        />
      </div>
      <div v-if="Object.keys(selectedKeys).length > 0" class="selection-info">
        Selected: {{ Object.keys(selectedKeys).join(', ') }}
      </div>
    </section>

    <section class="demo-section">
      <h2>Collapsible Nodes</h2>
      <p class="section-description">Click the toggle button below nodes to expand/collapse children.</p>
      <div class="demo-row demo-row--wide">
        <OrganizationChart
          :value="orgData"
          collapsible
          v-model:expanded-keys="expandedKeys"
        />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic organization chart -->
  <OrganizationChart :value="orgData" />

  <!-- With selection -->
  <OrganizationChart
    :value="orgData"
    selection-mode="single"
    v-model:selected-keys="selectedKeys"
    @node-select="onNodeSelect"
  />

  <!-- Custom node template -->
  <OrganizationChart :value="orgData">
    <template #default="{ node }">
      <div class="custom-node">
        <img :src="node.avatar" />
        <span>{{ node.label }}</span>
        <small>{{ node.type }}</small>
      </div>
    </template>
  </OrganizationChart>
</template>

<script setup>
import { ref } from "vue"
import OrganizationChart from "@components/OrganizationChart/OrganizationChart.vue"

const orgData = {
  key: "ceo",
  label: "John Doe",
  type: "CEO",
  children: [
    {
      key: "cto",
      label: "Jane Smith",
      type: "CTO",
      children: [
        { key: "dev", label: "Dev Team", type: "Development" }
      ]
    },
    {
      key: "cfo",
      label: "Bob Johnson",
      type: "CFO"
    }
  ]
}

const selectedKeys = ref({})
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
          <tr v-for="prop in orgChartProps" :key="prop.name">
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
          <tr v-for="event in orgChartEvents" :key="event.name">
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
          <tr v-for="slot in orgChartSlots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="data-structure">
      <h2>Node Data Structure</h2>
      <CodeSnippet
        language="typescript"
        code='interface OrgNode {
  key?: string;          // Unique identifier (defaults to label)
  label: string;         // Display name
  type?: string;         // Role/position (shown as subtitle)
  children?: OrgNode[];  // Child nodes
}'
      />
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
  overflow-x: auto;

  &--wide {
    max-width: 100%;
  }
}

.selection-info {
  margin-top: var(--doc-space-m);
  padding: var(--doc-space-s) var(--doc-space-m);
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  font-size: 14px;
  color: var(--doc-text-default);
}

.usage,
.data-structure {
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
