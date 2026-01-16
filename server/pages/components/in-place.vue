<script setup lang="ts">
import { ref } from 'vue'
import InPlace from '@components/InPlace/InPlace.vue'
import '@components/InPlace/InPlace.scss'

const active1 = ref(false)
const active2 = ref(false)
const active3 = ref(false)
const inputValue = ref('Click to edit this text')

const props = [
  { name: 'active', type: 'Boolean', default: 'false', description: 'Controls display/edit mode (v-model supported)' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disables clicking to edit' },
  { name: 'closable', type: 'Boolean', default: 'true', description: 'Shows close button in edit mode' }
]

const events = [
  { name: 'update:active', description: 'Emitted when active state changes (for v-model)' },
  { name: 'open', description: 'Emitted when switching to edit mode' },
  { name: 'close', description: 'Emitted when switching back to display mode' }
]

const slots = [
  { name: 'display', description: 'Content shown in display mode (click to edit)' },
  { name: 'content', description: 'Content shown in edit mode. Receives { close } function as slot prop' },
  { name: 'default', description: 'Alternative to content slot for edit mode content' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InPlace"
      description="A click-to-edit component that switches between display and edit modes."
    />

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="section-description">Click the text to switch to edit mode.</p>
      <div class="demo-box">
        <InPlace v-model:active="active1">
          <template #display>
            <span class="display-text">{{ inputValue || 'Click to edit' }}</span>
          </template>
          <template #content="{ close }">
            <input
              v-model="inputValue"
              type="text"
              class="edit-input"
              @keydown.enter="close"
              autofocus
            />
          </template>
        </InPlace>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Close Button</h2>
      <p class="section-description">Edit mode without the close button - use Enter or blur to save.</p>
      <div class="demo-box">
        <InPlace v-model:active="active2" :closable="false">
          <template #display>
            <span class="display-text">Status: Active</span>
          </template>
          <template #content>
            <select class="edit-select" @change="active2 = false">
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </template>
        </InPlace>
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled State</h2>
      <p class="section-description">Disabled InPlace cannot be activated.</p>
      <div class="demo-box">
        <InPlace :disabled="true">
          <template #display>
            <span class="display-text display-text--disabled">Cannot edit (disabled)</span>
          </template>
          <template #content>
            <input type="text" class="edit-input" />
          </template>
        </InPlace>
      </div>
    </section>

    <section class="demo-section">
      <h2>Rich Content</h2>
      <p class="section-description">InPlace can contain any content, not just text inputs.</p>
      <div class="demo-box">
        <InPlace v-model:active="active3">
          <template #display>
            <div class="rich-display">
              <span class="rich-label">Profile Image</span>
              <div class="avatar-placeholder">AB</div>
            </div>
          </template>
          <template #content="{ close }">
            <div class="rich-edit">
              <input type="file" accept="image/*" />
              <button class="save-button" @click="close">Save</button>
            </div>
          </template>
        </InPlace>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic text editing -->
  <InPlace v-model:active="isEditing">
    <template #display>
      <span>{{ text || &apos;Click to edit&apos; }}</span>
    </template>
    <template #content="{ close }">
      <input v-model="text" @keydown.enter="close" />
    </template>
  </InPlace>

  <!-- Without close button -->
  <InPlace :closable="false">
    <template #display>Click me</template>
    <template #content>Edit content here</template>
  </InPlace>

  <!-- Disabled -->
  <InPlace :disabled="true">
    <template #display>Cannot edit</template>
    <template #content>Never shown</template>
  </InPlace>
</template>

<script setup>
import { ref } from "vue"
import InPlace from "@components/InPlace/InPlace.vue"
import "@components/InPlace/InPlace.scss"

const isEditing = ref(false)
const text = ref("Hello World")
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

.display-text {
  font-size: 16px;

  &--disabled {
    opacity: 0.5;
  }
}

.edit-input {
  padding: var(--doc-space-xs) var(--doc-space-s);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  font-size: 16px;
  min-width: 200px;

  &:focus {
    outline: 2px solid var(--brand-primary, #3b82f6);
    outline-offset: 2px;
  }
}

.edit-select {
  padding: var(--doc-space-xs) var(--doc-space-s);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  font-size: 16px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--brand-primary, #3b82f6);
    outline-offset: 2px;
  }
}

.rich-display {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
}

.rich-label {
  font-weight: 500;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--brand-primary, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.rich-edit {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
}

.save-button {
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: var(--brand-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
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
