<script setup lang="ts">
import InputNumber from '@components/InputNumber/InputNumber.vue'
import '@components/InputNumber/InputNumber.scss'

const value = ref(10)
const valueMinMax = ref(5)
const valueDecimal = ref(12.50)

const componentProps = [
  { name: 'modelValue', type: 'Number', default: 'null', description: 'Numeric value (v-model)' },
  { name: 'min', type: 'Number', default: 'null', description: 'Minimum value' },
  { name: 'max', type: 'Number', default: 'null', description: 'Maximum value' },
  { name: 'step', type: 'Number', default: '1', description: 'Step increment' },
  { name: 'showButtons', type: 'Boolean', default: 'true', description: 'Show +/- buttons' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'placeholder', type: 'String', default: '-', description: 'Placeholder text' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' },
  { name: 'locale', type: 'String', default: '"nl-NL"', description: 'Locale for number formatting' },
  { name: 'minFractionDigits', type: 'Number', default: '0', description: 'Min decimal places' },
  { name: 'maxFractionDigits', type: 'Number', default: '2', description: 'Max decimal places' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputNumber"
      description="Numeric input with increment/decrement controls."
    />

    <ComponentDemo
      name="InputNumber"
      description="Number input with built-in buttons and validation."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <InputNumber v-model="value" />
        </div>
        <p class="selected-value">Value: {{ value }}</p>
      </div>

      <div class="demo-section">
        <h4>Min/Max (0-10)</h4>
        <div class="demo-row">
          <InputNumber v-model="valueMinMax" :min="0" :max="10" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Decimal with Step</h4>
        <div class="demo-row">
          <InputNumber
            v-model="valueDecimal"
            :step="0.50"
            :min-fraction-digits="2"
            :max-fraction-digits="2"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <InputNumber size="sm" placeholder="Small" />
          <InputNumber size="md" placeholder="Medium" />
          <InputNumber size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Without Buttons</h4>
        <div class="demo-row">
          <InputNumber :show-buttons="false" placeholder="No buttons" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <InputNumber placeholder="Default" />
          <InputNumber placeholder="Disabled" is-disabled />
          <InputNumber placeholder="Invalid" is-invalid />
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

  .input-number {
    width: 180px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
