<script setup lang="ts">
import Toolbar from '@components/Toolbar/Toolbar.vue'
import '@components/Toolbar/Toolbar.scss'

const toolbarSlots = [
  { name: 'default', description: 'Default slot for toolbar content (alternative to start/center/end)' },
  { name: 'start', description: 'Left-aligned content area' },
  { name: 'center', description: 'Center-aligned content area (flex: 1)' },
  { name: 'end', description: 'Right-aligned content area' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Toolbar"
      description="Toolbar component for horizontal button groups and action containers."
    />

    <section class="demo-section">
      <h2>Basic Toolbar</h2>
      <p class="section-description">A simple toolbar with buttons using the default slot.</p>
      <div class="demo-row">
        <Toolbar>
          <button class="demo-button">New</button>
          <button class="demo-button">Open</button>
          <button class="demo-button">Save</button>
        </Toolbar>
      </div>
    </section>

    <section class="demo-section">
      <h2>Start and End Sections</h2>
      <p class="section-description">Use start and end slots to position content at opposite ends.</p>
      <div class="demo-row">
        <Toolbar>
          <template #start>
            <button class="demo-button">New</button>
            <button class="demo-button">Open</button>
          </template>
          <template #end>
            <button class="demo-button demo-button--secondary">Help</button>
            <button class="demo-button">Save</button>
          </template>
        </Toolbar>
      </div>
    </section>

    <section class="demo-section">
      <h2>All Three Sections</h2>
      <p class="section-description">Combine start, center, and end slots for complex layouts.</p>
      <div class="demo-row">
        <Toolbar>
          <template #start>
            <button class="demo-button">File</button>
            <button class="demo-button">Edit</button>
          </template>
          <template #center>
            <span class="toolbar-title">Document Editor</span>
          </template>
          <template #end>
            <button class="demo-button demo-button--secondary">Preview</button>
            <button class="demo-button">Publish</button>
          </template>
        </Toolbar>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Icon Buttons</h2>
      <p class="section-description">Toolbars work well with icon buttons for compact layouts.</p>
      <div class="demo-row">
        <Toolbar>
          <template #start>
            <button class="demo-icon-button" aria-label="Undo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </button>
            <button class="demo-icon-button" aria-label="Redo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
              </svg>
            </button>
            <span class="divider"></span>
            <button class="demo-icon-button" aria-label="Bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
              </svg>
            </button>
            <button class="demo-icon-button" aria-label="Italic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="4" x2="10" y2="4" />
                <line x1="14" y1="20" x2="5" y2="20" />
                <line x1="15" y1="4" x2="9" y2="20" />
              </svg>
            </button>
            <button class="demo-icon-button" aria-label="Underline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" />
                <line x1="4" y1="21" x2="20" y2="21" />
              </svg>
            </button>
          </template>
          <template #end>
            <button class="demo-button">Save</button>
          </template>
        </Toolbar>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic toolbar -->
  <Toolbar>
    <button>Button 1</button>
    <button>Button 2</button>
  </Toolbar>

  <!-- Toolbar with sections -->
  <Toolbar>
    <template #start>
      <button>Left</button>
    </template>
    <template #center>
      <span>Center Content</span>
    </template>
    <template #end>
      <button>Right</button>
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from "@components/Toolbar/Toolbar.vue"
</script>'
      />
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
          <tr v-for="slot in toolbarSlots" :key="slot.name">
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
  max-width: 700px;
}

.toolbar-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--doc-text-default);
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--doc-border);
  margin: 0 4px;
}

.demo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--doc-space-xs) var(--doc-space-m);
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

.demo-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--doc-text-default);
  background-color: transparent;
  border: none;
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--doc-surface-muted);
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

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
