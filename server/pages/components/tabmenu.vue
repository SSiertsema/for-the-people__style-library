<script setup lang="ts">
import TabMenu from '@components/TabMenu/TabMenu.vue'
import '@components/TabMenu/TabMenu.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, url, badge, command, and disabled properties' },
  { name: 'activeIndex', type: 'Number', default: '0', description: 'Index of the currently active tab' }
]

const events = [
  { name: 'update:activeIndex', description: 'Fired when active tab changes. Supports v-model:activeIndex' },
  { name: 'tab-change', description: 'Fired when a tab is clicked. Payload: { originalEvent, item, index }' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

// Demo data
const activeIndex = ref(0)
const activeIndex2 = ref(1)

const basicItems = [
  { label: 'Dashboard' },
  { label: 'Analytics' },
  { label: 'Reports' },
  { label: 'Settings' }
]

const itemsWithIcons = [
  { label: 'Home', icon: 'pi pi-home' },
  { label: 'Calendar', icon: 'pi pi-calendar' },
  { label: 'Messages', icon: 'pi pi-envelope' },
  { label: 'Profile', icon: 'pi pi-user' }
]

const itemsWithBadges = [
  { label: 'Inbox', icon: 'pi pi-inbox', badge: '5' },
  { label: 'Notifications', icon: 'pi pi-bell', badge: '12' },
  { label: 'Tasks', icon: 'pi pi-check-square' },
  { label: 'Archive', icon: 'pi pi-folder' }
]

const itemsWithDisabled = [
  { label: 'Overview' },
  { label: 'Activity' },
  { label: 'Audit Log', disabled: true },
  { label: 'History' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="TabMenu"
      description="TabMenu is a navigation component that displays items as horizontal tabs."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">Simple tab menu with text labels. Active tab index: {{ activeIndex }}</p>
      <div class="demo-row">
        <TabMenu v-model:activeIndex="activeIndex" :model="basicItems" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Icons</h2>
      <p class="section-description">Each tab can display an icon alongside the label.</p>
      <div class="demo-row">
        <TabMenu v-model:activeIndex="activeIndex2" :model="itemsWithIcons" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Badges</h2>
      <p class="section-description">Tabs can include badges to show counts or status indicators.</p>
      <div class="demo-row">
        <TabMenu :model="itemsWithBadges" :activeIndex="0" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Disabled Items</h2>
      <p class="section-description">Individual tabs can be disabled to prevent interaction.</p>
      <div class="demo-row">
        <TabMenu :model="itemsWithDisabled" :activeIndex="0" />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <TabMenu v-model:activeIndex="activeIndex" :model="items" @tab-change="onTabChange" />
</template>

<script setup>
import { ref } from "vue"
import TabMenu from "@components/TabMenu/TabMenu.vue"
import "@components/TabMenu/TabMenu.scss"

const activeIndex = ref(0)

const items = [
  { label: "Home", icon: "pi pi-home" },
  { label: "Calendar", icon: "pi pi-calendar" },
  { label: "Messages", icon: "pi pi-envelope", badge: "3" },
  { label: "Settings", icon: "pi pi-cog" }
]

function onTabChange({ item, index }) {
  console.log("Tab changed:", item.label, index)
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
      <p class="section-description">Customize tabmenu tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="tabmenu"
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
                <TabMenu :model="basicItems" :activeIndex="0" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Icons</span>
              <div class="preview-row">
                <TabMenu :model="itemsWithIcons" :activeIndex="1" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Badges</span>
              <div class="preview-row">
                <TabMenu :model="itemsWithBadges" :activeIndex="0" />
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
  align-items: flex-start;
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
