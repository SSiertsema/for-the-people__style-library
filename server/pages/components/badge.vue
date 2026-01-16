<script setup lang="ts">
import Badge from '@components/Badge/Badge.vue'
import '@components/Badge/Badge.scss'

const componentProps = [
  { name: 'value', type: 'String | Number', default: 'null', description: 'The value to display inside the badge' },
  { name: 'size', type: 'String', default: '"md"', description: 'Badge size: sm, md, lg' },
  { name: 'severity', type: 'String', default: '"primary"', description: 'Severity style: primary, success, warning, danger, info' }
]

const slots = [
  { name: 'default', description: 'Custom content instead of value prop' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Badge"
      description="Badge component for displaying status indicators, counts, and notifications."
    />

    <ComponentDemo
      name="Badge"
      description="A small badge used to highlight status or count."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Badge value="2" />
          <Badge value="10" />
          <Badge value="99+" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Severities</h4>
        <div class="demo-row">
          <Badge value="Primary" severity="primary" />
          <Badge value="Success" severity="success" />
          <Badge value="Warning" severity="warning" />
          <Badge value="Danger" severity="danger" />
          <Badge value="Info" severity="info" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <Badge value="2" size="sm" />
          <Badge value="2" size="md" />
          <Badge value="2" size="lg" />
        </div>
        <div class="demo-row" style="margin-top: var(--doc-space-s);">
          <Badge value="Small" size="sm" />
          <Badge value="Medium" size="md" />
          <Badge value="Large" size="lg" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Severity with Sizes</h4>
        <div class="demo-row">
          <Badge value="5" severity="success" size="sm" />
          <Badge value="5" severity="success" size="md" />
          <Badge value="5" severity="success" size="lg" />
        </div>
        <div class="demo-row" style="margin-top: var(--doc-space-s);">
          <Badge value="New" severity="info" size="sm" />
          <Badge value="New" severity="info" size="md" />
          <Badge value="New" severity="info" size="lg" />
        </div>
      </div>

      <div class="demo-section">
        <h4>All Severities (Large)</h4>
        <div class="demo-row">
          <Badge value="99" severity="primary" size="lg" />
          <Badge value="99" severity="success" size="lg" />
          <Badge value="99" severity="warning" size="lg" />
          <Badge value="99" severity="danger" size="lg" />
          <Badge value="99" severity="info" size="lg" />
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
