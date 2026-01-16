<script setup lang="ts">
import Chart from '@components/Chart/Chart.vue'
import '@components/Chart/Chart.scss'

const componentProps = [
  { name: 'title', type: 'String', default: 'null', description: 'Chart title displayed above the chart' },
  { name: 'type', type: 'String', default: '"bar"', description: 'Chart type identifier (bar, line, pie, doughnut, radar, polar, scatter, bubble)' },
  { name: 'isLoading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'data', type: 'Object', default: 'null', description: 'Chart data object (used to determine if data exists)' },
  { name: 'height', type: 'Number | String', default: 'null', description: 'Chart height' },
  { name: 'width', type: 'Number | String', default: 'null', description: 'Chart width' }
]

const sampleData = {
  datasets: [
    { label: 'Sales', data: [65, 59, 80, 81, 56, 55] }
  ]
}

const emptyData = {
  datasets: []
}

const legendItems = [
  { label: 'Sales', color: '#3B82F6' },
  { label: 'Revenue', color: '#10B981' },
  { label: 'Profit', color: '#F59E0B' }
]

const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Chart"
      description="Chart wrapper component for displaying data visualizations. Works with external chart libraries like Chart.js or ECharts."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A chart container with title. Add your chart library canvas inside.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Chart title="Monthly Sales" :data="sampleData">
            <div class="demo-chart-placeholder">
              Chart library canvas goes here
            </div>
          </Chart>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Legend</h2>
      <p class="section-description">Chart with custom legend slot.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Chart title="Revenue by Category" :data="sampleData">
            <div class="demo-chart-placeholder">
              Chart canvas
            </div>
            <template #legend>
              <div
                v-for="item in legendItems"
                :key="item.label"
                class="chart__legend-item"
              >
                <span class="chart__legend-marker" :style="{ background: item.color }"></span>
                {{ item.label }}
              </div>
            </template>
          </Chart>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Loading State</h2>
      <p class="section-description">Shows a spinner while data is being fetched.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Chart title="Loading Data..." :data="sampleData" isLoading>
            <div class="demo-chart-placeholder">
              Chart canvas
            </div>
          </Chart>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Empty State</h2>
      <p class="section-description">Displays when no data is available.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Chart title="No Data Yet" :data="emptyData">
            <template #empty>No sales data available for this period</template>
          </Chart>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic chart wrapper -->
  <Chart title="Sales Overview" :data="chartData">
    <!-- Your chart library component -->
    <canvas ref="chartCanvas"></canvas>
  </Chart>

  <!-- With loading state -->
  <Chart
    title="Loading..."
    :data="chartData"
    :isLoading="loading"
  >
    <canvas ref="chartCanvas"></canvas>
  </Chart>

  <!-- With custom legend -->
  <Chart title="Revenue" :data="chartData">
    <canvas ref="chartCanvas"></canvas>
    <template #legend>
      <div v-for="item in legend" class="chart__legend-item">
        <span class="chart__legend-marker" :style="{ background: item.color }"></span>
        {{ item.label }}
      </div>
    </template>
  </Chart>
</template>

<script setup>
import Chart from "@components/Chart/Chart.vue"
import "@components/Chart/Chart.scss"

const chartData = ref({
  datasets: [{ label: "Sales", data: [65, 59, 80, 81] }]
})
const loading = ref(false)
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
          <tr v-for="prop in componentProps" :key="prop.name">
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
          <tr>
            <td><code>default</code></td>
            <td>Chart canvas or content area</td>
          </tr>
          <tr>
            <td><code>legend</code></td>
            <td>Custom legend content</td>
          </tr>
          <tr>
            <td><code>empty</code></td>
            <td>Custom empty state message</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the chart container appearance.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="chart"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <Chart title="Sample Chart" :data="sampleData">
              <div class="demo-chart-placeholder">
                Chart canvas
              </div>
              <template #legend>
                <div
                  v-for="item in legendItems"
                  :key="item.label"
                  class="chart__legend-item"
                >
                  <span class="chart__legend-marker" :style="{ background: item.color }"></span>
                  {{ item.label }}
                </div>
              </template>
            </Chart>
          </div>
        </div>
      </div>
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
  display: flex;
  align-items: flex-start;
  gap: var(--doc-space-xl);
  flex-wrap: wrap;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.demo-chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background: var(--doc-surface-muted);
  border: 2px dashed var(--doc-border);
  border-radius: var(--doc-radius-m);
  color: var(--doc-text-muted);
  font-size: 14px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.slots-section,
.tokens-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
  }
}

.token-editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--doc-space-l);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.token-editor-panel {
  min-width: 0;
}

.live-preview-panel {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.preview-header {
  padding: var(--doc-space-m);
  border-bottom: 1px solid var(--doc-border);
  background: var(--doc-surface-muted);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.preview-content {
  padding: var(--doc-space-l);
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
