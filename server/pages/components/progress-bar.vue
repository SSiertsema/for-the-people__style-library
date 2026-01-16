<script setup lang="ts">
import ProgressBar from '@components/ProgressBar/ProgressBar.vue'
import '@components/ProgressBar/ProgressBar.scss'

const props = [
  { name: 'value', type: 'Number', default: '0', description: 'Progress value between 0 and 100' },
  { name: 'showValue', type: 'Boolean', default: 'true', description: 'Whether to display the percentage label' },
  { name: 'mode', type: 'String', default: '"determinate"', description: 'Mode: determinate or indeterminate' }
]

const slots = [
  { name: 'default', description: 'Custom label content (replaces default percentage display)' }
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
      title="ProgressBar"
      description="ProgressBar component for displaying progress of an operation or task."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A determinate progress bar with a value.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="50" />
          <span class="demo-label">50%</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Various Values</h2>
      <p class="section-description">Progress bars showing different progress states.</p>
      <div class="demo-column">
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="0" />
          <span class="demo-label">0%</span>
        </div>
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="25" />
          <span class="demo-label">25%</span>
        </div>
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="75" />
          <span class="demo-label">75%</span>
        </div>
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="100" />
          <span class="demo-label">100%</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Label</h2>
      <p class="section-description">Progress bar without the percentage label.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <ProgressBar :value="65" :showValue="false" />
          <span class="demo-label">showValue: false</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Indeterminate</h2>
      <p class="section-description">An animated indeterminate progress bar for unknown durations.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <ProgressBar mode="indeterminate" />
          <span class="demo-label">mode: indeterminate</span>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic progress bar -->
  <ProgressBar :value="50" />

  <!-- Without label -->
  <ProgressBar :value="75" :showValue="false" />

  <!-- Indeterminate (loading) -->
  <ProgressBar mode="indeterminate" />

  <!-- Custom label via slot -->
  <ProgressBar :value="40">
    40 of 100 items
  </ProgressBar>
</template>

<script setup>
import ProgressBar from "@components/ProgressBar/ProgressBar.vue"
import "@components/ProgressBar/ProgressBar.scss"
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

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the progress bar tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="progress-bar"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Determinate</span>
              <div class="preview-column">
                <ProgressBar :value="25" />
                <ProgressBar :value="50" />
                <ProgressBar :value="75" />
                <ProgressBar :value="100" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Without Label</span>
              <div class="preview-column">
                <ProgressBar :value="60" :showValue="false" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Indeterminate</span>
              <div class="preview-column">
                <ProgressBar mode="indeterminate" />
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
  align-items: flex-end;
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
  max-width: 400px;
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
