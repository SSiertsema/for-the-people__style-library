<script setup lang="ts">
import Dropdown from '@components/Dropdown/Dropdown.vue'
import '@components/Dropdown/Dropdown.scss'

const basicValue = ref(null)
const filterValue = ref(null)
const objectValue = ref(null)
const sizeValue = ref(null)

const cities = ['Amsterdam', 'Berlin', 'London', 'Madrid', 'Paris', 'Rome', 'Vienna', 'Warsaw']

const countries = [
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Japan', code: 'JP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'US' }
]

const componentProps = [
  { name: 'modelValue', type: 'String | Number | Object', default: 'null', description: 'Selected value (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options to display' },
  { name: 'optionLabel', type: 'String', default: '"label"', description: 'Property name for option label' },
  { name: 'optionValue', type: 'String', default: '"value"', description: 'Property name for option value' },
  { name: 'filter', type: 'Boolean', default: 'false', description: 'Show filter input in dropdown' },
  { name: 'placeholder', type: 'String', default: '"Select an option"', description: 'Placeholder text' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Dropdown"
      description="Enhanced select component with search and custom styling."
    />

    <ComponentDemo
      name="Dropdown"
      description="A dropdown/select component with optional filtering."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Dropdown v-model="basicValue" :options="cities" placeholder="Select a city" />
        </div>
        <p class="demo-hint">Selected: {{ basicValue || '(none)' }}</p>
      </div>

      <div class="demo-section">
        <h4>With Filter</h4>
        <div class="demo-row">
          <Dropdown
            v-model="filterValue"
            :options="cities"
            filter
            placeholder="Search cities..."
          />
        </div>
        <p class="demo-hint">Type to filter options</p>
      </div>

      <div class="demo-section">
        <h4>Object Options</h4>
        <div class="demo-row">
          <Dropdown
            v-model="objectValue"
            :options="countries"
            option-label="name"
            option-value="code"
            filter
            placeholder="Select a country"
          />
        </div>
        <p class="demo-hint">Selected code: {{ objectValue || '(none)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <Dropdown v-model="sizeValue" :options="cities" size="sm" placeholder="Small" />
          <Dropdown v-model="sizeValue" :options="cities" size="md" placeholder="Medium" />
          <Dropdown v-model="sizeValue" :options="cities" size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row demo-row--column">
          <Dropdown :options="cities" placeholder="Default" />
          <Dropdown :options="cities" is-disabled placeholder="Disabled" />
          <Dropdown :options="cities" is-invalid placeholder="Invalid" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Preselected Value</h4>
        <div class="demo-row">
          <Dropdown :options="cities" model-value="Paris" placeholder="Select a city" />
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
  align-items: center;
  gap: var(--doc-space-m);
  max-width: 400px;
}

.demo-row--column {
  flex-direction: column;
  align-items: stretch;
}

.demo-hint {
  margin-top: var(--doc-space-xs);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
