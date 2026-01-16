<script setup lang="ts">
import MegaMenu from '@components/MegaMenu/MegaMenu.vue'
import '@components/MegaMenu/MegaMenu.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, icon, url, items (columns), command, disabled properties' },
  { name: 'orientation', type: 'String', default: '"horizontal"', description: 'Menu orientation: horizontal or vertical' }
]

const events = [
  { name: 'item-click', description: 'Emitted when a menu item is clicked, payload includes originalEvent and item' }
]

// Horizontal menu model
const horizontalItems = ref([
  {
    label: 'Products',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    items: [
      {
        label: 'Software',
        items: [
          { label: 'Desktop Apps', description: 'Native applications for Mac, Windows, Linux' },
          { label: 'Mobile Apps', description: 'iOS and Android applications' },
          { label: 'Web Apps', description: 'Browser-based applications' },
          { label: 'APIs', description: 'RESTful and GraphQL APIs' }
        ]
      },
      {
        label: 'Hardware',
        items: [
          { label: 'Servers', description: 'High-performance server solutions' },
          { label: 'Storage', description: 'Enterprise storage systems' },
          { label: 'Networking', description: 'Network infrastructure' }
        ]
      },
      {
        label: 'Services',
        items: [
          { label: 'Cloud Hosting', description: 'Scalable cloud infrastructure' },
          { label: 'Managed Services', description: '24/7 managed IT services' },
          { label: 'Consulting', description: 'Expert technology consulting' }
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    items: [
      {
        label: 'By Industry',
        items: [
          { label: 'Healthcare' },
          { label: 'Finance' },
          { label: 'Education' },
          { label: 'Retail' }
        ]
      },
      {
        label: 'By Size',
        items: [
          { label: 'Enterprise' },
          { label: 'Mid-Market' },
          { label: 'Small Business' },
          { label: 'Startups' }
        ]
      }
    ]
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Learn',
        items: [
          { label: 'Documentation', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
          { label: 'Tutorials', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' },
          { label: 'Blog', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' }
        ]
      },
      {
        label: 'Support',
        items: [
          { label: 'Help Center' },
          { label: 'Community' },
          { label: 'Contact Us' }
        ]
      }
    ]
  },
  {
    label: 'Pricing',
    url: '/pricing'
  },
  {
    label: 'About',
    url: '/about'
  }
])

// Simple menu for vertical orientation
const verticalItems = ref([
  {
    label: 'Dashboard',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    url: '/dashboard'
  },
  {
    label: 'Products',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    items: [
      {
        label: 'Categories',
        items: [
          { label: 'Electronics' },
          { label: 'Clothing' },
          { label: 'Home & Garden' }
        ]
      }
    ]
  },
  {
    label: 'Settings',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    url: '/settings'
  }
])

function onItemClick({ item }: { item: any }) {
  console.log('Menu item clicked:', item.label)
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
      title="MegaMenu"
      description="Large dropdown menu with multi-column layouts, category headings, icons, and descriptions."
    />

    <section class="demo-section">
      <h2>Horizontal MegaMenu</h2>
      <p class="section-description">A navigation bar with large dropdown panels containing multiple columns.</p>
      <div class="demo-container">
        <MegaMenu
          :model="horizontalItems"
          orientation="horizontal"
          @item-click="onItemClick"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Vertical MegaMenu</h2>
      <p class="section-description">A vertical sidebar navigation with flyout panels.</p>
      <div class="demo-container demo-container--vertical">
        <MegaMenu
          :model="verticalItems"
          orientation="vertical"
          @item-click="onItemClick"
        />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <MegaMenu
    :model="items"
    orientation="horizontal"
    @item-click="onItemClick"
  />
</template>

<script setup>
import MegaMenu from "@components/MegaMenu/MegaMenu.vue"

const items = [
  {
    label: "Products",
    icon: "<svg>...</svg>",
    items: [
      {
        label: "Category 1",
        items: [
          { label: "Item 1", description: "Description text", url: "/item1" },
          { label: "Item 2", icon: "<svg>...</svg>" }
        ]
      },
      {
        label: "Category 2",
        items: [
          { label: "Item 3" },
          { label: "Item 4" }
        ]
      }
    ]
  },
  {
    label: "About",
    url: "/about"
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

    <section class="model-section">
      <h2>Menu Item Properties</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>label</code></td>
            <td><code>String</code></td>
            <td>Text label for the menu item</td>
          </tr>
          <tr>
            <td><code>icon</code></td>
            <td><code>String | Component</code></td>
            <td>Icon as HTML string or Vue component</td>
          </tr>
          <tr>
            <td><code>url</code></td>
            <td><code>String</code></td>
            <td>URL for navigation</td>
          </tr>
          <tr>
            <td><code>items</code></td>
            <td><code>Array</code></td>
            <td>Child items (columns for root items, items for categories)</td>
          </tr>
          <tr>
            <td><code>description</code></td>
            <td><code>String</code></td>
            <td>Secondary description text</td>
          </tr>
          <tr>
            <td><code>command</code></td>
            <td><code>Function</code></td>
            <td>Callback when item is clicked</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>Boolean</code></td>
            <td>Disables the menu item</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the mega menu appearance using design tokens.</p>
      <ComponentTokenEditor
        component="mega-menu"
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
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: visible;
}

.demo-container--vertical {
  max-width: 280px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.model-section,
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
