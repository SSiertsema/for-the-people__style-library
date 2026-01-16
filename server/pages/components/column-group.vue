<script setup lang="ts">
import ColumnGroup from '@components/ColumnGroup/ColumnGroup.vue'
import Row from '@components/ColumnGroup/Row.vue'
import Column from '@components/Column/Column.vue'
import '@components/ColumnGroup/ColumnGroup.scss'
import '@components/Column/Column.scss'

const props = [
  { name: 'type', type: 'String', default: '"header"', description: 'Type of column group: header or footer' }
]

const rowProps = [
  { name: '-', type: '-', default: '-', description: 'Row component has no props, it just wraps Column components' }
]

// Demo data
const salesData = [
  { region: 'North', q1: 12500, q2: 14200, q3: 15800, q4: 18900 },
  { region: 'South', q1: 9800, q2: 11500, q3: 12400, q4: 14200 },
  { region: 'East', q1: 15600, q2: 16800, q3: 18200, q4: 21500 },
  { region: 'West', q1: 11200, q2: 12900, q3: 14100, q4: 16800 }
]

const totals = {
  q1: salesData.reduce((sum, row) => sum + row.q1, 0),
  q2: salesData.reduce((sum, row) => sum + row.q2, 0),
  q3: salesData.reduce((sum, row) => sum + row.q3, 0),
  q4: salesData.reduce((sum, row) => sum + row.q4, 0)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="ColumnGroup"
      description="Component for grouping columns in DataTable headers and footers. Enables complex multi-row table headers with spanning cells."
    />

    <section class="demo-section">
      <h2>Grouped Header Example</h2>
      <p class="section-description">ColumnGroup allows creating multi-row headers with spanning columns for better data organization.</p>
      <div class="demo-box">
        <div class="demo-note">
          <strong>Note:</strong> ColumnGroup and Row are used inside DataTable. Below shows how the grouped structure renders.
        </div>
        <table class="demo-table">
          <thead class="column-group column-group--header">
            <tr class="column-group__row">
              <th class="column__header" rowspan="2">Region</th>
              <th class="column__header column--align-center" colspan="4">Quarterly Sales</th>
            </tr>
            <tr class="column-group__row">
              <th class="column__header column--align-right">Q1</th>
              <th class="column__header column--align-right">Q2</th>
              <th class="column__header column--align-right">Q3</th>
              <th class="column__header column--align-right">Q4</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in salesData" :key="row.region">
              <td class="column__body">{{ row.region }}</td>
              <td class="column__body column--align-right">${{ row.q1.toLocaleString() }}</td>
              <td class="column__body column--align-right">${{ row.q2.toLocaleString() }}</td>
              <td class="column__body column--align-right">${{ row.q3.toLocaleString() }}</td>
              <td class="column__body column--align-right">${{ row.q4.toLocaleString() }}</td>
            </tr>
          </tbody>
          <tfoot class="column-group column-group--footer">
            <tr class="column-group__row">
              <td class="column__footer">Total</td>
              <td class="column__footer column--align-right">${{ totals.q1.toLocaleString() }}</td>
              <td class="column__footer column--align-right">${{ totals.q2.toLocaleString() }}</td>
              <td class="column__footer column--align-right">${{ totals.q3.toLocaleString() }}</td>
              <td class="column__footer column--align-right">${{ totals.q4.toLocaleString() }}</td>
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
  <DataTable :value="salesData">
    <!-- Grouped header with two rows -->
    <ColumnGroup type="header">
      <Row>
        <Column header="Region" :rowspan="2" />
        <Column header="Quarterly Sales" :colspan="4" align="center" />
      </Row>
      <Row>
        <Column header="Q1" align="right" />
        <Column header="Q2" align="right" />
        <Column header="Q3" align="right" />
        <Column header="Q4" align="right" />
      </Row>
    </ColumnGroup>

    <!-- Data columns -->
    <Column field="region" />
    <Column field="q1" align="right" />
    <Column field="q2" align="right" />
    <Column field="q3" align="right" />
    <Column field="q4" align="right" />

    <!-- Grouped footer -->
    <ColumnGroup type="footer">
      <Row>
        <Column footer="Total" />
        <Column :footer="totalQ1" align="right" />
        <Column :footer="totalQ2" align="right" />
        <Column :footer="totalQ3" align="right" />
        <Column :footer="totalQ4" align="right" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>

<script setup>
import ColumnGroup from "@components/ColumnGroup/ColumnGroup.vue"
import Row from "@components/ColumnGroup/Row.vue"
import Column from "@components/Column/Column.vue"
import "@components/ColumnGroup/ColumnGroup.scss"
import "@components/Column/Column.scss"
</script>'
      />
    </section>

    <section class="props-section">
      <h2>ColumnGroup Props</h2>
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

    <section class="props-section">
      <h2>Row Component</h2>
      <p class="section-description">The Row component is used inside ColumnGroup to define each row of the grouped header or footer. It wraps Column components.</p>
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
          <tr v-for="prop in rowProps" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="structure-section">
      <h2>Component Structure</h2>
      <div class="structure-box">
        <pre><code>DataTable
  ColumnGroup (type="header")
    Row                          -- First header row
      Column (header, rowspan, colspan)
      Column (header, colspan)
    Row                          -- Second header row
      Column (header)
      Column (header)

  Column (field)                 -- Data columns
  Column (field)

  ColumnGroup (type="footer")
    Row                          -- Footer row
      Column (footer)
      Column (footer)</code></pre>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@components/ColumnGroup/ColumnGroup.scss';
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
.structure-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }

  .section-description {
    color: var(--doc-text-muted);
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

.structure-box {
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-m);
  overflow-x: auto;

  pre {
    margin: 0;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
    font-size: 13px;
    line-height: 1.6;
    color: var(--doc-text-default);
  }
}
</style>
