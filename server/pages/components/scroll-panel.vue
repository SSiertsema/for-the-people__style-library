<script setup lang="ts">
import { ref } from 'vue'
import ScrollPanel from '@components/ScrollPanel/ScrollPanel.vue'
import '@components/ScrollPanel/ScrollPanel.scss'

const scrollPanelRef = ref(null)

const props = [
  { name: 'style', type: 'Object | String', default: '{}', description: 'Inline style for the container (use for dimensions)' },
  { name: 'step', type: 'Number', default: '40', description: 'Keyboard scroll increment in pixels' }
]

const methods = [
  { name: 'refresh()', description: 'Manually update scrollbar positions after content changes' },
  { name: 'scrollTop(value)', description: 'Programmatically set vertical scroll position' },
  { name: 'scrollLeft(value)', description: 'Programmatically set horizontal scroll position' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ScrollPanel"
      description="A container with custom styled scrollbars for scrollable content."
    />

    <section class="demo-section">
      <h2>Vertical Scroll</h2>
      <p class="section-description">Custom scrollbar appears when content overflows vertically.</p>
      <div class="demo-box">
        <ScrollPanel :style="{ width: '100%', height: '200px' }">
          <p v-for="i in 20" :key="i" class="scroll-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ScrollPanel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Horizontal Scroll</h2>
      <p class="section-description">Wide content triggers horizontal scrollbar.</p>
      <div class="demo-box">
        <ScrollPanel :style="{ width: '100%', height: '150px' }">
          <div style="width: 1500px; padding: 16px;">
            <p>This content is wider than the container, requiring horizontal scroll.</p>
            <div style="display: flex; gap: 16px;">
              <div v-for="i in 10" :key="i" class="scroll-item">Item {{ i }}</div>
            </div>
          </div>
        </ScrollPanel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Both Scrollbars</h2>
      <p class="section-description">Content that overflows in both directions shows both scrollbars.</p>
      <div class="demo-box">
        <ScrollPanel :style="{ width: '100%', height: '200px' }">
          <div style="width: 1200px; padding: 16px;">
            <p v-for="i in 15" :key="i" class="scroll-content">
              Wide content line {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
        </ScrollPanel>
      </div>
    </section>

    <section class="demo-section">
      <h2>Programmatic Control</h2>
      <p class="section-description">Use exposed methods to control scroll position.</p>
      <div class="demo-box">
        <div class="demo-controls">
          <button @click="scrollPanelRef?.scrollTop(0)">Scroll to Top</button>
          <button @click="scrollPanelRef?.scrollTop(500)">Scroll to Bottom</button>
          <button @click="scrollPanelRef?.refresh()">Refresh</button>
        </div>
        <ScrollPanel ref="scrollPanelRef" :style="{ width: '100%', height: '150px' }">
          <p v-for="i in 20" :key="i" class="scroll-content">
            Line {{ i }}: Scroll content for programmatic control demo.
          </p>
        </ScrollPanel>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic scroll panel -->
  <ScrollPanel :style="{ width: &apos;100%&apos;, height: &apos;300px&apos; }">
    <p v-for="i in 50" :key="i">Scrollable content...</p>
  </ScrollPanel>

  <!-- With programmatic control -->
  <ScrollPanel ref="scrollRef" :style="{ height: &apos;200px&apos; }">
    <div>Content here...</div>
  </ScrollPanel>
  <button @click="scrollRef.scrollTop(0)">Back to top</button>
</template>

<script setup>
import { ref } from "vue"
import ScrollPanel from "@components/ScrollPanel/ScrollPanel.vue"
import "@components/ScrollPanel/ScrollPanel.scss"

const scrollRef = ref(null)
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

    <section class="methods-section">
      <h2>Methods</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in methods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description }}</td>
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

.demo-box {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
}

.demo-controls {
  display: flex;
  gap: var(--doc-space-s);
  margin-bottom: var(--doc-space-m);

  button {
    padding: var(--doc-space-xs) var(--doc-space-m);
    background: var(--doc-surface-muted);
    border: 1px solid var(--doc-border);
    border-radius: var(--doc-radius-s);
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: var(--doc-surface-hover);
    }
  }
}

.scroll-content {
  margin: 0 0 var(--doc-space-m);
  line-height: 1.6;
}

.scroll-item {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  font-weight: 500;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.methods-section {
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
