<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const navigation = [
  { path: '/', label: 'Home' },
  {
    label: 'Style Library',
    children: [
      { path: '/style-library/kleuren', label: 'Kleuren' },
      { path: '/style-library/kleuren/semantisch', label: 'Semantisch', indent: true },
      { path: '/style-library/kleuren/pallet', label: 'Pallet', indent: true },
      { path: '/style-library/typography', label: 'Typography' },
      { path: '/style-library/spacers', label: 'Spacers' },
      { path: '/style-library/radii', label: 'Radii' },
      { path: '/style-library/levitation', label: 'Levitation' },
      { path: '/style-library/icons', label: 'Icons' },
      { path: '/style-library/grid', label: 'Grid' },
      { path: '/style-library/container', label: 'Container' },
      { path: '/style-library/token-editor', label: 'Token Editor' }
    ]
  },
  {
    label: 'Components',
    children: [
      { path: '/components/avatar', label: 'Avatar' }
    ]
  }
]

const expandedGroups = ref<string[]>(['Style Library', 'Components'])

function toggleGroup(label: string) {
  const index = expandedGroups.value.indexOf(label)
  if (index === -1) {
    expandedGroups.value.push(label)
  } else {
    expandedGroups.value.splice(index, 1)
  }
}

function isExpanded(label: string) {
  return expandedGroups.value.includes(label)
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="logo">For the People</h1>
      </div>
      <nav class="nav">
        <template v-for="item in navigation" :key="item.path || item.label">
          <NuxtLink
            v-if="item.path"
            :to="item.path"
            class="nav-link"
          >
            {{ item.label }}
          </NuxtLink>
          <div v-else class="nav-group">
            <button
              class="nav-group-header"
              :class="{ 'is-expanded': isExpanded(item.label) }"
              @click="toggleGroup(item.label)"
            >
              <span>{{ item.label }}</span>
              <ChevronRight :size="16" class="chevron" />
            </button>
            <div v-if="isExpanded(item.label)" class="nav-group-items">
              <NuxtLink
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="nav-link nav-link--child"
                :class="{ 'nav-link--nested': child.indent }"
              >
                {{ child.label }}
              </NuxtLink>
              <span v-if="item.children.length === 0" class="nav-empty">
                Binnenkort beschikbaar
              </span>
            </div>
          </div>
        </template>
      </nav>
    </aside>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: var(--doc-accent);
  color: var(--doc-text-inverse);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: var(--doc-space-l);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
}

.nav {
  display: flex;
  flex-direction: column;
  padding: var(--doc-space-m) 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: var(--doc-space-s) var(--doc-space-l);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 15px;
  transition: background 0.15s, color 0.15s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 500;
}

.nav-link--child {
  padding-left: var(--doc-space-2xl);
  font-size: 14px;
}

.nav-link--nested {
  padding-left: calc(var(--doc-space-2xl) + var(--doc-space-m));
  font-size: 13px;
  opacity: 0.85;
}

.nav-link--nested::before {
  content: '\2514';
  margin-right: var(--doc-space-xs);
  opacity: 0.5;
}

.nav-group {
  margin-top: var(--doc-space-xs);
}

.nav-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--doc-space-s) var(--doc-space-l);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: color 0.15s;
}

.nav-group-header:hover {
  color: rgba(255, 255, 255, 0.9);
}

.nav-group-header .chevron {
  transition: transform 0.2s;
}

.nav-group-header.is-expanded .chevron {
  transform: rotate(90deg);
}

.nav-group-items {
  display: flex;
  flex-direction: column;
}

.nav-empty {
  padding: var(--doc-space-xs) var(--doc-space-l) var(--doc-space-xs) var(--doc-space-2xl);
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  font-style: italic;
}

.main {
  flex: 1;
  background: var(--doc-surface-muted);
  min-height: 100vh;
}
</style>
