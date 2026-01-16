<script setup lang="ts">
import { Search } from 'lucide-vue-next'

interface NavItem {
  path: string
  label: string
  category?: string
}

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Flattened navigation items for searching
const allPages: NavItem[] = [
  { path: '/', label: 'Home', category: 'Home' },
  // Style Library
  { path: '/style-library/kleuren', label: 'Kleuren', category: 'Style Library' },
  { path: '/style-library/kleuren/semantisch', label: 'Semantisch', category: 'Style Library' },
  { path: '/style-library/kleuren/pallet', label: 'Pallet', category: 'Style Library' },
  { path: '/style-library/typography', label: 'Typography', category: 'Style Library' },
  { path: '/style-library/spacers', label: 'Spacers', category: 'Style Library' },
  { path: '/style-library/radii', label: 'Radii', category: 'Style Library' },
  { path: '/style-library/levitation', label: 'Levitation', category: 'Style Library' },
  { path: '/style-library/icons', label: 'Icons', category: 'Style Library' },
  { path: '/style-library/grid', label: 'Grid', category: 'Style Library' },
  { path: '/style-library/container', label: 'Container', category: 'Style Library' },
  // Form
  { path: '/components/form/input-text', label: 'InputText', category: 'Form' },
  { path: '/components/form/textarea', label: 'Textarea', category: 'Form' },
  { path: '/components/form/input-number', label: 'InputNumber', category: 'Form' },
  { path: '/components/form/input-mask', label: 'InputMask', category: 'Form' },
  { path: '/components/form/input-otp', label: 'InputOTP', category: 'Form' },
  { path: '/components/form/input-chips', label: 'InputChips', category: 'Form' },
  { path: '/components/form/autocomplete', label: 'AutoComplete', category: 'Form' },
  { path: '/components/form/calendar', label: 'Calendar', category: 'Form' },
  { path: '/components/form/color-picker', label: 'ColorPicker', category: 'Form' },
  { path: '/components/form/editor', label: 'Editor', category: 'Form' },
  { path: '/components/form/checkbox', label: 'Checkbox', category: 'Form' },
  { path: '/components/form/radio-button', label: 'RadioButton', category: 'Form' },
  { path: '/components/form/select', label: 'Select', category: 'Form' },
  { path: '/components/form/dropdown', label: 'Dropdown', category: 'Form' },
  { path: '/components/form/multi-select', label: 'MultiSelect', category: 'Form' },
  { path: '/components/form/list-box', label: 'ListBox', category: 'Form' },
  { path: '/components/form/tree-select', label: 'TreeSelect', category: 'Form' },
  { path: '/components/form/input-switch', label: 'InputSwitch', category: 'Form' },
  { path: '/components/form/toggle-switch', label: 'ToggleSwitch', category: 'Form' },
  { path: '/components/form/toggle-button', label: 'ToggleButton', category: 'Form' },
  { path: '/components/form/select-button', label: 'SelectButton', category: 'Form' },
  { path: '/components/form/slider', label: 'Slider', category: 'Form' },
  { path: '/components/form/knob', label: 'Knob', category: 'Form' },
  { path: '/components/form/rating', label: 'Rating', category: 'Form' },
  { path: '/components/form/input-group', label: 'InputGroup', category: 'Form' },
  { path: '/components/form/input-group-addon', label: 'InputGroupAddon', category: 'Form' },
  { path: '/components/form/input-icon', label: 'InputIcon', category: 'Form' },
  // Buttons
  { path: '/components/button', label: 'Button', category: 'Buttons' },
  { path: '/components/split-button', label: 'SplitButton', category: 'Buttons' },
  { path: '/components/speed-dial', label: 'SpeedDial', category: 'Buttons' },
  // Data
  { path: '/components/data-table', label: 'DataTable', category: 'Data' },
  { path: '/components/data-view', label: 'DataView', category: 'Data' },
  { path: '/components/order-list', label: 'OrderList', category: 'Data' },
  { path: '/components/organization-chart', label: 'OrganizationChart', category: 'Data' },
  { path: '/components/paginator', label: 'Paginator', category: 'Data' },
  { path: '/components/picklist', label: 'PickList', category: 'Data' },
  { path: '/components/timeline', label: 'Timeline', category: 'Data' },
  { path: '/components/tree', label: 'Tree', category: 'Data' },
  { path: '/components/treetable', label: 'TreeTable', category: 'Data' },
  { path: '/components/virtualscroller', label: 'VirtualScroller', category: 'Data' },
  { path: '/components/column', label: 'Column', category: 'Data' },
  { path: '/components/column-group', label: 'ColumnGroup', category: 'Data' },
  { path: '/components/form/row', label: 'Row', category: 'Data' },
  // Panel
  { path: '/components/accordion', label: 'Accordion', category: 'Panel' },
  { path: '/components/card', label: 'Card', category: 'Panel' },
  { path: '/components/divider', label: 'Divider', category: 'Panel' },
  { path: '/components/field-set', label: 'FieldSet', category: 'Panel' },
  { path: '/components/panel', label: 'Panel', category: 'Panel' },
  { path: '/components/scroll-panel', label: 'ScrollPanel', category: 'Panel' },
  { path: '/components/splitter', label: 'Splitter', category: 'Panel' },
  { path: '/components/tabs', label: 'Tabs', category: 'Panel' },
  { path: '/components/toolbar', label: 'Toolbar', category: 'Panel' },
  // Overlay
  { path: '/components/confirm-dialog', label: 'ConfirmDialog', category: 'Overlay' },
  { path: '/components/confirm-popup', label: 'ConfirmPopup', category: 'Overlay' },
  { path: '/components/dialog', label: 'Dialog', category: 'Overlay' },
  { path: '/components/drawer', label: 'Drawer', category: 'Overlay' },
  { path: '/components/overlay-panel', label: 'OverlayPanel', category: 'Overlay' },
  { path: '/components/pop-over', label: 'PopOver', category: 'Overlay' },
  { path: '/components/sidebar', label: 'Sidebar', category: 'Overlay' },
  { path: '/components/tooltip', label: 'Tooltip', category: 'Overlay' },
  // Menu
  { path: '/components/breadcrumb', label: 'Breadcrumb', category: 'Menu' },
  { path: '/components/context-menu', label: 'ContextMenu', category: 'Menu' },
  { path: '/components/dock', label: 'Dock', category: 'Menu' },
  { path: '/components/mega-menu', label: 'MegaMenu', category: 'Menu' },
  { path: '/components/menu', label: 'Menu', category: 'Menu' },
  { path: '/components/menu-bar', label: 'MenuBar', category: 'Menu' },
  { path: '/components/panel-menu', label: 'PanelMenu', category: 'Menu' },
  { path: '/components/steps', label: 'Steps', category: 'Menu' },
  { path: '/components/tab-menu', label: 'TabMenu', category: 'Menu' },
  { path: '/components/tiered-menu', label: 'TieredMenu', category: 'Menu' },
  // Messages
  { path: '/components/inline-message', label: 'InlineMessage', category: 'Messages' },
  { path: '/components/message', label: 'Message', category: 'Messages' },
  { path: '/components/toast', label: 'Toast', category: 'Messages' },
  // File
  { path: '/components/file-upload', label: 'FileUpload', category: 'File' },
  // Media
  { path: '/components/carousel', label: 'Carousel', category: 'Media' },
  { path: '/components/galleria', label: 'Galleria', category: 'Media' },
  { path: '/components/image', label: 'Image', category: 'Media' },
  { path: '/components/image-compare', label: 'ImageCompare', category: 'Media' },
  // Chart
  { path: '/components/chart', label: 'Chart', category: 'Chart' },
  // Misc
  { path: '/components/avatar', label: 'Avatar', category: 'Misc' },
  { path: '/components/badge', label: 'Badge', category: 'Misc' },
  { path: '/components/block-ui', label: 'BlockUI', category: 'Misc' },
  { path: '/components/chip', label: 'Chip', category: 'Misc' },
  { path: '/components/in-place', label: 'InPlace', category: 'Misc' },
  { path: '/components/meter-group', label: 'MeterGroup', category: 'Misc' },
  { path: '/components/progress-bar', label: 'ProgressBar', category: 'Misc' },
  { path: '/components/progress-spinner', label: 'ProgressSpinner', category: 'Misc' },
  { path: '/components/scroll-top', label: 'ScrollTop', category: 'Misc' },
  { path: '/components/skeleton', label: 'Skeleton', category: 'Misc' },
  { path: '/components/tag', label: 'Tag', category: 'Misc' },
  { path: '/components/terminal', label: 'Terminal', category: 'Misc' }
]

