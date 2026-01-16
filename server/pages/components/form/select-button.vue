<script setup lang="ts">
import SelectButton from '@components/SelectButton/SelectButton.vue'
import '@components/SelectButton/SelectButton.scss'

// Single selection
const selectedValue = ref('option1')
const singleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

// Multiple selection
const selectedMultiple = ref(['vue'])
const multipleOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]

// With disabled option
const selectedWithDisabled = ref('small')
const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium', disabled: true },
  { label: 'Large', value: 'large' }
]

// Disabled component
const disabledValue = ref('active')
const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

// Simple string options
const selectedDay = ref('Mon')
const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const componentProps = [
  { name: 'modelValue', type: 'String | Number | Object | Array', default: 'null', description: 'Selected value(s) (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options to display' },
  { name: 'optionLabel', type: 'String | Function', default: 'null', description: 'Property name or function to get the label from an option' },
  { name: 'optionValue', type: 'String | Function', default: 'null', description: 'Property name or function to get the value from an option' },
  { name: 'optionDisabled', type: 'String | Function', default: 'null', description: 'Property name or function to determine if option is disabled' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allows selecting multiple options' },
  { name: 'allowEmpty', type: 'Boolean', default: 'true', description: 'Allows deselecting all options' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disables the entire component' },
  { name: 'ariaLabel', type: 'String', default: '"Select button group"', description: 'Aria label for accessibility' }
]

const componentEvents = [
  { name: 'update:modelValue', description: 'Emitted when selection changes' },
  { name: 'change', description: 'Emitted with { originalEvent, value } when selection changes' }
]

const componentSlots = [
  { name: 'option', description: 'Custom content for option button. Receives { option, index, selected }' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="SelectButton"
      description="A group of toggle buttons that allows single or multiple selection from a set of options."
    />

    <ComponentDemo
      name="SelectButton"
      description="SelectButton provides a set of mutually exclusive or multi-selectable options as toggle buttons."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic (Single Select)</h4>
        <div class="demo-row">
          <SelectButton
            v-model="selectedValue"
            :options="singleOptions"
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="demo-value">Selected: {{ selectedValue }}</div>
      </div>

      <div class="demo-section">
        <h4>Multiple Selection</h4>
        <div class="demo-row">
          <SelectButton
            v-model="selectedMultiple"
            :options="multipleOptions"
            option-label="label"
            option-value="value"
            multiple
          />
        </div>
        <div class="demo-value">Selected: {{ selectedMultiple.join(', ') || 'none' }}</div>
      </div>

      <div class="demo-section">
        <h4>Simple String Options</h4>
        <div class="demo-row">
          <SelectButton
            v-model="selectedDay"
            :options="dayOptions"
          />
        </div>
        <div class="demo-value">Selected: {{ selectedDay }}</div>
      </div>

      <div class="demo-section">
        <h4>With Disabled Option</h4>
        <div class="demo-row">
          <SelectButton
            v-model="selectedWithDisabled"
            :options="sizeOptions"
            option-label="label"
            option-value="value"
            option-disabled="disabled"
          />
        </div>
        <div class="demo-value">Selected: {{ selectedWithDisabled }}</div>
      </div>

      <div class="demo-section">
        <h4>Disabled Component</h4>
        <div class="demo-row">
          <SelectButton
            v-model="disabledValue"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            is-disabled
          />
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
  gap: var(--doc-space-l);
}

.demo-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
