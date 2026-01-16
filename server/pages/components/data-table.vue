<script setup lang="ts">
import DataTable from '@components/DataTable/DataTable.vue'
import '@components/DataTable/DataTable.scss'

const dataTableProps = [
  { name: 'value', type: 'Array', default: '[]', description: 'Array of data objects to display in the table' },
  { name: 'columns', type: 'Array', default: '[]', description: 'Array of column definitions with field, header, sortable, and width properties' },
  { name: 'striped', type: 'Boolean', default: 'false', description: 'Whether to show striped rows' },
  { name: 'hoverable', type: 'Boolean', default: 'true', description: 'Whether to show hover effect on rows' },
  { name: 'paginator', type: 'Boolean', default: 'false', description: 'Enable pagination' },
  { name: 'rows', type: 'Number', default: '10', description: 'Number of rows per page when paginator is enabled' },
  { name: 'sortField', type: 'String', default: 'null', description: 'Default sort field' },
  { name: 'sortOrder', type: 'Number', default: '1', description: 'Default sort order: 1 for ascending, -1 for descending' }
]

const dataTableEvents = [
  { name: 'sort', description: 'Emitted when sorting changes, provides { sortField, sortOrder }' },
  { name: 'page', description: 'Emitted when page changes, provides { page }' }
]

const dataTableSlots = [
  { name: 'header', description: 'Custom header content above the table' },
  { name: 'footer', description: 'Custom footer content below the table' },
  { name: 'empty', description: 'Content to display when there are no records' },
  { name: 'column-{field}', description: 'Custom cell content for a specific column (e.g., column-name)' }
]

const basicColumns = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'role', header: 'Role' }
]

const sortableColumns = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
  { field: 'role', header: 'Role', sortable: true },
  { field: 'status', header: 'Status' }
]

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Manager', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'Developer', status: 'Active' },
  { name: 'Eva Green', email: 'eva@example.com', role: 'Designer', status: 'Active' },
  { name: 'Frank Miller', email: 'frank@example.com', role: 'Developer', status: 'Inactive' },
  { name: 'Grace Lee', email: 'grace@example.com', role: 'Manager', status: 'Active' },
  { name: 'Henry Davis', email: 'henry@example.com', role: 'Developer', status: 'Active' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="DataTable"
      description="DataTable displays data in tabular format with features for sorting and pagination."
    />

    <section class="demo-section">
      <h2>Basic Table</h2>
      <p class="section-description">A simple table displaying data with columns.</p>
      <div class="demo-row">
        <DataTable :value="sampleData.slice(0, 4)" :columns="basicColumns" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Striped Rows</h2>
      <p class="section-description">Enable striped prop for alternating row backgrounds.</p>
      <div class="demo-row">
        <DataTable :value="sampleData.slice(0, 4)" :columns="basicColumns" striped />
      </div>
    </section>

    <section class="demo-section">
      <h2>Sortable Columns</h2>
      <p class="section-description">Add sortable: true to column definitions to enable sorting.</p>
      <div class="demo-row">
        <DataTable :value="sampleData" :columns="sortableColumns" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Pagination</h2>
      <p class="section-description">Enable pagination for large datasets.</p>
      <div class="demo-row">
        <DataTable :value="sampleData" :columns="sortableColumns" paginator :rows="3" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Cell Template</h2>
      <p class="section-description">Use named slots to customize cell content.</p>
      <div class="demo-row">
        <DataTable :value="sampleData.slice(0, 4)" :columns="sortableColumns">
          <template #column-status="{ data }">
            <span
              class="status-badge"
              :class="{ 'status-badge--active': data.status === 'Active' }"
            >
              {{ data.status }}
            </span>
          </template>
        </DataTable>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic table -->
  <DataTable :value="data" :columns="columns" />

  <!-- With sorting and pagination -->
  <DataTable
    :value="data"
    :columns="sortableColumns"
    paginator
    :rows="10"
    @sort="onSort"
    @page="onPage"
  />

  <!-- Custom cell template -->
  <DataTable :value="data" :columns="columns">
    <template #column-status="{ data }">
      <span :class="statusClass(data.status)">{{ data.status }}</span>
    </template>
  </DataTable>
</template>

<script setup>
import DataTable from "@components/DataTable/DataTable.vue"

const columns = [
  { field: "name", header: "Name", sortable: true },
  { field: "email", header: "Email" },
  { field: "status", header: "Status" }
]

const data = [
  { name: "Alice", email: "alice@example.com", status: "Active" },
  { name: "Bob", email: "bob@example.com", status: "Inactive" }
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
          <tr v-for="prop in dataTableProps" :key="prop.name">
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
          <tr v-for="event in dataTableEvents" :key="event.name">
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
          <tr v-for="slot in dataTableSlots" :key="slot.name">
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

.status-badge {
  display: inline-block;
  padding: var(--doc-space-3xs) var(--doc-space-s);
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background-color: var(--doc-surface-muted);
  color: var(--doc-text-muted);

  &--active {
    background-color: #dcfce7;
    color: #166534;
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
