<script setup lang="ts">
import Tag from '@components/Tag/Tag.vue'
import '@components/Tag/Tag.scss'

const componentProps = [
  { name: 'value', type: 'String', default: 'null', description: 'The value to display inside the tag' },
  { name: 'severity', type: 'String', default: '"primary"', description: 'Severity style: primary, success, warning, danger, info' },
  { name: 'icon', type: 'String', default: 'null', description: 'Icon class to display before the value' },
  { name: 'rounded', type: 'Boolean', default: 'false', description: 'Whether to use pill/rounded styling' }
]

const slots = [
  { name: 'default', description: 'Custom content instead of value prop' },
  { name: 'icon', description: 'Custom icon content instead of icon prop' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Tag"
      description="Tag component for categorizing and labeling content with semantic colors."
    />

    <ComponentDemo
      name="Tag"
      description="A small label used to categorize or mark content."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Tag value="Primary" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Severities</h4>
        <div class="demo-row">
          <Tag value="Primary" severity="primary" />
          <Tag value="Success" severity="success" />
          <Tag value="Warning" severity="warning" />
          <Tag value="Danger" severity="danger" />
          <Tag value="Info" severity="info" />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Icon</h4>
        <div class="demo-row">
          <Tag value="New" severity="primary" icon="pi pi-star" />
          <Tag value="Approved" severity="success" icon="pi pi-check" />
          <Tag value="Pending" severity="warning" icon="pi pi-clock" />
          <Tag value="Rejected" severity="danger" icon="pi pi-times" />
          <Tag value="Info" severity="info" icon="pi pi-info-circle" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Rounded (Pill)</h4>
        <div class="demo-row">
          <Tag value="Primary" severity="primary" rounded />
          <Tag value="Success" severity="success" rounded />
          <Tag value="Warning" severity="warning" rounded />
          <Tag value="Danger" severity="danger" rounded />
          <Tag value="Info" severity="info" rounded />
        </div>
      </div>

      <div class="demo-section">
        <h4>Rounded with Icon</h4>
        <div class="demo-row">
          <Tag value="New" severity="primary" icon="pi pi-star" rounded />
          <Tag value="Approved" severity="success" icon="pi pi-check" rounded />
          <Tag value="Pending" severity="warning" icon="pi pi-clock" rounded />
          <Tag value="Rejected" severity="danger" icon="pi pi-times" rounded />
          <Tag value="Info" severity="info" icon="pi pi-info-circle" rounded />
        </div>
      </div>
    </ComponentDemo>

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
  align-items: center;
  gap: var(--doc-space-m);
}

.slots-section {
  margin-top: var(--doc-space-2xl);

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
