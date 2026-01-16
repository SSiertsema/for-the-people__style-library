<script setup lang="ts">
import ConfirmPopup from '@components/ConfirmPopup/ConfirmPopup.vue'
import '@components/ConfirmPopup/ConfirmPopup.scss'

const props = [
  { name: 'target', type: 'Object | String', default: 'null', description: 'Target element or selector to position the popup near' },
  { name: 'message', type: 'String', default: '"Are you sure?"', description: 'Confirmation message displayed in the popup' },
  { name: 'acceptLabel', type: 'String', default: '"Yes"', description: 'Label for the accept button' },
  { name: 'rejectLabel', type: 'String', default: '"No"', description: 'Label for the reject button' },
  { name: 'showIcon', type: 'Boolean', default: 'true', description: 'Whether to show the warning icon' },
  { name: 'position', type: 'String', default: '"top"', description: 'Position relative to target: top, bottom, left, right' }
]

const events = [
  { name: 'accept', description: 'Emitted when the accept button is clicked' },
  { name: 'reject', description: 'Emitted when the reject button is clicked or popup is dismissed' }
]

const methods = [
  { name: 'show(event)', description: 'Shows the popup positioned relative to the event target' },
  { name: 'hide()', description: 'Hides the popup' }
]

// Refs for confirm popups
const basicPopup = ref()
const topPopup = ref()
const bottomPopup = ref()
const leftPopup = ref()
const rightPopup = ref()
const noIconPopup = ref()

// Live preview
const previewStyles = ref<Record<string, string>>({})
const previewPopup = ref()

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

function handleAccept() {
  console.log('Accepted')
}

function handleReject() {
  console.log('Rejected')
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="ConfirmPopup"
      description="Inline confirmation popup that appears near the target element for quick confirmations."
    />

    <section class="demo-section">
      <h2>Basic ConfirmPopup</h2>
      <p class="section-description">A simple confirmation popup triggered by clicking a button.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicPopup?.show($event)">
          Delete Item
        </button>
      </div>

      <ConfirmPopup
        ref="basicPopup"
        message="Are you sure you want to delete this item?"
        @accept="handleAccept"
        @reject="handleReject"
      />
    </section>

    <section class="demo-section">
      <h2>Position Variants</h2>
      <p class="section-description">The popup can be positioned on any side of the target element.</p>
      <div class="demo-row">
        <button class="demo-button" @click="topPopup?.show($event)">Top</button>
        <button class="demo-button" @click="bottomPopup?.show($event)">Bottom</button>
        <button class="demo-button" @click="leftPopup?.show($event)">Left</button>
        <button class="demo-button" @click="rightPopup?.show($event)">Right</button>
      </div>

      <ConfirmPopup ref="topPopup" position="top" message="Popup above target" />
      <ConfirmPopup ref="bottomPopup" position="bottom" message="Popup below target" />
      <ConfirmPopup ref="leftPopup" position="left" message="Popup to the left" />
      <ConfirmPopup ref="rightPopup" position="right" message="Popup to the right" />
    </section>

    <section class="demo-section">
      <h2>Without Icon</h2>
      <p class="section-description">Hide the warning icon for a more minimal appearance.</p>
      <div class="demo-row">
        <button class="demo-button" @click="noIconPopup?.show($event)">
          Confirm Action
        </button>
      </div>

      <ConfirmPopup
        ref="noIconPopup"
        :show-icon="false"
        message="Proceed with this action?"
        accept-label="Proceed"
        reject-label="Cancel"
      />
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <button @click="popup?.show($event)">Delete</button>

  <ConfirmPopup
    ref="popup"
    message="Are you sure you want to delete?"
    accept-label="Delete"
    reject-label="Cancel"
    position="bottom"
    @accept="onDelete"
    @reject="onCancel"
  />
</template>

<script setup>
import { ref } from "vue"
import ConfirmPopup from "@components/ConfirmPopup/ConfirmPopup.vue"

const popup = ref()

const onDelete = () => {
  console.log("Deleted")
}

const onCancel = () => {
  console.log("Cancelled")
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

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the confirm popup tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="confirmPopup"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <button class="demo-button" @click="previewPopup?.show($event)">
              Open Preview Popup
            </button>
          </div>
        </div>
      </div>

      <ConfirmPopup
        ref="previewPopup"
        message="This popup reflects token values."
        :style="previewStyles"
      />
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
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.methods-section,
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
  gap: var(--doc-space-m);
  align-items: flex-start;
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
