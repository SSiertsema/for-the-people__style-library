<script setup lang="ts">
import Button from '@components/Button/Button.vue'
import '@components/Button/Button.scss'

const props = [
  { name: 'label', type: 'String', default: '-', description: 'Button text label' },
  { name: 'icon', type: 'String', default: '-', description: 'Icon class (e.g., pi pi-check)' },
  { name: 'iconPos', type: 'String', default: '"left"', description: 'Icon position: left, right' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'variant', type: 'String', default: '"primary"', description: 'Variant: primary, secondary, outlined, text' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disables the button' },
  { name: 'isLoading', type: 'Boolean', default: 'false', description: 'Shows loading spinner and disables the button' }
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
      title="Button"
      description="Button component for triggering actions. Supports multiple variants, sizes, icons, and loading states."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple button with a label.</p>
      <div class="demo-row">
        <Button label="Button" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="section-description">Four style variants available: primary, secondary, outlined, and text.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Button label="Primary" variant="primary" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <Button label="Secondary" variant="secondary" />
          <span class="demo-label">Secondary</span>
        </div>
        <div class="demo-item">
          <Button label="Outlined" variant="outlined" />
          <span class="demo-label">Outlined</span>
        </div>
        <div class="demo-item">
          <Button label="Text" variant="text" />
          <span class="demo-label">Text</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="section-description">Three size options: small (sm), medium (md), and large (lg).</p>
      <div class="demo-row">
        <div class="demo-item">
          <Button label="Small" size="sm" />
          <span class="demo-label">Small</span>
        </div>
        <div class="demo-item">
          <Button label="Medium" size="md" />
          <span class="demo-label">Medium</span>
        </div>
        <div class="demo-item">
          <Button label="Large" size="lg" />
          <span class="demo-label">Large</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Icons</h2>
      <p class="section-description">Icons can be placed on the left or right of the label.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Button label="Left Icon" icon="pi pi-check" icon-pos="left" />
          <span class="demo-label">Left</span>
        </div>
        <div class="demo-item">
          <Button label="Right Icon" icon="pi pi-arrow-right" icon-pos="right" />
          <span class="demo-label">Right</span>
        </div>
        <div class="demo-item">
          <Button icon="pi pi-search" variant="secondary" />
          <span class="demo-label">Icon only</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Loading State</h2>
      <p class="section-description">Shows a spinner and disables interaction while loading.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Button label="Loading" :is-loading="true" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <Button label="Loading" variant="secondary" :is-loading="true" />
          <span class="demo-label">Secondary</span>
        </div>
        <div class="demo-item">
          <Button label="Loading" variant="outlined" :is-loading="true" />
          <span class="demo-label">Outlined</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="section-description">Disabled buttons are non-interactive and visually muted.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Button label="Disabled" :is-disabled="true" />
          <span class="demo-label">Primary</span>
        </div>
        <div class="demo-item">
          <Button label="Disabled" variant="secondary" :is-disabled="true" />
          <span class="demo-label">Secondary</span>
        </div>
        <div class="demo-item">
          <Button label="Disabled" variant="outlined" :is-disabled="true" />
          <span class="demo-label">Outlined</span>
        </div>
        <div class="demo-item">
          <Button label="Disabled" variant="text" :is-disabled="true" />
          <span class="demo-label">Text</span>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic button -->
  <Button label="Click me" />

  <!-- With icon -->
  <Button label="Save" icon="pi pi-check" />

  <!-- Different variants -->
  <Button label="Primary" variant="primary" />
  <Button label="Secondary" variant="secondary" />
  <Button label="Outlined" variant="outlined" />
  <Button label="Text" variant="text" />

  <!-- Sizes -->
  <Button label="Small" size="sm" />
  <Button label="Large" size="lg" />

  <!-- Loading state -->
  <Button label="Saving..." :is-loading="true" />

  <!-- Disabled -->
  <Button label="Disabled" :is-disabled="true" />
</template>

<script setup>
import Button from "@components/Button/Button.vue"
import "@components/Button/Button.scss"
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
      <p class="section-description">Customize button tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="button"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Variants</span>
              <div class="preview-row">
                <Button label="Primary" variant="primary" />
                <Button label="Secondary" variant="secondary" />
                <Button label="Outlined" variant="outlined" />
                <Button label="Text" variant="text" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Sizes</span>
              <div class="preview-row">
                <Button label="Small" size="sm" />
                <Button label="Medium" size="md" />
                <Button label="Large" size="lg" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Icons</span>
              <div class="preview-row">
                <Button label="Check" icon="pi pi-check" />
                <Button label="Search" icon="pi pi-search" variant="secondary" />
                <Button icon="pi pi-plus" variant="outlined" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">States</span>
              <div class="preview-row">
                <Button label="Loading" :is-loading="true" />
                <Button label="Disabled" :is-disabled="true" />
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