const filteredPages = computed(() => {
  if (!searchQuery.value.trim()) {
    return allPages
  }

  const query = searchQuery.value.toLowerCase()
  return allPages.filter(page =>
    page.label.toLowerCase().includes(query) ||
    page.category?.toLowerCase().includes(query) ||
    page.path.toLowerCase().includes(query)
  )
})

// Reset selection when filtered results change
watch(filteredPages, () => {
  selectedIndex.value = 0
})

// Focus input when modal opens
watch(() => props.visible, (visible) => {
  if (visible) {
    searchQuery.value = ''
    selectedIndex.value = 0
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredPages.value.length - 1)
      scrollSelectedIntoView()
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      scrollSelectedIntoView()
      break
    case 'Enter':
      event.preventDefault()
      if (filteredPages.value[selectedIndex.value]) {
        navigateToPage(filteredPages.value[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      emit('close')
      break
  }
}

function scrollSelectedIntoView() {
  nextTick(() => {
    const selected = document.querySelector('.quick-nav__item--selected')
    selected?.scrollIntoView({ block: 'nearest' })
  })
}

function navigateToPage(page: NavItem) {
  router.push(page.path)
  emit('close')
}

function handleOverlayClick(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('quick-nav__overlay')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="quick-nav-fade">
      <div
        v-if="visible"
        class="quick-nav__overlay"
        @click="handleOverlayClick"
        @keydown="handleKeydown"
      >
        <div class="quick-nav">
          <div class="quick-nav__search">
            <Search :size="18" class="quick-nav__search-icon" />
            <input
              ref="inputRef"
              v-model="searchQuery"
              type="text"
              class="quick-nav__input"
              placeholder="Search pages..."
              @keydown="handleKeydown"
            />
            <kbd class="quick-nav__kbd">esc</kbd>
          </div>

          <div class="quick-nav__results">
            <div
              v-for="(page, index) in filteredPages"
              :key="page.path"
              class="quick-nav__item"
              :class="{ 'quick-nav__item--selected': index === selectedIndex }"
              @click="navigateToPage(page)"
              @mouseenter="selectedIndex = index"
            >
              <span class="quick-nav__item-label">{{ page.label }}</span>
              <span class="quick-nav__item-category">{{ page.category }}</span>
            </div>

            <div v-if="filteredPages.length === 0" class="quick-nav__empty">
              No pages found for "{{ searchQuery }}"
            </div>
          </div>

          <div class="quick-nav__footer">
            <span><kbd>↑↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.quick-nav__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  z-index: 9999;
}

.quick-nav {
  width: 100%;
  max-width: 560px;
  background: var(--doc-surface-card, #fff);
  border-radius: var(--doc-radius-l, 12px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.quick-nav__search {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s, 10px);
  padding: var(--doc-space-m, 16px);
  border-bottom: 1px solid var(--doc-border, #e5e5e5);
}

.quick-nav__search-icon {
  color: var(--doc-text-muted, #737373);
  flex-shrink: 0;
}

.quick-nav__input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--doc-text-default, #171717);
  outline: none;
}

.quick-nav__input::placeholder {
  color: var(--doc-text-muted, #a3a3a3);
}

.quick-nav__kbd {
  padding: 2px 6px;
  background: var(--doc-surface-muted, #f5f5f5);
  border: 1px solid var(--doc-border, #e5e5e5);
  border-radius: 4px;
  font-family: inherit;
  font-size: 11px;
  color: var(--doc-text-muted, #737373);
}

.quick-nav__results {
  max-height: 400px;
  overflow-y: auto;
}

.quick-nav__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--doc-space-s, 10px) var(--doc-space-m, 16px);
  cursor: pointer;
  transition: background 0.1s;
}

.quick-nav__item:hover,
.quick-nav__item--selected {
  background: var(--doc-surface-muted, #f5f5f5);
}

.quick-nav__item--selected {
  background: var(--doc-accent-subtle, #eff6ff);
}

.quick-nav__item-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--doc-text-default, #171717);
}

.quick-nav__item-category {
  font-size: 12px;
  color: var(--doc-text-muted, #737373);
}

.quick-nav__empty {
  padding: var(--doc-space-xl, 42px) var(--doc-space-m, 16px);
  text-align: center;
  color: var(--doc-text-muted, #737373);
}

.quick-nav__footer {
  display: flex;
  gap: var(--doc-space-l, 26px);
  padding: var(--doc-space-s, 10px) var(--doc-space-m, 16px);
  border-top: 1px solid var(--doc-border, #e5e5e5);
  background: var(--doc-surface-muted, #f5f5f5);
  font-size: 12px;
  color: var(--doc-text-muted, #737373);
}

.quick-nav__footer kbd {
  padding: 2px 5px;
  background: var(--doc-surface-card, #fff);
  border: 1px solid var(--doc-border, #d4d4d4);
  border-radius: 3px;
  font-family: inherit;
  font-size: 11px;
}

/* Transitions */
.quick-nav-fade-enter-active,
.quick-nav-fade-leave-active {
  transition: opacity 0.15s ease;
}

.quick-nav-fade-enter-active .quick-nav,
.quick-nav-fade-leave-active .quick-nav {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.quick-nav-fade-enter-from,
.quick-nav-fade-leave-to {
  opacity: 0;
}

.quick-nav-fade-enter-from .quick-nav,
.quick-nav-fade-leave-to .quick-nav {
  transform: scale(0.95);
  opacity: 0;
}
</style>
