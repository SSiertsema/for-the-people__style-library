<script setup lang="ts">
import PopOver from '@components/PopOver/PopOver.vue'
import '@components/PopOver/PopOver.scss'

const props = [
  { name: 'visible', type: 'Boolean', default: 'undefined', description: 'Controls popover visibility (v-model supported). If not provided, uses internal state.' },
  { name: 'trigger', type: 'String', default: '"hover"', description: 'Trigger mode: hover or click' },
  { name: 'position', type: 'String', default: '"top"', description: 'Position relative to trigger: top, bottom, left, right' },
  { name: 'showDelay', type: 'Number', default: '0', description: 'Delay in ms before showing the popover' },
  { name: 'hideDelay', type: 'Number', default: '0', description: 'Delay in ms before hiding the popover' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disables the popover' }
]

const events = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'show', description: 'Emitted when popover becomes visible' },
  { name: 'hide', description: 'Emitted when popover is hidden' }
]

const slots = [
  { name: 'trigger', description: 'The element that triggers the popover' },
  { name: 'default', description: 'Content of the popover' }
]

const methods = [
  { name: 'show(event)', description: 'Programmatically shows the popover' },
  { name: 'hide()', description: 'Programmatically hides the popover' },
  { name: 'toggle(event)', description: 'Toggles the popover visibility' }
]

// Live preview
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="PopOver"
      description="Content popup that appears on hover or click, displaying additional information or actions."
    />

    <section class="demo-section">
      <h2>Hover Trigger (Default)</h2>
      <p class="section-description">The popover appears when hovering over the trigger element.</p>
      <div class="demo-row">
        <PopOver>
          <template #trigger>
            <button class="demo-button">Hover Me</button>
          </template>
          <div class="popover-content">
            <strong>Popover Title</strong>
            <p>This is some helpful information that appears on hover.</p>
          </div>
        </PopOver>
      </div>
    </section>

    <section class="demo-section">
      <h2>Click Trigger</h2>
      <p class="section-description">The popover appears when clicking the trigger element.</p>
      <div class="demo-row">
        <PopOver trigger="click">
          <template #trigger>
            <button class="demo-button">Click Me</button>
          </template>
          <div class="popover-content">
            <strong>Click-triggered Popover</strong>
            <p>Click anywhere outside to dismiss.</p>
          </div>
        </PopOver>
      </div>
    </section>

    <section class="demo-section">
      <h2>Position Variants</h2>
      <p class="section-description">The popover can be positioned on any side of the trigger.</p>
      <div class="demo-row">
        <PopOver position="top">
          <template #trigger>
            <button class="demo-button">Top</button>
          </template>
          <div class="popover-content">Positioned above</div>
        </PopOver>

        <PopOver position="bottom">
          <template #trigger>
            <button class="demo-button">Bottom</button>
          </template>
          <div class="popover-content">Positioned below</div>
        </PopOver>

        <PopOver position="left">
          <template #trigger>
            <button class="demo-button">Left</button>
          </template>
          <div class="popover-content">Positioned left</div>
        </PopOver>

        <PopOver position="right">
          <template #trigger>
            <button class="demo-button">Right</button>
          </template>
          <div class="popover-content">Positioned right</div>
        </PopOver>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Delay</h2>
      <p class="section-description">Add show and hide delays for a smoother experience.</p>
      <div class="demo-row">
        <PopOver :show-delay="300" :hide-delay="200">
          <template #trigger>
            <button class="demo-button">Delayed Popover</button>
          </template>
          <div class="popover-content">
            <p>300ms show delay, 200ms hide delay</p>
          </div>
        </PopOver>
      </div>
    </section>

    <section class="demo-section">
      <h2>Rich Content</h2>
      <p class="section-description">Popovers can contain any rich content including forms and buttons.</p>
      <div class="demo-row">
        <PopOver trigger="click" position="bottom">
          <template #trigger>
            <button class="demo-button">User Menu</button>
          </template>
          <div class="popover-menu">
            <div class="popover-menu__item">Profile</div>
            <div class="popover-menu__item">Settings</div>
            <div class="popover-menu__item">Help</div>
            <div class="popover-menu__divider" />
            <div class="popover-menu__item popover-menu__item--danger">Sign Out</div>
          </div>
        </PopOver>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Hover trigger (default) -->
  <PopOver>
    <template #trigger>
      <button>Hover me</button>
    </template>
    <div>Popover content here</div>
  </PopOver>

  <!-- Click trigger -->
  <PopOver trigger="click" position="bottom">
    <template #trigger>
      <button>Click me</button>
    </template>
    <div>Click to dismiss</div>
  </PopOver>

  <!-- Controlled mode with v-model -->
  <PopOver v-model:visible="isOpen">
    <template #trigger>
      <button>Controlled</button>
    </template>
    <div>Controlled popover</div>
  </PopOver>
</template>

<script setup>
import { ref } from "vue"
import PopOver from "@components/PopOver/PopOver.vue"

const isOpen = ref(false)
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
      <p class="section-description">Customize the popover tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="popover"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <PopOver>
              <template #trigger>
                <button class="demo-button">Hover for Preview</button>
              </template>
              <div class="popover-content">
                <strong>Token Preview</strong>
                <p>This popover reflects the token values.</p>
              </div>
            </PopOver>
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

.popover-content {
  min-width: 150px;

  strong {
    display: block;
    margin-bottom: var(--doc-space-xs);
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.popover-menu {
  min-width: 160px;
  margin: calc(-1 * var(--doc-space-s)) calc(-1 * var(--doc-space-m));

  &__item {
    padding: var(--doc-space-s) var(--doc-space-m);
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--doc-surface-muted);
    }

    &--danger {
      color: var(--doc-danger, #dc2626);
    }
  }

  &__divider {
    height: 1px;
    background-color: var(--doc-border);
    margin: var(--doc-space-xs) 0;
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
