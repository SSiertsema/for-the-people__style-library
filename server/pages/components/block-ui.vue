<script setup lang="ts">
import { ref } from 'vue'
import BlockUI from '@components/BlockUI/BlockUI.vue'
import '@components/BlockUI/BlockUI.scss'

const blocked = ref(false)
const fullScreenBlocked = ref(false)

const toggleBlock = () => {
  blocked.value = true
  setTimeout(() => {
    blocked.value = false
  }, 2000)
}

const toggleFullScreen = () => {
  fullScreenBlocked.value = true
  setTimeout(() => {
    fullScreenBlocked.value = false
  }, 2000)
}

const props = [
  { name: 'blocked', type: 'Boolean', default: 'false', description: 'Whether the content is blocked' },
  { name: 'fullScreen', type: 'Boolean', default: 'false', description: 'Block the entire screen instead of just the container' },
  { name: 'showSpinner', type: 'Boolean', default: 'true', description: 'Show loading spinner on the overlay' },
  { name: 'autoZIndex', type: 'Boolean', default: 'true', description: 'Automatically manage z-index' },
  { name: 'baseZIndex', type: 'Number', default: '1000', description: 'Base z-index value for the overlay' }
]

const events = [
  { name: 'block', description: 'Emitted when the overlay is activated' },
  { name: 'unblock', description: 'Emitted when the overlay is removed' }
]

const slots = [
  { name: 'default', description: 'Content to be blocked' },
  { name: 'spinner', description: 'Custom loading indicator to replace the default spinner' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="BlockUI"
      description="An overlay component that blocks user interaction with content during loading or processing."
    />

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="section-description">Click the button to block the panel for 2 seconds.</p>
      <div class="demo-box">
        <button class="demo-button" @click="toggleBlock">Block Panel</button>
        <BlockUI :blocked="blocked">
          <div class="panel-content">
            <h3>Panel Content</h3>
            <p>This content will be blocked when the overlay is active.</p>
            <p>Try clicking the button above to see the blocking effect.</p>
          </div>
        </BlockUI>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Spinner</h2>
      <p class="section-description">Block content without showing a loading indicator.</p>
      <div class="demo-box">
        <BlockUI :blocked="blocked" :show-spinner="false">
          <div class="panel-content">
            <h3>No Spinner</h3>
            <p>The overlay blocks interaction but shows no loading indicator.</p>
          </div>
        </BlockUI>
      </div>
    </section>

    <section class="demo-section">
      <h2>Full Screen</h2>
      <p class="section-description">Block the entire viewport for modal-like experiences.</p>
      <div class="demo-box">
        <button class="demo-button" @click="toggleFullScreen">Block Full Screen</button>
        <BlockUI :blocked="fullScreenBlocked" :full-screen="true">
          <div class="panel-content">
            <p>The full-screen blocking will activate when you click the button.</p>
          </div>
        </BlockUI>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Spinner</h2>
      <p class="section-description">Replace the default spinner with custom content.</p>
      <div class="demo-box">
        <BlockUI :blocked="true">
          <template #spinner>
            <div class="custom-spinner">
              <span>Loading...</span>
            </div>
          </template>
          <div class="panel-content">
            <h3>Custom Loading</h3>
            <p>This panel uses a custom loading message.</p>
          </div>
        </BlockUI>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic blocking -->
  <BlockUI :blocked="isLoading">
    <div>Content to block during loading</div>
  </BlockUI>

  <!-- Full screen blocking -->
  <BlockUI :blocked="isProcessing" :full-screen="true">
    <div>App content</div>
  </BlockUI>

  <!-- Without spinner -->
  <BlockUI :blocked="blocked" :show-spinner="false">
    <div>Blocked without spinner</div>
  </BlockUI>

  <!-- Custom spinner -->
  <BlockUI :blocked="blocked">
    <template #spinner>
      <div class="my-loader">Please wait...</div>
    </template>
    <div>Content</div>
  </BlockUI>
</template>

<script setup>
import { ref } from "vue"
import BlockUI from "@components/BlockUI/BlockUI.vue"
import "@components/BlockUI/BlockUI.scss"

const isLoading = ref(false)
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

.demo-button {
  padding: var(--doc-space-s) var(--doc-space-l);
  background: var(--brand-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: var(--doc-space-m);

  &:hover {
    opacity: 0.9;
  }
}

.panel-content {
  padding: var(--doc-space-l);
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-m);
  min-height: 120px;

  h3 {
    margin: 0 0 var(--doc-space-s);
  }

  p {
    margin: 0 0 var(--doc-space-xs);
    color: var(--doc-text-muted);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.custom-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--doc-space-m) var(--doc-space-l);
  background: white;
  border-radius: var(--doc-radius-m);
  font-weight: 500;
  color: var(--brand-primary, #3b82f6);
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
