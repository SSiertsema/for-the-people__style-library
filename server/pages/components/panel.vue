<script setup lang="ts">
import Panel from '@components/Panel/Panel.vue'
import '@components/Panel/Panel.scss'

const panelProps = [
  { name: 'header', type: 'String', default: '""', description: 'Header text displayed in the panel header' },
  { name: 'toggleable', type: 'Boolean', default: 'false', description: 'Makes the panel collapsible via the header' },
  { name: 'collapsed', type: 'Boolean', default: 'false', description: 'Whether the panel is collapsed (only when toggleable)' }
]

const panelEvents = [
  { name: 'update:collapsed', description: 'Emitted when collapsed state changes (for v-model)' },
  { name: 'toggle', description: 'Emitted when panel is toggled, provides { collapsed: boolean }' }
]

const panelSlots = [
  { name: 'default', description: 'Main content of the panel' },
  { name: 'header', description: 'Custom header content (overrides header prop)' },
  { name: 'icons', description: 'Icon buttons in the header area' },
  { name: 'footer', description: 'Footer content area' }
]

const basicCollapsed = ref(false)
const toggleableCollapsed = ref(false)
const controlledCollapsed = ref(true)
</script>

<template>
  <div class="page">
    <PageHeader
      title="Panel"
      description="Panel component for grouping content with an optional collapsible header."
    />

    <section class="demo-section">
      <h2>Basic Panel</h2>
      <p class="section-description">A simple panel with a header and content.</p>
      <div class="demo-row">
        <Panel header="Basic Panel">
          <p>This is the content of a basic panel. Panels are useful for grouping related content together with a clear header.</p>
        </Panel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Toggleable Panel</h2>
      <p class="section-description">Enable the toggleable prop to make the panel collapsible.</p>
      <div class="demo-row">
        <Panel header="Toggleable Panel" toggleable v-model:collapsed="toggleableCollapsed">
          <p>This panel can be collapsed by clicking on the header. The content will slide up and down smoothly.</p>
          <p>Use the v-model:collapsed to control or track the collapsed state.</p>
        </Panel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Initially Collapsed</h2>
      <p class="section-description">Set collapsed to true to start the panel in collapsed state.</p>
      <div class="demo-row">
        <Panel header="Initially Collapsed" toggleable v-model:collapsed="controlledCollapsed">
          <p>This panel starts collapsed. Click the header to expand it.</p>
        </Panel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Header Slot</h2>
      <p class="section-description">Use the header slot for custom header content.</p>
      <div class="demo-row">
        <Panel toggleable>
          <template #header>
            <span style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <strong>Custom Header with Icon</strong>
            </span>
          </template>
          <p>You can use the header slot to provide custom header content including icons and complex layouts.</p>
        </Panel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Panel with Footer</h2>
      <p class="section-description">Use the footer slot for action buttons or additional information.</p>
      <div class="demo-row">
        <Panel header="Panel with Footer">
          <p>This panel has a footer section that can be used for actions or summary information.</p>
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="demo-button demo-button--secondary">Cancel</button>
              <button class="demo-button">Save</button>
            </div>
          </template>
        </Panel>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic panel -->
  <Panel header="Panel Title">
    <p>Panel content goes here.</p>
  </Panel>

  <!-- Toggleable panel -->
  <Panel header="Collapsible Panel" toggleable v-model:collapsed="isCollapsed">
    <p>This content can be collapsed.</p>
  </Panel>

  <!-- Panel with custom header and footer -->
  <Panel toggleable>
    <template #header>
      <span>Custom Header</span>
    </template>
    <p>Content here.</p>
    <template #footer>
      <button>Action</button>
    </template>
  </Panel>
</template>

<script setup>
import { ref } from "vue"
import Panel from "@components/Panel/Panel.vue"

const isCollapsed = ref(false)
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
          <tr v-for="prop in panelProps" :key="prop.name">
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
          <tr v-for="event in panelEvents" :key="event.name">
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
          <tr v-for="slot in panelSlots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
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
  max-width: 600px;
}

.demo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--doc-space-s) var(--doc-space-m);
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: var(--doc-brand-primary, #1a365d);
  border: none;
  border-radius: var(--doc-radius-m);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--doc-brand-primary-hover, #2d4a7c);
  }

  &--secondary {
    color: var(--doc-text-default);
    background-color: transparent;
    border: 1px solid var(--doc-border);

    &:hover {
      background-color: var(--doc-surface-muted);
    }
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
.slots-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
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
