<script setup lang="ts">
import MultiSelect from '@components/MultiSelect/MultiSelect.vue'
import '@components/MultiSelect/MultiSelect.scss'

const selected = ref<string[]>([])
const selectedChips = ref<string[]>(['ams', 'rtd'])

const options = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtd' },
  { label: 'Den Haag', value: 'dhg' },
  { label: 'Utrecht', value: 'utr' },
  { label: 'Eindhoven', value: 'ehv' },
  { label: 'Groningen', value: 'grn' }
]

const componentProps = [
  { name: 'modelValue', type: 'Array', default: '[]', description: 'Selected values (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options' },
  { name: 'optionLabel', type: 'String', default: '"label"', description: 'Property name for label' },
  { name: 'optionValue', type: 'String', default: '"value"', description: 'Property name for value' },
  { name: 'placeholder', type: 'String', default: '"Select..."', description: 'Placeholder text' },
  { name: 'filter', type: 'Boolean', default: 'false', description: 'Enable filtering' },
  { name: 'display', type: 'String', default: '"comma"', description: 'Display mode: comma, chip' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="MultiSelect"
      description="Multiple selection dropdown component with optional filtering and chip display."
    />

    <ComponentDemo
      name="MultiSelect"
      description="Dropdown for selecting multiple options from a list."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <MultiSelect v-model="selected" :options="options" placeholder="Kies steden" />
        </div>
        <p class="selected-value">Selected: {{ selected.length ? selected.join(', ') : 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Chip Display</h4>
        <div class="demo-row">
          <MultiSelect v-model="selectedChips" :options="options" display="chip" placeholder="Kies steden" />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Filter</h4>
        <div class="demo-row">
          <MultiSelect v-model="selected" :options="options" :filter="true" placeholder="Search and select..." />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <MultiSelect :options="options" size="sm" placeholder="Small" />
          <MultiSelect :options="options" size="md" placeholder="Medium" />
          <MultiSelect :options="options" size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <MultiSelect :options="options" placeholder="Default" />
          <MultiSelect :options="options" placeholder="Disabled" is-disabled />
          <MultiSelect :options="options" placeholder="Invalid" is-invalid />
        </div>
      </div>
    </ComponentDemo>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-l);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--doc-space-m);

  .multi-select {
    width: 250px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
