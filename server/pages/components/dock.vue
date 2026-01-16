<script setup lang="ts">
import Dock from '@components/Dock/Dock.vue'
import '@components/Dock/Dock.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of dock items with label, icon, command, active, disabled properties' },
  { name: 'position', type: 'String', default: '"bottom"', description: 'Position of the dock: top, bottom, left, right' },
  { name: 'magnification', type: 'Boolean', default: 'true', description: 'Enable magnification effect on hover' },
  { name: 'magnificationScale', type: 'Number', default: '1.5', description: 'Scale factor for magnification' },
  { name: 'showTooltips', type: 'Boolean', default: 'true', description: 'Show tooltips on hover' }
]

const events = [
  { name: 'item-click', description: 'Emitted when a dock item is clicked, payload includes originalEvent and item' }
]

// Demo items
const dockItems = ref([
  {
    label: 'Finder',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    active: true
  },
  {
    label: 'Safari',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>'
  },
  {
    label: 'Mail',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  },
  {
    label: 'Calendar',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  },
  {
    label: 'Notes',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    active: true
  },
  {
    label: 'Messages',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  },
  {
    label: 'Settings',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  }
])

// Position demo
const currentPosition = ref('bottom')

function onItemClick({ item }: { item: any }) {
  console.log('Dock item clicked:', item.label)
}

// Live preview
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Dock"
      description="macOS-style dock menu with magnification effect, tooltips, and active indicators."
    />

    <section class="demo-section">
      <h2>Basic Dock</h2>
      <p class="section-description">A bottom-positioned dock with magnification and tooltips.</p>
      <div class="demo-container demo-container--tall">
        <Dock
          :model="dockItems"
          position="bottom"
          @item-click="onItemClick"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Position Variants</h2>
      <p class="section-description">The dock can be positioned on any edge of its container.</p>
      <div class="position-controls">
        <button
          v-for="pos in ['top', 'bottom', 'left', 'right']"
          :key="pos"
          class="demo-button"
          :class="{ 'demo-button--active': currentPosition === pos }"
          @click="currentPosition = pos"
        >
          {{ pos }}
        </button>
      </div>
      <div class="demo-container demo-container--tall">
        <Dock
          :model="dockItems.slice(0, 5)"
          :position="currentPosition"
          @item-click="onItemClick"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Magnification</h2>
      <p class="section-description">Disable the magnification effect for a simpler appearance.</p>
      <div class="demo-container demo-container--tall">
        <Dock
          :model="dockItems.slice(0, 5)"
          position="bottom"
          :magnification="false"
          @item-click="onItemClick"
        />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <Dock
    :model="items"
    position="bottom"
    :magnification="true"
    :magnification-scale="1.5"
    :show-tooltips="true"
    @item-click="onItemClick"
  />
</template>

<script setup>
import Dock from "@components/Dock/Dock.vue"

const items = [
  {
    label: "Home",
    icon: "<svg>...</svg>",
    active: true,
    command: ({ item }) => console.log(item)
  },
  {
    label: "Search",
    icon: "<svg>...</svg>"
  },
  {
    label: "Settings",
    icon: "<svg>...</svg>",
    disabled: true
  }
]

function onItemClick({ item }) {
  console.log("Clicked:", item.label)
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
      <p class="section-description">Customize the dock appearance using design tokens.</p>
      <ComponentTokenEditor
        component="dock"
        @tokens-changed="handleTokensChanged"
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

.demo-container {
  position: relative;
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.demo-container--tall {
  min-height: 250px;
}

.position-controls {
  display: flex;
  gap: var(--doc-space-s);
  margin-bottom: var(--doc-space-m);
}

.demo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--doc-space-xs) var(--doc-space-m);
  font-size: 13px;
  font-weight: 500;
  color: var(--doc-text-default);
  background-color: var(--doc-surface-muted);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  text-transform: capitalize;

  &:hover {
    background-color: var(--doc-surface-panel);
  }

  &--active {
    background-color: var(--doc-brand-primary, #1a365d);
    border-color: var(--doc-brand-primary, #1a365d);
    color: white;
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
