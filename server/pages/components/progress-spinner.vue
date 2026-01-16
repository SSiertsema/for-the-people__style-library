<script setup lang="ts">
import ProgressSpinner from '@components/ProgressSpinner/ProgressSpinner.vue'
import '@components/ProgressSpinner/ProgressSpinner.scss'

const props = [
  { name: 'strokeWidth', type: 'Number | String', default: '4', description: 'Width of the spinner stroke' },
  { name: 'fill', type: 'String', default: '"transparent"', description: 'Fill color for the spinner circle' },
  { name: 'animationDuration', type: 'String', default: '"2s"', description: 'Duration of the animation cycle' }
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
      title="ProgressSpinner"
      description="ProgressSpinner component for displaying an animated loading indicator."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple animated spinner for loading states.</p>
      <div class="demo-row">
        <div class="demo-item">
          <ProgressSpinner />
          <span class="demo-label">Default</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Stroke Width</h2>
      <p class="section-description">Adjust the thickness of the spinner stroke.</p>
      <div class="demo-row">
        <div class="demo-item">
          <ProgressSpinner :stroke-width="2" />
          <span class="demo-label">Thin (2px)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner :stroke-width="4" />
          <span class="demo-label">Default (4px)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner :stroke-width="6" />
          <span class="demo-label">Thick (6px)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Animation Speed</h2>
      <p class="section-description">Control the speed of the animation.</p>
      <div class="demo-row">
        <div class="demo-item">
          <ProgressSpinner animation-duration="1s" />
          <span class="demo-label">Fast (1s)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner animation-duration="2s" />
          <span class="demo-label">Default (2s)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner animation-duration="3s" />
          <span class="demo-label">Slow (3s)</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Size</h2>
      <p class="section-description">Override the spinner size using CSS custom properties.</p>
      <div class="demo-row">
        <div class="demo-item">
          <ProgressSpinner style="--progress-spinner-size: 24px" />
          <span class="demo-label">Small (24px)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner style="--progress-spinner-size: 48px" />
          <span class="demo-label">Default (48px)</span>
        </div>
        <div class="demo-item">
          <ProgressSpinner style="--progress-spinner-size: 72px" />
          <span class="demo-label">Large (72px)</span>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic spinner -->
  <ProgressSpinner />

  <!-- Custom stroke width -->
  <ProgressSpinner :stroke-width="6" />

  <!-- Faster animation -->
  <ProgressSpinner animation-duration="1s" />

  <!-- Custom size via CSS -->
  <ProgressSpinner style="--progress-spinner-size: 24px" />
</template>

<script setup>
import ProgressSpinner from "@components/ProgressSpinner/ProgressSpinner.vue"
import "@components/ProgressSpinner/ProgressSpinner.scss"
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
      <p class="section-description">Customize the spinner tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="progress-spinner"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Default</span>
              <ProgressSpinner />
            </div>

            <div class="preview-group">
              <span class="preview-label">Various Stroke Widths</span>
              <div class="preview-row">
                <ProgressSpinner :stroke-width="2" />
                <ProgressSpinner :stroke-width="4" />
                <ProgressSpinner :stroke-width="6" />
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

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--doc-space-s);
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
  align-items: center;
  gap: var(--doc-space-m);
}

.preview-row {
  display: flex;
  gap: var(--doc-space-l);
  align-items: center;
}

.preview-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--doc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
