<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

// Quick navigation
const quickNavVisible = ref(false)

function handleGlobalKeydown(event: KeyboardEvent) {
  // Ctrl+F or Cmd+F to open quick nav
  if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
    event.preventDefault()
    quickNavVisible.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const navigation = [
  { path: '/', label: 'Home' },
  { path: '/kitchen-sink', label: 'Kitchen Sink' },
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
      { path: '/style-library/container', label: 'Container' }
    ]
  },
  {
    label: 'Form',
    children: [
      { path: '/components/form/input-text', label: 'InputText' },
      { path: '/components/form/textarea', label: 'Textarea' },
      { path: '/components/form/input-number', label: 'InputNumber' },
      { path: '/components/form/input-mask', label: 'InputMask' },
      { path: '/components/form/input-otp', label: 'InputOTP' },
      { path: '/components/form/input-chips', label: 'InputChips' },
      { path: '/components/form/autocomplete', label: 'AutoComplete' },
      { path: '/components/form/calendar', label: 'Calendar' },
      { path: '/components/form/color-picker', label: 'ColorPicker' },
      { path: '/components/form/editor', label: 'Editor' },
      { path: '/components/form/checkbox', label: 'Checkbox' },
      { path: '/components/form/radio-button', label: 'RadioButton' },
      { path: '/components/form/select', label: 'Select' },
      { path: '/components/form/dropdown', label: 'Dropdown' },
      { path: '/components/form/multi-select', label: 'MultiSelect' },
      { path: '/components/form/list-box', label: 'ListBox' },
      { path: '/components/form/tree-select', label: 'TreeSelect' },
      { path: '/components/form/input-switch', label: 'InputSwitch' },
      { path: '/components/form/toggle-switch', label: 'ToggleSwitch' },
      { path: '/components/form/toggle-button', label: 'ToggleButton' },
      { path: '/components/form/select-button', label: 'SelectButton' },
      { path: '/components/form/slider', label: 'Slider' },
      { path: '/components/form/knob', label: 'Knob' },
      { path: '/components/form/rating', label: 'Rating' },
      { path: '/components/form/input-group', label: 'InputGroup' },
      { path: '/components/form/input-group-addon', label: 'InputGroupAddon' },
      { path: '/components/form/input-icon', label: 'InputIcon' }
    ]
  },
  {
    label: 'Buttons',
    children: [
      { path: '/components/button', label: 'Button' },
      { path: '/components/split-button', label: 'SplitButton' },
      { path: '/components/speed-dial', label: 'SpeedDial' }
    ]
  },
  {
    label: 'Data',
    children: [
      { path: '/components/data-table', label: 'DataTable' },
      { path: '/components/data-view', label: 'DataView' },
      { path: '/components/order-list', label: 'OrderList' },
      { path: '/components/organization-chart', label: 'OrganizationChart' },
      { path: '/components/paginator', label: 'Paginator' },
      { path: '/components/picklist', label: 'PickList' },
      { path: '/components/timeline', label: 'Timeline' },
      { path: '/components/tree', label: 'Tree' },
      { path: '/components/treetable', label: 'TreeTable' },
      { path: '/components/virtualscroller', label: 'VirtualScroller' },
      { path: '/components/column', label: 'Column' },
      { path: '/components/column-group', label: 'ColumnGroup' },
      { path: '/components/form/row', label: 'Row' }
    ]
  },
  {
    label: 'Panel',
    children: [
      { path: '/components/accordion', label: 'Accordion' },
      { path: '/components/card', label: 'Card' },
      { path: '/components/divider', label: 'Divider' },
      { path: '/components/field-set', label: 'FieldSet' },
      { path: '/components/panel', label: 'Panel' },
      { path: '/components/scroll-panel', label: 'ScrollPanel' },
      { path: '/components/splitter', label: 'Splitter' },
      { path: '/components/tabs', label: 'Tabs' },
      { path: '/components/toolbar', label: 'Toolbar' }
    ]
  },
  {
    label: 'Overlay',
    children: [
      { path: '/components/confirm-dialog', label: 'ConfirmDialog' },
      { path: '/components/confirm-popup', label: 'ConfirmPopup' },
      { path: '/components/dialog', label: 'Dialog' },
      { path: '/components/drawer', label: 'Drawer' },
      { path: '/components/overlay-panel', label: 'OverlayPanel' },
      { path: '/components/pop-over', label: 'PopOver' },
      { path: '/components/sidebar', label: 'Sidebar' },
      { path: '/components/tooltip', label: 'Tooltip' }
    ]
  },
  {
    label: 'Menu',
    children: [
      { path: '/components/breadcrumb', label: 'Breadcrumb' },
      { path: '/components/context-menu', label: 'ContextMenu' },
      { path: '/components/dock', label: 'Dock' },
      { path: '/components/mega-menu', label: 'MegaMenu' },
      { path: '/components/menu', label: 'Menu' },
      { path: '/components/menu-bar', label: 'MenuBar' },
      { path: '/components/panel-menu', label: 'PanelMenu' },
      { path: '/components/steps', label: 'Steps' },
      { path: '/components/tab-menu', label: 'TabMenu' },
      { path: '/components/tiered-menu', label: 'TieredMenu' }
    ]
  },
  {
    label: 'Messages',
    children: [
      { path: '/components/inline-message', label: 'InlineMessage' },
      { path: '/components/message', label: 'Message' },
      { path: '/components/toast', label: 'Toast' }
    ]
  },
  {
    label: 'File',
    children: [
      { path: '/components/file-upload', label: 'FileUpload' }
    ]
  },
  {
    label: 'Media',
    children: [
      { path: '/components/carousel', label: 'Carousel' },
      { path: '/components/galleria', label: 'Galleria' },
      { path: '/components/image', label: 'Image' },
      { path: '/components/image-compare', label: 'ImageCompare' }
    ]
  },
  {
    label: 'Chart',
    children: [
      { path: '/components/chart', label: 'Chart' }
    ]
  },
  {
    label: 'Misc',
    children: [
      { path: '/components/avatar', label: 'Avatar' },
      { path: '/components/badge', label: 'Badge' },
      { path: '/components/block-ui', label: 'BlockUI' },
      { path: '/components/chip', label: 'Chip' },
      { path: '/components/in-place', label: 'InPlace' },
      { path: '/components/meter-group', label: 'MeterGroup' },
      { path: '/components/progress-bar', label: 'ProgressBar' },
      { path: '/components/progress-spinner', label: 'ProgressSpinner' },
      { path: '/components/scroll-top', label: 'ScrollTop' },
      { path: '/components/skeleton', label: 'Skeleton' },
      { path: '/components/tag', label: 'Tag' },
      { path: '/components/terminal', label: 'Terminal' }
    ]
  },
  {
    label: 'Surfaces',
    children: [
      { path: '/components/atmospheric-background', label: 'AtmosphericBackground' }
    ]
  }
]

const expandedGroups = ref<string[]>(['Style Library', 'Form'])

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

    <QuickNav
      :visible="quickNavVisible"
      @close="quickNavVisible = false"
    />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: var(--doc-surface-sidebar);
  color: var(--doc-text-default);
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
  background: var(--doc-surface-page);
  min-height: 100vh;
}
</style>
