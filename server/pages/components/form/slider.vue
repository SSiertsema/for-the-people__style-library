<script setup lang="ts">
import Slider from '@components/Slider/Slider.vue'
import '@components/Slider/Slider.scss'

const value = ref(50)
const valueStep = ref(25)

const componentProps = [
  { name: 'modelValue', type: 'Number', default: '0', description: 'Slider value (v-model)' },
  { name: 'min', type: 'Number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'Number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'Number', default: '1', description: 'Step increment' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for form' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Slider"
      description="Range slider for selecting numeric values."
    />

    <ComponentDemo
      name="Slider"
      description="A range slider input."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Slider v-model="value" />
        </div>
        <p class="selected-value">Value: {{ value }}</p>
      </div>

      <div class="demo-section">
        <h4>With Step (25)</h4>
        <div class="demo-row">
          <Slider v-model="valueStep" :step="25" />
        </div>
        <p class="selected-value">Value: {{ valueStep }}</p>
      </div>

      <div class="demo-section">
        <h4>Custom Range (0-200)</h4>
        <div class="demo-row">
          <Slider :min="0" :max="200" :model-value="100" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled</h4>
        <div class="demo-row">
          <Slider :model-value="30" is-disabled />
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
  max-width: 400px;
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
