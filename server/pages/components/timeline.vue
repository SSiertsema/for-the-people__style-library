<script setup lang="ts">
import Timeline from '@components/Timeline/Timeline.vue'
import '@components/Timeline/Timeline.scss'

const props = [
  { name: 'value', type: 'Array', default: 'required', description: 'Array of event objects with title, description, date, color' },
  { name: 'align', type: 'String', default: '"left"', description: 'Alignment: left, right, or alternate' },
  { name: 'layout', type: 'String', default: '"vertical"', description: 'Layout: vertical or horizontal' }
]

const slots = [
  { name: 'content', description: 'Custom content for each event. Props: { item, index }' },
  { name: 'opposite', description: 'Content on the opposite side of the timeline. Props: { item, index }' },
  { name: 'marker', description: 'Custom marker element. Props: { item, index }' }
]

const basicEvents = [
  { title: 'Project Started', description: 'Initial project setup and planning phase completed.', date: 'Jan 2024' },
  { title: 'Design Phase', description: 'UI/UX design mockups and prototypes created.', date: 'Feb 2024' },
  { title: 'Development', description: 'Core features implemented and tested.', date: 'Mar 2024' },
  { title: 'Launch', description: 'Product launched to production.', date: 'Apr 2024' }
]

const coloredEvents = [
  { title: 'Order Placed', description: 'Your order has been received.', date: '10:30 AM', color: 'primary' },
  { title: 'Processing', description: 'Order is being prepared.', date: '11:00 AM', color: 'warning' },
  { title: 'Shipped', description: 'Package is on its way.', date: '2:00 PM', color: 'success' },
  { title: 'Delivered', description: 'Package delivered successfully.', date: '5:30 PM', color: 'success' }
]

const alternateEvents = [
  { title: 'Founded', description: 'Company established', date: '2020' },
  { title: 'First Product', description: 'Launched MVP', date: '2021' },
  { title: 'Series A', description: 'Raised $5M', date: '2022' },
  { title: 'Expansion', description: 'Global presence', date: '2023' }
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
      title="Timeline"
      description="Timeline displays a series of events in chronological order with visual markers and connectors."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A vertical timeline with events aligned to the left.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Timeline :value="basicEvents" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Colors</h2>
      <p class="section-description">Timeline events can have different marker colors to indicate status.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Timeline :value="coloredEvents" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Right Aligned</h2>
      <p class="section-description">Content aligned to the right side of the timeline.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Timeline :value="basicEvents" align="right" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Alternate</h2>
      <p class="section-description">Events alternate between left and right sides.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Timeline :value="alternateEvents" align="alternate" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Horizontal</h2>
      <p class="section-description">A horizontal timeline layout.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--extra-wide">
          <Timeline :value="alternateEvents" layout="horizontal" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic timeline -->
  <Timeline :value="events" />

  <!-- Alternate alignment -->
  <Timeline :value="events" align="alternate" />

  <!-- Horizontal layout -->
  <Timeline :value="events" layout="horizontal" />

  <!-- Custom content slot -->
  <Timeline :value="events">
    <template #content="{ item }">
      <Card>{{ item.title }}</Card>
    </template>
  </Timeline>
</template>

<script setup>
import Timeline from "@components/Timeline/Timeline.vue"
import "@components/Timeline/Timeline.scss"

const events = [
  {
    title: "Event Title",
    description: "Event description",
    date: "Jan 2024",
    color: "primary" // primary, success, warning, danger
  }
]
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
      <p class="section-description">Customize the timeline tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="timeline"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Vertical Timeline</span>
              <div class="preview-column">
                <Timeline :value="coloredEvents.slice(0, 3)" />
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
  align-items: flex-start;
  gap: var(--doc-space-xl);
  flex-wrap: wrap;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--doc-space-s);
}

.demo-item--wide {
  width: 100%;
  max-width: 500px;
}

.demo-item--extra-wide {
  width: 100%;
  max-width: 800px;
  overflow-x: auto;
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

.preview-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
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
