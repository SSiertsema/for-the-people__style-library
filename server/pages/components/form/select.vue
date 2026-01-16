<script setup lang="ts">
import Select from '@components/Select/Select.vue'
import '@components/Select/Select.scss'

const selected = ref(null)
const selectedSize = ref('md')

const options = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtd' },
  { label: 'Den Haag', value: 'dhg' },
  { label: 'Utrecht', value: 'utr' }
]

const componentProps = [
  { name: 'modelValue', type: 'Any', default: 'null', description: 'Selected value (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options' },
  { name: 'optionLabel', type: 'String', default: '"label"', description: 'Property name for label' },
  { name: 'optionValue', type: 'String', default: '"value"', description: 'Property name for value' },
  { name: 'placeholder', type: 'String', default: '-', description: 'Placeholder text' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Select"
      description="Dropdown select component for choosing from a list of options."
    />

    <ComponentDemo
      name="Select"
      description="Native select with custom styling."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Select v-model="selected" :options="options" placeholder="Kies een stad" />
        </div>
        <p class="selected-value">Selected: {{ selected || 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <Select v-model="selectedSize" :options="['sm', 'md', 'lg']" size="sm" placeholder="Small" />
          <Select v-model="selectedSize" :options="['sm', 'md', 'lg']" size="md" placeholder="Medium" />
          <Select v-model="selectedSize" :options="['sm', 'md', 'lg']" size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <Select :options="options" placeholder="Default" />
          <Select :options="options" placeholder="Disabled" is-disabled />
          <Select :options="options" placeholder="Invalid" is-invalid />
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

  .select {
    width: 200px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
