<script setup lang="ts">
import FieldSet from '@components/FieldSet/FieldSet.vue'
import '@components/FieldSet/FieldSet.scss'

const componentProps = [
  { name: 'legend', type: 'String', default: '""', description: 'Legend text for the fieldset' },
  { name: 'toggleable', type: 'Boolean', default: 'false', description: 'Whether the fieldset can be collapsed' },
  { name: 'collapsed', type: 'Boolean', default: 'false', description: 'Whether the fieldset is collapsed (when toggleable)' }
]

const events = [
  { name: 'update:collapsed', description: 'Emitted when collapsed state changes (v-model support)' },
  { name: 'toggle', description: 'Emitted when toggle button is clicked, provides { collapsed: boolean }' }
]

const slots = [
  { name: 'default', description: 'The fieldset content' },
  { name: 'legend', description: 'Custom legend content' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})
const isCollapsed = ref(false)

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="FieldSet"
      description="FieldSet component for grouping related content with an optional legend and collapsible functionality."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple fieldset with a legend.</p>
      <div class="demo-row">
        <FieldSet legend="Personal Information">
          <p>This is the content of the fieldset. It can contain any content such as form fields, text, or other components.</p>
        </FieldSet>
      </div>
    </section>

    <section class="demo-section">
      <h2>Toggleable</h2>
      <p class="section-description">A fieldset that can be collapsed and expanded.</p>
      <div class="demo-column">
        <FieldSet legend="Click to Toggle" toggleable>
          <p>This content can be shown or hidden by clicking on the legend. The fieldset uses a smooth animation when toggling.</p>
        </FieldSet>
        <FieldSet legend="Initially Collapsed" toggleable :collapsed="true">
          <p>This fieldset starts in a collapsed state. Click the legend to expand it.</p>
        </FieldSet>
      </div>
    </section>

    <section class="demo-section">
      <h2>Form Example</h2>
      <p class="section-description">Using fieldsets to group form fields.</p>
      <div class="demo-form">
        <FieldSet legend="Contact Details">
          <div class="form-fields">
            <div class="form-field">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div class="form-field">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
          </div>
        </FieldSet>
        <FieldSet legend="Address" toggleable>
          <div class="form-fields">
            <div class="form-field">
              <label>Street</label>
              <input type="text" placeholder="Enter street address" />
            </div>
            <div class="form-field">
              <label>City</label>
              <input type="text" placeholder="Enter city" />
            </div>
          </div>
        </FieldSet>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Legend Slot</h2>
      <p class="section-description">Using the legend slot for custom content.</p>
      <div class="demo-row">
        <FieldSet>
          <template #legend>
            <span style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Security Settings
            </span>
          </template>
          <p>Custom legend with an icon.</p>
        </FieldSet>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic fieldset -->
  <FieldSet legend="Section Title">
    <p>Content goes here</p>
  </FieldSet>

  <!-- Toggleable fieldset -->
  <FieldSet legend="Collapsible Section" toggleable>
    <p>This can be hidden</p>
  </FieldSet>

  <!-- Initially collapsed -->
  <FieldSet legend="Hidden by Default" toggleable :collapsed="true">
    <p>Click to see this content</p>
  </FieldSet>

  <!-- With v-model for controlled state -->
  <FieldSet
    legend="Controlled"
    toggleable
    v-model:collapsed="isCollapsed"
    @toggle="onToggle"
  >
    <p>Content with controlled state</p>
  </FieldSet>

  <!-- Custom legend -->
  <FieldSet>
    <template #legend>
      <span>Custom Legend Content</span>
    </template>
    <p>Content here</p>
  </FieldSet>
</template>

<script setup>
import FieldSet from "@components/FieldSet/FieldSet.vue"
import "@components/FieldSet/FieldSet.scss"

const isCollapsed = ref(false)
const onToggle = (e) => console.log("Collapsed:", e.collapsed)
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

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
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
      <p class="section-description">Customize the fieldset tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="field-set"
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
              <FieldSet legend="Section Title">
                <p style="margin: 0;">Content inside the fieldset.</p>
              </FieldSet>
            </div>

            <div class="preview-group">
              <span class="preview-label">Toggleable</span>
              <FieldSet legend="Click to Toggle" toggleable v-model:collapsed="isCollapsed">
                <p style="margin: 0;">This content can be collapsed.</p>
              </FieldSet>
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
  max-width: 600px;
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
  max-width: 500px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);

  label {
    font-size: 14px;
    font-weight: 500;
  }

  input {
    padding: var(--doc-space-s) var(--doc-space-m);
    border: 1px solid var(--doc-border);
    border-radius: var(--doc-radius-m);
    font-size: 14px;
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
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
