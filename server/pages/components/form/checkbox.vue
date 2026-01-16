<script setup lang="ts">
import Checkbox from '@components/Checkbox/Checkbox.vue'
import '@components/Checkbox/Checkbox.scss'

const checked = ref(false)
const checkedDisabled = ref(true)
const indeterminate = ref(true)

const componentProps = [
  { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Checked state (v-model)' },
  { name: 'label', type: 'String', default: '-', description: 'Label text' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for form' },
  { name: 'value', type: 'Any', default: 'true', description: 'Value when checked' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' },
  { name: 'indeterminate', type: 'Boolean', default: 'false', description: 'Indeterminate state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Checkbox"
      description="Checkbox component for boolean selections and multi-select lists."
    />

    <ComponentDemo
      name="Checkbox"
      description="A checkbox input for selecting options."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Checkbox v-model="checked" label="Accept terms and conditions" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
          <Checkbox size="lg" label="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <Checkbox label="Default" />
          <Checkbox v-model="checkedDisabled" is-disabled label="Disabled checked" />
          <Checkbox is-disabled label="Disabled" />
          <Checkbox is-invalid label="Invalid" />
          <Checkbox v-model="indeterminate" indeterminate label="Indeterminate" />
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
</style>
