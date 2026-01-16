<script setup lang="ts">
import ColorPicker from '@components/ColorPicker/ColorPicker.vue'
import '@components/ColorPicker/ColorPicker.scss'

const selectedColor = ref('#3b82f6')

const customPresets = [
  '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd',
  '#166534', '#22c55e', '#4ade80', '#86efac',
  '#9f1239', '#e11d48', '#fb7185', '#fda4af'
]

const componentProps = [
  { name: 'modelValue', type: 'String', default: '"#000000"', description: 'Selected color hex value (v-model)' },
  { name: 'presetColors', type: 'Array', default: '[...]', description: 'Array of preset color hex values' },
  { name: 'inline', type: 'Boolean', default: 'false', description: 'Show picker inline instead of popup' },
  { name: 'size', type: 'String', default: '"md"', description: 'Trigger size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ColorPicker"
      description="Color selection component with gradient picker, hue slider, hex input, and preset colors."
    />

    <ComponentDemo
      name="ColorPicker"
      description="Pick a color using the visual picker or hex input."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <ColorPicker v-model="selectedColor" />
          <span class="color-value">{{ selectedColor }}</span>
          <span class="color-swatch" :style="{ backgroundColor: selectedColor }" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Custom Preset Colors</h4>
        <div class="demo-row">
          <ColorPicker :preset-colors="customPresets" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Inline</h4>
        <div class="demo-row">
          <ColorPicker inline />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <ColorPicker size="sm" />
          <ColorPicker size="md" />
          <ColorPicker size="lg" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <ColorPicker />
          <ColorPicker is-disabled />
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
}

.color-value {
  font-family: monospace;
  font-size: 14px;
  color: var(--doc-text-muted);
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--doc-border-muted);
}
</style>
