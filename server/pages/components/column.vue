<script setup lang="ts">
import Column from '@components/Column/Column.vue'
import '@components/Column/Column.scss'

const props = [
  { name: 'field', type: 'String', default: 'null', description: 'Property name of the data object' },
  { name: 'header', type: 'String', default: 'null', description: 'Header text of the column' },
  { name: 'footer', type: 'String', default: 'null', description: 'Footer text of the column' },
  { name: 'sortable', type: 'Boolean', default: 'false', description: 'Whether the column is sortable' },
  { name: 'sortField', type: 'String', default: 'null', description: 'Field to use for sorting (defaults to field)' },
  { name: 'filterField', type: 'String', default: 'null', description: 'Field to use for filtering' },
  { name: 'filterable', type: 'Boolean', default: 'false', description: 'Whether the column is filterable' },
  { name: 'width', type: 'String', default: 'null', description: 'Width of the column (e.g., "200px", "20%")' },
  { name: 'minWidth', type: 'String', default: 'null', description: 'Minimum width of the column' },
  { name: 'maxWidth', type: 'String', default: 'null', description: 'Maximum width of the column' },
  { name: 'align', type: 'String', default: '"left"', description: 'Cell content alignment: left, center, right' },
  { name: 'headerAlign', type: 'String', default: 'null', description: 'Header alignment (inherits from align if null)' },
  { name: 'footerAlign', type: 'String', default: 'null', description: 'Footer alignment (inherits from align if null)' },
  { name: 'frozen', type: 'Boolean', default: 'false', description: 'Whether the column is frozen (sticky)' },
  { name: 'hidden', type: 'Boolean', default: 'false', description: 'Whether the column is hidden' },
  { name: 'expander', type: 'Boolean', default: 'false', description: 'Whether this column contains row expander' },
  { name: 'selectionMode', type: 'String', default: 'null', description: 'Selection mode: single, multiple' },
  { name: 'rowspan', type: 'Number', default: '1', description: 'Number of rows the cell spans' },
  { name: 'colspan', type: 'Number', default: '1', description: 'Number of columns the cell spans' }
]

const slots = [
  { name: 'header', description: 'Custom header content' },
  { name: 'body', description: 'Custom body cell content. Receives { data, field, index }' },
  { name: 'footer', description: 'Custom footer content' },
  { name: 'filter', description: 'Custom filter element' },
  { name: 'editor', description: 'Custom cell editor for editable cells' }
]

// Demo data for the example table
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Column"
      description="Column component for defining DataTable columns. Provides configuration for field binding, sorting, filtering, and custom templates."
    />

    <section class="demo-section">
      <h2>Column Configuration</h2>
      <p class="section-description">The Column component is a declarative way to configure DataTable columns. It doesn't render content directly - the parent DataTable uses its props and slots.</p>
      <div class="demo-box">
        <div class="demo-note">
          <strong>Note:</strong> Column is typically used inside a DataTable component. Below is a visual representation of how columns would appear.
        </div>
        <table class="demo-table">
          <thead>
            <tr>
              <th class="column__header">ID</th>
              <th class="column__header column__header--sortable">
                <span class="column__header-content">
                  Name
                  <svg class="column__sort-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </span>
              </th>
              <th class="column__header">Email</th>
              <th class="column__header column--align-center">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in sampleData" :key="row.id">
              <td class="column__body">{{ row.id }}</td>
              <td class="column__body">{{ row.name }}</td>
              <td class="column__body">{{ row.email }}</td>
              <td class="column__body column--align-center">{{ row.role }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="column__footer" colspan="4">3 records</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Used inside DataTable -->
  <DataTable :value="users">
    <Column field="id" header="ID" :sortable="true" width="80px" />
    <Column field="name" header="Name" :sortable="true" />
    <Column field="email" header="Email" />
    <Column field="role" header="Role" align="center">
      <template #body="{ data }">
        <Tag :value="data.role" />
      </template>
    </Column>
  </DataTable>

  <!-- With custom templates -->
  <DataTable :value="products">
    <Column field="name" header="Product">
      <template #body="{ data }">
        <div class="product-cell">
          <img :src="data.image" />
          <span>{{ data.name }}</span>
        </div>
      </template>
    </Column>
    <Column field="price" header="Price" align="right">
      <template #body="{ data }">
        {{ formatCurrency(data.price) }}
      </template>
      <template #footer>
        Total: {{ totalPrice }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import Column from "@components/Column/Column.vue"
import "@components/Column/Column.scss"
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
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
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
          <tr v-for="slot in slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@components/Column/Column.scss';

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

.demo-box {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
}

.demo-note {
  background: var(--doc-surface-muted);
  padding: var(--doc-space-s) var(--doc-space-m);
  border-radius: var(--doc-radius-s);
  margin-bottom: var(--doc-space-l);
  font-size: 14px;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
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
