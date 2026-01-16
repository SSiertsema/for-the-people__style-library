<script setup lang="ts">
import Row from '@components/Row/Row.vue'
import '@components/Row/Row.scss'

const selectedRow = ref(1)

const componentProps = [
  { name: 'isSelected', type: 'Boolean', default: 'false', description: 'Highlights the row as selected' },
  { name: 'isStriped', type: 'Boolean', default: 'false', description: 'Applies striped background style' },
  { name: 'isHoverable', type: 'Boolean', default: 'true', description: 'Enables hover effect on the row' }
]

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Row"
      description="Row component for DataTable and other tabular layouts."
    />

    <ComponentDemo
      name="Row"
      description="Defines a row template with styling options for tables."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic Rows</h4>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <Row v-for="item in sampleData" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
              </Row>
            </tbody>
          </table>
        </div>
      </div>

      <div class="demo-section">
        <h4>Selectable Rows</h4>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <Row
                v-for="item in sampleData"
                :key="item.id"
                :is-selected="selectedRow === item.id"
                @click="selectedRow = item.id"
                style="cursor: pointer"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
              </Row>
            </tbody>
          </table>
        </div>
        <p class="demo-hint">Selected row ID: {{ selectedRow }}</p>
      </div>

      <div class="demo-section">
        <h4>Striped Rows</h4>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <Row
                v-for="(item, index) in sampleData"
                :key="item.id"
                :is-striped="index % 2 === 1"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
              </Row>
            </tbody>
          </table>
        </div>
      </div>

      <div class="demo-section">
        <h4>Non-Hoverable Rows</h4>
        <div class="demo-table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <Row
                v-for="item in sampleData"
                :key="item.id"
                :is-hoverable="false"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
              </Row>
            </tbody>
          </table>
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

.demo-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
}

.demo-table {
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background: var(--doc-surface-card);
    border-bottom: 1px solid var(--doc-border);
  }

  th, td {
    text-align: left;
    padding: 12px 16px;
  }

  th {
    font-weight: 600;
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-hint {
  margin-top: var(--doc-space-xs);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
