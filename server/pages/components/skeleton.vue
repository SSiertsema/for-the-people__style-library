<script setup lang="ts">
import Skeleton from '@components/Skeleton/Skeleton.vue'
import '@components/Skeleton/Skeleton.scss'

const props = [
  { name: 'shape', type: 'String', default: '"rectangle"', description: 'Shape of the skeleton: rectangle or circle' },
  { name: 'width', type: 'String', default: '-', description: 'Width of the skeleton (CSS value)' },
  { name: 'height', type: 'String', default: '-', description: 'Height of the skeleton (CSS value)' },
  { name: 'borderRadius', type: 'String', default: '-', description: 'Custom border radius (CSS value)' },
  { name: 'animation', type: 'String', default: '"wave"', description: 'Animation type: wave or none' }
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
      title="Skeleton"
      description="Skeleton component for displaying loading placeholders that mimic content structure."
    />

    <section class="demo-section">
      <h2>Shapes</h2>
      <p class="section-description">The skeleton is available in rectangle and circle shapes.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Skeleton width="200px" height="1rem" />
          <span class="demo-label">Rectangle</span>
        </div>
        <div class="demo-item">
          <Skeleton shape="circle" width="64px" height="64px" />
          <span class="demo-label">Circle</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Sizes</h2>
      <p class="section-description">Skeletons can be sized to match the content they are replacing.</p>
      <div class="demo-column">
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="75%" height="0.75rem" />
        <Skeleton width="50%" height="0.75rem" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Animation</h2>
      <p class="section-description">The wave animation can be disabled for static placeholders.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Skeleton width="150px" height="1rem" animation="wave" />
          <span class="demo-label">Wave (default)</span>
        </div>
        <div class="demo-item">
          <Skeleton width="150px" height="1rem" animation="none" />
          <span class="demo-label">None</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Card Placeholder Example</h2>
      <p class="section-description">Combine multiple skeletons to create content placeholders.</p>
      <div class="card-placeholder">
        <div class="card-placeholder__header">
          <Skeleton shape="circle" width="48px" height="48px" />
          <div class="card-placeholder__header-text">
            <Skeleton width="120px" height="0.875rem" />
            <Skeleton width="80px" height="0.75rem" />
          </div>
        </div>
        <div class="card-placeholder__content">
          <Skeleton width="100%" height="0.75rem" />
          <Skeleton width="100%" height="0.75rem" />
          <Skeleton width="60%" height="0.75rem" />
        </div>
        <Skeleton width="100%" height="200px" border-radius="8px" />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic rectangle -->
  <Skeleton width="200px" height="1rem" />

  <!-- Circle avatar placeholder -->
  <Skeleton shape="circle" width="64px" height="64px" />

  <!-- Without animation -->
  <Skeleton width="100%" height="1rem" animation="none" />

  <!-- Custom border radius -->
  <Skeleton width="100%" height="200px" border-radius="16px" />
</template>

<script setup>
import Skeleton from "@components/Skeleton/Skeleton.vue"
import "@components/Skeleton/Skeleton.scss"
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
      <p class="section-description">Adjust the skeleton tokens and see the result live in the preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="skeleton"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Shapes</span>
              <div class="preview-row">
                <Skeleton width="120px" height="1rem" />
                <Skeleton shape="circle" width="48px" height="48px" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Sizes</span>
              <div class="preview-column">
                <Skeleton width="100%" height="0.75rem" />
                <Skeleton width="80%" height="0.75rem" />
                <Skeleton width="60%" height="0.75rem" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Card Placeholder</span>
              <div class="preview-card">
                <div class="preview-card-header">
                  <Skeleton shape="circle" width="40px" height="40px" />
                  <div class="preview-card-header-text">
                    <Skeleton width="100px" height="0.75rem" />
                    <Skeleton width="70px" height="0.625rem" />
                  </div>
                </div>
                <Skeleton width="100%" height="100px" border-radius="6px" />
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
  gap: var(--doc-space-s);
  max-width: 400px;
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

.card-placeholder {
  max-width: 360px;
  padding: var(--doc-space-m);
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.card-placeholder__header {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
}

.card-placeholder__header-text {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.card-placeholder__content {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
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

.preview-row {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
}

.preview-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.preview-card {
  padding: var(--doc-space-m);
  background: var(--doc-surface-canvas);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.preview-card-header {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);
}

.preview-card-header-text {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-2xs);
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
