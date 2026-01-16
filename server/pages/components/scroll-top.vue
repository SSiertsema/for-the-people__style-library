<script setup lang="ts">
import ScrollTop from '@components/ScrollTop/ScrollTop.vue'
import '@components/ScrollTop/ScrollTop.scss'

const props = [
  { name: 'threshold', type: 'Number', default: '400', description: 'Scroll distance in pixels before button appears' },
  { name: 'behavior', type: 'String', default: '"smooth"', description: 'Scroll behavior: smooth, auto, or instant' },
  { name: 'target', type: 'String', default: '"window"', description: 'Scroll target: window or CSS selector' }
]

const events = [
  { name: 'click', description: 'Emitted when the scroll top button is clicked' }
]

const slots = [
  { name: 'default', description: 'Custom content/icon for the button' }
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
      title="ScrollTop"
      description="ScrollTop is a button that appears when the page is scrolled, allowing users to quickly return to the top."
    />

    <section class="demo-section">
      <h2>Demo</h2>
      <p class="section-description">Scroll down the page to see the ScrollTop button appear in the bottom-right corner. Click it to scroll back to the top.</p>
      <div class="demo-row">
        <div class="demo-note">
          <svg class="demo-note__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>The ScrollTop button appears after scrolling past 400px (default threshold). Try scrolling down this page to see it in action.</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Within Container</h2>
      <p class="section-description">ScrollTop can also be used within a scrollable container by specifying the target selector.</p>
      <div class="demo-row">
        <div class="scroll-container" id="scroll-demo">
          <div class="scroll-content">
            <p>Scroll down within this container to see the ScrollTop button...</p>
            <p v-for="i in 20" :key="i">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <ScrollTop target="#scroll-demo" :threshold="100" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic scroll top -->
  <ScrollTop />

  <!-- Custom threshold -->
  <ScrollTop :threshold="200" />

  <!-- Instant scroll behavior -->
  <ScrollTop behavior="instant" />

  <!-- Target specific container -->
  <ScrollTop target="#my-container" />

  <!-- Custom icon via slot -->
  <ScrollTop>
    <i class="pi pi-arrow-up" />
  </ScrollTop>
</template>

<script setup>
import ScrollTop from "@components/ScrollTop/ScrollTop.vue"
import "@components/ScrollTop/ScrollTop.scss"
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
      <p class="section-description">Customize the scroll top tokens.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="scroll-top"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Button Preview</span>
              <div class="preview-row">
                <button class="scroll-top scroll-top--preview">
                  <svg
                    class="scroll-top__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
              <p class="preview-note">Note: The actual ScrollTop button appears fixed at the bottom-right of the viewport when scrolling.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global ScrollTop for window -->
    <ScrollTop />
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

.demo-note {
  display: flex;
  align-items: flex-start;
  gap: var(--doc-space-s);
  padding: var(--doc-space-m);
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  color: var(--doc-text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.demo-note__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.scroll-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  background: var(--doc-surface-panel);
}

.scroll-content {
  padding: var(--doc-space-m);
}

.scroll-content p {
  margin: 0 0 var(--doc-space-m);
  color: var(--doc-text-secondary);
  font-size: 14px;
  line-height: 1.6;
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

.preview-row {
  display: flex;
  gap: var(--doc-space-m);
  align-items: center;
}

.preview-note {
  font-size: 12px;
  color: var(--doc-text-muted);
  margin: 0;
  font-style: italic;
}

:deep(.scroll-top--preview) {
  position: static;
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
