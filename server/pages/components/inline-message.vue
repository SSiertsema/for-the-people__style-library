<script setup lang="ts">
import InlineMessage from '@components/InlineMessage/InlineMessage.vue'
import '@components/InlineMessage/InlineMessage.scss'

const componentProps = [
  { name: 'severity', type: 'String', default: '"info"', description: 'Severity style: success, info, warn, error' },
  { name: 'icon', type: 'Boolean', default: 'true', description: 'Whether to show the severity icon' }
]

const slots = [
  { name: 'default', description: 'The message content' },
  { name: 'icon', description: 'Custom icon slot' }
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
      title="InlineMessage"
      description="InlineMessage component for displaying inline feedback without a close button. Ideal for form validation and brief notifications."
    />

    <section class="demo-section">
      <h2>All Severities</h2>
      <p class="section-description">Inline messages with different severity levels.</p>
      <div class="demo-stack">
        <InlineMessage severity="success">Changes saved successfully</InlineMessage>
        <InlineMessage severity="info">This field is optional</InlineMessage>
        <InlineMessage severity="warn">Your session will expire soon</InlineMessage>
        <InlineMessage severity="error">Invalid email address</InlineMessage>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Icon</h2>
      <p class="section-description">Inline messages without the severity icon.</p>
      <div class="demo-stack">
        <InlineMessage severity="success" :icon="false">Saved</InlineMessage>
        <InlineMessage severity="info" :icon="false">Optional field</InlineMessage>
        <InlineMessage severity="warn" :icon="false">Low stock</InlineMessage>
        <InlineMessage severity="error" :icon="false">Required</InlineMessage>
      </div>
    </section>

    <section class="demo-section">
      <h2>Form Field Usage</h2>
      <p class="section-description">Typical usage alongside form fields.</p>
      <div class="demo-form">
        <div class="demo-field">
          <label>Email Address</label>
          <input type="email" value="invalid-email" class="demo-input demo-input--error" />
          <InlineMessage severity="error">Please enter a valid email address</InlineMessage>
        </div>
        <div class="demo-field">
          <label>Username</label>
          <input type="text" value="johndoe" class="demo-input demo-input--success" />
          <InlineMessage severity="success">Username is available</InlineMessage>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic inline message -->
  <InlineMessage severity="info">Optional field</InlineMessage>

  <!-- All severities -->
  <InlineMessage severity="success">Saved successfully</InlineMessage>
  <InlineMessage severity="warn">Your session will expire</InlineMessage>
  <InlineMessage severity="error">Invalid input</InlineMessage>

  <!-- Without icon -->
  <InlineMessage severity="error" :icon="false">Required</InlineMessage>
</template>

<script setup>
import InlineMessage from "@components/InlineMessage/InlineMessage.vue"
import "@components/InlineMessage/InlineMessage.scss"
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
          <tr v-for="slot in slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the inline message tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="inline-message"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">All Severities</span>
              <div class="preview-column">
                <InlineMessage severity="success">Success message</InlineMessage>
                <InlineMessage severity="info">Info message</InlineMessage>
                <InlineMessage severity="warn">Warning message</InlineMessage>
                <InlineMessage severity="error">Error message</InlineMessage>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Without Icons</span>
              <div class="preview-column">
                <InlineMessage severity="success" :icon="false">Success</InlineMessage>
                <InlineMessage severity="error" :icon="false">Error</InlineMessage>
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

.demo-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doc-space-m);
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-l);
  max-width: 400px;
}

.demo-field {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);

  label {
    font-size: 14px;
    font-weight: 500;
    color: var(--doc-text-default);
  }
}

.demo-input {
  padding: var(--doc-space-s) var(--doc-space-m);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  font-size: 14px;

  &--error {
    border-color: var(--feedback-error);
  }

  &--success {
    border-color: var(--feedback-success);
  }
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

.preview-column {
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
