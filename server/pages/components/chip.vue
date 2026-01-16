<script setup lang="ts">
import Chip from '@components/Chip/Chip.vue'
import '@components/Chip/Chip.scss'

const props = [
  { name: 'label', type: 'String', default: '-', description: 'Text label for the chip' },
  { name: 'icon', type: 'String', default: '-', description: 'Icon class for the chip' },
  { name: 'image', type: 'String', default: '-', description: 'URL of the chip image/avatar' },
  { name: 'removable', type: 'Boolean', default: 'false', description: 'Whether the chip can be removed' }
]

const events = [
  { name: 'remove', description: 'Emitted when the chip is removed' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

function handleRemove(event: Event) {
  console.log('Chip removed', event)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Chip"
      description="Chips are compact elements that represent an input, attribute, or action."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A basic chip with just a label.</p>
      <div class="demo-row">
        <Chip label="Basic" />
        <Chip label="Action" />
        <Chip label="Tag" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Icon</h2>
      <p class="section-description">Chips can include an icon to provide additional context.</p>
      <div class="demo-row">
        <Chip label="Home" icon="pi pi-home" />
        <Chip label="Settings" icon="pi pi-cog" />
        <Chip label="User" icon="pi pi-user" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Image</h2>
      <p class="section-description">Chips can display an avatar image.</p>
      <div class="demo-row">
        <Chip label="Amy Elsner" image="https://i.pravatar.cc/150?u=amy" />
        <Chip label="Anna Fali" image="https://i.pravatar.cc/150?u=anna" />
        <Chip label="Asiya Javayant" image="https://i.pravatar.cc/150?u=asiya" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Removable</h2>
      <p class="section-description">Removable chips display a close button and emit a remove event when clicked.</p>
      <div class="demo-row">
        <Chip label="Removable" :removable="true" @remove="handleRemove" />
        <Chip label="With Icon" icon="pi pi-tag" :removable="true" @remove="handleRemove" />
        <Chip label="With Image" image="https://i.pravatar.cc/150?u=removable" :removable="true" @remove="handleRemove" />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic chip -->
  <Chip label="Basic" />

  <!-- With icon -->
  <Chip label="Home" icon="pi pi-home" />

  <!-- With image -->
  <Chip label="Amy Elsner" image="/path/to/avatar.jpg" />

  <!-- Removable -->
  <Chip label="Removable" :removable="true" @remove="onRemove" />
</template>

<script setup>
import Chip from "@components/Chip/Chip.vue"
import "@components/Chip/Chip.scss"

function onRemove(event) {
  console.log("Chip removed", event)
}
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

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize chip tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="chip"
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
              <div class="preview-row">
                <div class="chip">
                  <span class="chip__label">Basic</span>
                </div>
                <div class="chip">
                  <span class="chip__label">Tag</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Icon</span>
              <div class="preview-row">
                <div class="chip">
                  <i class="pi pi-home chip__icon"></i>
                  <span class="chip__label">Home</span>
                </div>
                <div class="chip">
                  <i class="pi pi-user chip__icon"></i>
                  <span class="chip__label">User</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Image</span>
              <div class="preview-row">
                <div class="chip chip--has-image">
                  <img src="https://i.pravatar.cc/150?u=preview1" alt="avatar" class="chip__image" />
                  <span class="chip__label">User</span>
                </div>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">Removable</span>
              <div class="preview-row">
                <div class="chip chip--removable">
                  <span class="chip__label">Removable</span>
                  <button type="button" class="chip__remove" aria-label="Remove">
                    <svg class="chip__remove-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
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
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
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
