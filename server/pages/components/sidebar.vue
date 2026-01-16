<script setup lang="ts">
import Sidebar from '@components/Sidebar/Sidebar.vue'
import '@components/Sidebar/Sidebar.scss'

const sidebarProps = [
  { name: 'visible', type: 'Boolean', default: 'false', description: 'Controls sidebar visibility (v-model supported)' },
  { name: 'header', type: 'String', default: '""', description: 'Title text displayed in the header' },
  { name: 'position', type: 'String', default: '"left"', description: 'Position of the sidebar: left, right' },
  { name: 'fullScreen', type: 'Boolean', default: 'false', description: 'Whether the sidebar takes full screen width' },
  { name: 'closable', type: 'Boolean', default: 'true', description: 'Whether to show the close button' },
  { name: 'dismissable', type: 'Boolean', default: 'true', description: 'Closes sidebar when clicking the overlay' },
  { name: 'closeOnEscape', type: 'Boolean', default: 'true', description: 'Closes sidebar when pressing Escape key' },
  { name: 'blockScroll', type: 'Boolean', default: 'true', description: 'Blocks body scroll when sidebar is open' }
]

const sidebarEvents = [
  { name: 'update:visible', description: 'Emitted when visibility changes (for v-model)' },
  { name: 'show', description: 'Emitted when sidebar becomes visible' },
  { name: 'hide', description: 'Emitted when sidebar is closed' }
]

const sidebarSlots = [
  { name: 'default', description: 'Main navigation content of the sidebar' },
  { name: 'header', description: 'Custom header content (overrides header prop)' },
  { name: 'footer', description: 'Footer content area' }
]

const basicVisible = ref(false)
const rightVisible = ref(false)
const fullscreenVisible = ref(false)
const navVisible = ref(false)
</script>

<template>
  <div class="page">
    <PageHeader
      title="Sidebar"
      description="Sidebar component for navigation panels that slide in from the edge of the screen."
    />

    <section class="demo-section">
      <h2>Basic Sidebar</h2>
      <p class="section-description">A simple navigation sidebar that slides in from the left.</p>
      <div class="demo-row">
        <button class="demo-button" @click="basicVisible = true">
          Open Sidebar
        </button>
      </div>

      <Sidebar v-model:visible="basicVisible" header="Menu">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link">Dashboard</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Projects</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Settings</a>
          </li>
        </ul>
      </Sidebar>
    </section>

    <section class="demo-section">
      <h2>Right Position</h2>
      <p class="section-description">Sidebars can also slide in from the right.</p>
      <div class="demo-row">
        <button class="demo-button" @click="rightVisible = true">
          Open Right Sidebar
        </button>
      </div>

      <Sidebar v-model:visible="rightVisible" header="Settings" position="right">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link">Profile</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Preferences</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Notifications</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Security</a>
          </li>
        </ul>
      </Sidebar>
    </section>

    <section class="demo-section">
      <h2>Full Screen</h2>
      <p class="section-description">Enable fullScreen for a sidebar that covers the entire viewport.</p>
      <div class="demo-row">
        <button class="demo-button" @click="fullscreenVisible = true">
          Open Full Screen Sidebar
        </button>
      </div>

      <Sidebar v-model:visible="fullscreenVisible" header="Full Screen Menu" full-screen>
        <div class="fullscreen-nav">
          <a href="#" class="fullscreen-link">Home</a>
          <a href="#" class="fullscreen-link">About</a>
          <a href="#" class="fullscreen-link">Services</a>
          <a href="#" class="fullscreen-link">Contact</a>
        </div>
      </Sidebar>
    </section>

    <section class="demo-section">
      <h2>Navigation with Icons</h2>
      <p class="section-description">Combine with icons for a richer navigation experience.</p>
      <div class="demo-row">
        <button class="demo-button" @click="navVisible = true">
          Open Navigation
        </button>
      </div>

      <Sidebar v-model:visible="navVisible" header="Navigation">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link nav-link--with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link nav-link--with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link nav-link--with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link nav-link--with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </a>
          </li>
        </ul>
        <template #footer>
          <div class="sidebar-footer">
            <span class="user-info">Logged in as <strong>John Doe</strong></span>
          </div>
        </template>
      </Sidebar>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic sidebar -->
  <button @click="visible = true">Open Menu</button>

  <Sidebar v-model:visible="visible" header="Navigation">
    <ul class="nav-list">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </Sidebar>

  <!-- Right sidebar -->
  <Sidebar
    v-model:visible="settingsVisible"
    header="Settings"
    position="right"
  >
    <p>Settings content here.</p>
  </Sidebar>

  <!-- Full screen sidebar -->
  <Sidebar
    v-model:visible="menuVisible"
    header="Menu"
    full-screen
  >
    <nav>Full screen navigation</nav>
  </Sidebar>
</template>

<script setup>
import { ref } from "vue"
import Sidebar from "@components/Sidebar/Sidebar.vue"

const visible = ref(false)
const settingsVisible = ref(false)
const menuVisible = ref(false)
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
          <tr v-for="prop in sidebarProps" :key="prop.name">
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
          <tr v-for="event in sidebarEvents" :key="event.name">
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
          <tr v-for="slot in sidebarSlots" :key="slot.name">
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

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: block;
  padding: 12px 16px;
  color: var(--doc-text-default);
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--doc-surface-muted);
  }

  &--with-icon {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.fullscreen-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 24px;
}

.fullscreen-link {
  font-size: 24px;
  font-weight: 600;
  color: var(--doc-text-default);
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: var(--doc-brand-primary);
  }
}

.sidebar-footer {
  padding-top: 16px;
  border-top: 1px solid var(--doc-border);
}

.user-info {
  font-size: 13px;
  color: var(--doc-text-muted);
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
