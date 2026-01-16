<script setup lang="ts">
import RadioButton from '@components/RadioButton/RadioButton.vue'
import '@components/RadioButton/RadioButton.scss'

const selected = ref('option1')
const selectedSize = ref('md')

const componentProps = [
  { name: 'modelValue', type: 'Any', default: 'null', description: 'Selected value (v-model)' },
  { name: 'value', type: 'Any', default: '-', description: 'Value of this radio option (required)' },
  { name: 'label', type: 'String', default: '-', description: 'Label text' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for grouping' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="RadioButton"
      description="Radio button component for single selection from a group of options."
    />

    <ComponentDemo
      name="RadioButton"
      description="Radio buttons for mutually exclusive choices."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic Group</h4>
        <div class="demo-row">
          <RadioButton v-model="selected" value="option1" label="Option 1" name="demo" />
          <RadioButton v-model="selected" value="option2" label="Option 2" name="demo" />
          <RadioButton v-model="selected" value="option3" label="Option 3" name="demo" />
        </div>
        <p class="selected-value">Selected: {{ selected }}</p>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <RadioButton v-model="selectedSize" value="sm" size="sm" label="Small" name="sizes" />
          <RadioButton v-model="selectedSize" value="md" size="md" label="Medium" name="sizes" />
          <RadioButton v-model="selectedSize" value="lg" size="lg" label="Large" name="sizes" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <RadioButton value="normal" label="Default" name="states" />
          <RadioButton value="disabled" is-disabled label="Disabled" name="states2" />
          <RadioButton :model-value="'checked'" value="checked" is-disabled label="Disabled checked" name="states3" />
          <RadioButton value="invalid" is-invalid label="Invalid" name="states4" />
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

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
