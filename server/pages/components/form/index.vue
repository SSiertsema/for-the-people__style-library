<script setup lang="ts">
import { CheckSquare, Circle, ChevronDown, Hash, ToggleLeft, SlidersHorizontal, Group, SquarePlus, Type, TableRows } from 'lucide-vue-next'

const formComponents = [
  { name: 'Checkbox', path: '/components/form/checkbox', icon: CheckSquare, description: 'Boolean selection' },
  { name: 'RadioButton', path: '/components/form/radio-button', icon: Circle, description: 'Single selection from group' },
  { name: 'Select', path: '/components/form/select', icon: ChevronDown, description: 'Dropdown selection' },
  { name: 'InputNumber', path: '/components/form/input-number', icon: Hash, description: 'Numeric input with controls' },
  { name: 'InputSwitch', path: '/components/form/input-switch', icon: ToggleLeft, description: 'Toggle switch' },
  { name: 'Slider', path: '/components/form/slider', icon: SlidersHorizontal, description: 'Range slider input' },
  { name: 'InputGroup', path: '/components/form/input-group', icon: Group, description: 'Group inputs with addons' },
  { name: 'InputGroupAddon', path: '/components/form/input-group-addon', icon: SquarePlus, description: 'Addon for InputGroup' },
  { name: 'InputIcon', path: '/components/form/input-icon', icon: Type, description: 'Icon wrapper for inputs' },
  { name: 'Row', path: '/components/form/row', icon: TableRows, description: 'Row template for tables' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Form Components"
      description="Form input components for collecting user data."
    />

    <div class="component-grid">
      <NuxtLink
        v-for="comp in formComponents"
        :key="comp.path"
        :to="comp.path"
        class="component-card"
      >
        <div class="card-icon">
          <component :is="comp.icon" :size="24" />
        </div>
        <div class="card-content">
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--doc-space-m);
}

.component-card {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  padding: var(--doc-space-l);
  background: var(--doc-surface-card);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    border-color: var(--doc-accent);
    box-shadow: var(--doc-shadow-s);
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--doc-accent-light);
    color: var(--doc-accent);
    border-radius: var(--doc-radius-m);
    flex-shrink: 0;
  }

  .card-content {
    flex: 1;
  }

  h3 {
    margin: 0 0 var(--doc-space-2xs);
    font-size: 16px;
    color: var(--doc-text-default);
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}
</style>
