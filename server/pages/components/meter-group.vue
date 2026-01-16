<script setup lang="ts">
import MeterGroup from '@components/MeterGroup/MeterGroup.vue'
import '@components/MeterGroup/MeterGroup.scss'

const props = [
  { name: 'values', type: 'Array', default: 'required', description: 'Array of meter values with { value, color, label }' },
  { name: 'max', type: 'Number', default: '100', description: 'Maximum value for the meter group' },
  { name: 'orientation', type: 'String', default: '"horizontal"', description: 'Orientation: horizontal or vertical' },
  { name: 'showLabels', type: 'Boolean', default: 'true', description: 'Whether to show labels above the meter' }
]

const basicValues = [
  { value: 25, color: 'primary', label: 'Used' },
  { value: 50, color: 'success', label: 'Available' }
]

const multipleValues = [
  { value: 15, color: 'danger', label: 'Critical' },
  { value: 25, color: 'warning', label: 'Warning' },
  { value: 35, color: 'success', label: 'Healthy' },
  { value: 15, color: 'primary', label: 'Reserved' }
]

const storageValues = [
  { value: 40, color: 'primary', label: 'Documents' },
  { value: 25, color: 'success', label: 'Images' },
  { value: 15, color: 'warning', label: 'Videos' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="MeterGroup"
      description="MeterGroup displays multiple progress meters in a single track, useful for showing multiple values that sum to a total."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A basic meter group with two values.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <MeterGroup :values="basicValues" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Values</h2>
      <p class="section-description">A meter group displaying multiple segments.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <MeterGroup :values="multipleValues" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Labels</h2>
      <p class="section-description">A meter group without the label header.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <MeterGroup :values="storageValues" :showLabels="false" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Vertical Orientation</h2>
      <p class="section-description">A meter group displayed vertically.</p>
      <div class="demo-row">
        <div class="demo-item">
          <MeterGroup :values="multipleValues" orientation="vertical" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic meter group -->
  <MeterGroup :values="values" />

  <!-- Without labels -->
  <MeterGroup :values="values" :showLabels="false" />

  <!-- Vertical orientation -->
  <MeterGroup :values="values" orientation="vertical" />

  <!-- Custom max value -->
  <MeterGroup :values="values" :max="200" />
</template>

<script setup>
import MeterGroup from "@components/MeterGroup/MeterGroup.vue"
import "@components/MeterGroup/MeterGroup.scss"

const values = [
  { value: 25, color: "primary", label: "Used" },
  { value: 50, color: "success", label: "Available" },
  { value: 15, color: "warning", label: "Reserved" }
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
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the meter group tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="meter-group"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Basic</span>
              <div class="preview-column">
                <MeterGroup :values="basicValues" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Multiple Values</span>
              <div class="preview-column">
                <MeterGroup :values="multipleValues" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Without Labels</span>
              <div class="preview-column">
                <MeterGroup :values="storageValues" :showLabels="false" />
              </div>
            </div>
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

.demo-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--doc-space-s);
}

.demo-item--wide {
  width: 100%;
  max-width: 500px;
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
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
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-l);
}

.preview-group {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.preview-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--doc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
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
