<script setup lang="ts">
import Drawer from '@components/Drawer/Drawer.vue'
import '@components/Drawer/Drawer.scss'

const drawerProps = [
  { name: 'visible', type: 'Boolean', default: 'false', description: 'Controls drawer visibility (v-model supported)' },
  { name: 'header', type: 'String', default: '""', description: 'Title text displayed in the header' },
  { name: 'position', type: 'String', default: '"right"', description: 'Position of the drawer: left, right, top, bottom' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size of the drawer: sm, md, lg, xl' },
  { name: 'closable', type: 'Boolean', default: 'true', description: 'Whether to show the close button' },
  { name: 'dismissable', type: 'Boolean', default: 'true', description: 'Closes drawer when clicking the overlay' },
  { name: 'closeOnEscape', type: 'Boolean', default: 'true', description: 'Closes drawer when pressing Escape key' },
  { name: 'blockScroll', type: 'Boolean', default: 'true', description: 'Blocks body scroll when drawer is open' }
]

const drawerEvents = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'show', description: 'Emitted when drawer becomes visible' },
  { name: 'hide', description: 'Emitted when drawer is closed' }
]

const drawerSlots = [
  { name: 'default', description: 'Main content of the drawer' },
  { name: 'header', description: 'Custom header content (overrides header prop)' },
  { name: 'footer', description: 'Footer content, typically for action buttons' }
]

const basicVisible = ref(false)
const positionVisible = ref({ left: false, right: false, top: false, bottom: false })
const sizeVisible = ref({ sm: false, md: false, lg: false, xl: false })
const footerVisible = ref(false)
</script>

<template>
  <div class="page">
    <PageHeader
      title="Drawer"
      description="Drawer component for slide-out panels from any edge of the screen."
    />

    <section class="demo-section">
      <h2>Basic Drawer</h2>
      <p class="section-description">A simple drawer that slides in from the right.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicVisible = true">
          Open Drawer
        </button>
      </div>

      <Drawer v-model:visible="basicVisible" header="Basic Drawer">
        <p>This is a basic drawer that slides in from the right side of the screen.</p>
        <p>Click the X button, press Escape, or click the overlay to close.</p>
      </Drawer>
    </section>

    <section class="demo-section">
      <h2>Positions</h2>
      <p class="section-description">Drawers can slide in from any edge of the screen.</p>
      <div class="demo-row">
        <button class="demo-button" @click="positionVisible.left = true">Left</button>
        <button class="demo-button" @click="positionVisible.right = true">Right</button>
        <button class="demo-button" @click="positionVisible.top = true">Top</button>
        <button class="demo-button" @click="positionVisible.bottom = true">Bottom</button>
      </div>

      <Drawer v-model:visible="positionVisible.left" header="Left Drawer" position="left">
        <p>This drawer slides in from the left.</p>
      </Drawer>
      <Drawer v-model:visible="positionVisible.right" header="Right Drawer" position="right">
        <p>This drawer slides in from the right (default).</p>
      </Drawer>
      <Drawer v-model:visible="positionVisible.top" header="Top Drawer" position="top">
        <p>This drawer slides in from the top.</p>
      </Drawer>
      <Drawer v-model:visible="positionVisible.bottom" header="Bottom Drawer" position="bottom">
        <p>This drawer slides in from the bottom.</p>
      </Drawer>
    </section>

    <section class="demo-section">
      <h2>Sizes</h2>
      <p class="section-description">Four size variants are available for horizontal drawers.</p>
      <div class="demo-row">
        <button class="demo-button" @click="sizeVisible.sm = true">Small</button>
        <button class="demo-button" @click="sizeVisible.md = true">Medium</button>
        <button class="demo-button" @click="sizeVisible.lg = true">Large</button>
        <button class="demo-button" @click="sizeVisible.xl = true">XLarge</button>
      </div>

      <Drawer v-model:visible="sizeVisible.sm" header="Small Drawer" size="sm">
        <p>Small drawer (280px width).</p>
      </Drawer>
      <Drawer v-model:visible="sizeVisible.md" header="Medium Drawer" size="md">
        <p>Medium drawer (400px width).</p>
      </Drawer>
      <Drawer v-model:visible="sizeVisible.lg" header="Large Drawer" size="lg">
        <p>Large drawer (560px width).</p>
      </Drawer>
      <Drawer v-model:visible="sizeVisible.xl" header="XLarge Drawer" size="xl">
        <p>Extra large drawer (720px width).</p>
      </Drawer>
    </section>

    <section class="demo-section">
      <h2>Drawer with Footer</h2>
      <p class="section-description">Use the footer slot for action buttons.</p>
      <div class="demo-row">
        <button class="demo-button" @click="footerVisible = true">
          Open Drawer with Footer
        </button>
      </div>

      <Drawer v-model:visible="footerVisible" header="Edit Profile">
        <div class="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" class="demo-input" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" class="demo-input" />
        </div>
        <template #footer>
          <button class="demo-button demo-button--secondary" @click="footerVisible = false">
            Cancel
          </button>
          <button class="demo-button" @click="footerVisible = false">
            Save Changes
          </button>
        </template>
      </Drawer>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic drawer -->
  <button @click="visible = true">Open Drawer</button>

  <Drawer v-model:visible="visible" header="Drawer Title">
    <p>Drawer content goes here.</p>
  </Drawer>

  <!-- Drawer with position and size -->
  <Drawer
    v-model:visible="leftVisible"
    header="Left Drawer"
    position="left"
    size="lg"
  >
    <p>Large drawer from the left.</p>
  </Drawer>

  <!-- Drawer with footer -->
  <Drawer v-model:visible="formVisible" header="Edit">
    <p>Form content here.</p>
    <template #footer>
      <button @click="formVisible = false">Cancel</button>
      <button @click="onSave">Save</button>
    </template>
  </Drawer>
</template>

<script setup>
import { ref } from "vue"
import Drawer from "@components/Drawer/Drawer.vue"

const visible = ref(false)
const leftVisible = ref(false)
const formVisible = ref(false)

const onSave = () => {
  // handle save
  formVisible.value = false
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
          <tr v-for="prop in drawerProps" :key="prop.name">
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
          <tr v-for="event in drawerEvents" :key="event.name">
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
          <tr v-for="slot in drawerSlots" :key="slot.name">
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
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
}

.form-group {
  margin-bottom: var(--doc-space-m);

  label {
    display: block;
    margin-bottom: var(--doc-space-xs);
    font-weight: 500;
    font-size: 14px;
  }
}

.demo-input {
  width: 100%;
  padding: var(--doc-space-s) var(--doc-space-m);
  font-size: 14px;
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  background: var(--doc-surface-canvas);

  &:focus {
    outline: none;
    border-color: var(--doc-brand-primary);
  }
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

  &--secondary {
    color: var(--doc-text-default);
    background-color: transparent;
    border: 1px solid var(--doc-border);

    &:hover {
      background-color: var(--doc-surface-muted);
    }
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
