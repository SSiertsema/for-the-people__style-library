<script setup lang="ts">
const props = [
  { name: 'label', type: 'String', default: '-', description: 'Tekst label voor de avatar (initialen)' },
  { name: 'icon', type: 'String', default: '-', description: 'Icon class voor de avatar' },
  { name: 'image', type: 'String', default: '-', description: 'URL van de avatar afbeelding' },
  { name: 'size', type: 'String', default: '"medium"', description: 'Grootte: small, medium, large, xlarge' },
  { name: 'shape', type: 'String', default: '"square"', description: 'Vorm: square, circle' },
  { name: 'ariaLabel', type: 'String', default: '-', description: 'Toegankelijkheidslabel' }
]

const events = [
  { name: 'error', description: 'Emit wanneer afbeelding niet geladen kan worden' }
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
      title="Avatar"
      description="Avatar component voor het weergeven van gebruikersprofielen, initialen of iconen."
    />

    <section class="demo-section">
      <h2>Vormen</h2>
      <p class="section-description">De avatar is beschikbaar in square en circle vorm.</p>
      <div class="demo-row">
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-large pzh-avatar--shape-square">
            <span class="pzh-avatar__label">AB</span>
          </div>
          <span class="demo-label">Square</span>
        </div>
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-large pzh-avatar--shape-circle">
            <span class="pzh-avatar__label">AB</span>
          </div>
          <span class="demo-label">Circle</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Groottes</h2>
      <p class="section-description">Vier grootte varianten beschikbaar.</p>
      <div class="demo-row">
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-small pzh-avatar--shape-circle">
            <span class="pzh-avatar__label">S</span>
          </div>
          <span class="demo-label">Small</span>
        </div>
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-medium pzh-avatar--shape-circle">
            <span class="pzh-avatar__label">M</span>
          </div>
          <span class="demo-label">Medium</span>
        </div>
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-large pzh-avatar--shape-circle">
            <span class="pzh-avatar__label">L</span>
          </div>
          <span class="demo-label">Large</span>
        </div>
        <div class="demo-item">
          <div class="pzh-avatar pzh-avatar--size-xlarge pzh-avatar--shape-circle">
            <span class="pzh-avatar__label">XL</span>
          </div>
          <span class="demo-label">XLarge</span>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Met initialen -->
  <Avatar label="AB" size="large" shape="circle" />

  <!-- Met afbeelding -->
  <Avatar image="/path/to/image.jpg" size="medium" />

  <!-- Met icoon -->
  <Avatar icon="pi pi-user" size="small" shape="square" />
</template>

<script setup>
import { Avatar } from "@pzh/components"
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Type</th>
            <th>Default</th>
            <th>Beschrijving</th>
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

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Beschrijving</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Pas de avatar tokens aan en zie direct het resultaat in de preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="avatar"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Kleuren</span>
              <div class="preview-row">
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--variant-default">
                  <span class="pzh-avatar__label">AB</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--variant-brand">
                  <span class="pzh-avatar__label">CD</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--variant-accent">
                  <span class="pzh-avatar__label">EF</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Groottes</span>
              <div class="preview-row">
                <div class="pzh-avatar pzh-avatar--size-xs pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">XS</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-sm pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">S</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-md pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">M</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">L</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-xl pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">XL</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Vormen</span>
              <div class="preview-row">
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-square">
                  <span class="pzh-avatar__label">SQ</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle">
                  <span class="pzh-avatar__label">CI</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Status</span>
              <div class="preview-row">
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--status-online">
                  <span class="pzh-avatar__label">ON</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--status-away">
                  <span class="pzh-avatar__label">AW</span>
                </div>
                <div class="pzh-avatar pzh-avatar--size-lg pzh-avatar--shape-circle pzh-avatar--status-busy">
                  <span class="pzh-avatar__label">BU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../src/components/Avatar/Avatar.scss";

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
.events-section,
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

// Ensure CSS custom properties cascade into avatar components
.preview-content {
  :deep(.pzh-avatar) {
    // The CSS variables set on .preview-content will cascade down
    // No additional styles needed - just ensuring the cascade works
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
