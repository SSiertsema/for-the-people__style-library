<script setup lang="ts">
import Knob from '@components/Knob/Knob.vue'
import '@components/Knob/Knob.scss'

const value = ref(40)
const valuePercent = ref(75)
const valueStepped = ref(50)

const componentProps = [
  { name: 'modelValue', type: 'Number', default: '0', description: 'Current value (v-model)' },
  { name: 'min', type: 'Number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'Number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'Number', default: '1', description: 'Step increment' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'strokeWidth', type: 'Number', default: '-', description: 'Custom stroke width (overrides size default)' },
  { name: 'showValue', type: 'Boolean', default: 'true', description: 'Display value in center' },
  { name: 'valueTemplate', type: 'String', default: '"{value}"', description: 'Template for value display, use {value} as placeholder' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]

const knobEvents = [
  { name: 'update:modelValue', description: 'Emitted when value changes during drag' },
  { name: 'change', description: 'Emitted when drag ends or keyboard input changes value' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Knob"
      description="Knob component provides a circular dial input for selecting numeric values with mouse drag or keyboard."
    />

    <ComponentDemo
      name="Knob"
      description="A circular dial input for numeric values."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob v-model="value" />
            <span class="demo-label">Value: {{ value }}</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob :model-value="50" size="sm" />
            <span class="demo-label">Small</span>
          </div>
          <div class="demo-item">
            <Knob :model-value="50" size="md" />
            <span class="demo-label">Medium</span>
          </div>
          <div class="demo-item">
            <Knob :model-value="50" size="lg" />
            <span class="demo-label">Large</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Value Template</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob v-model="valuePercent" value-template="{value}%" />
            <span class="demo-label">Percentage</span>
          </div>
          <div class="demo-item">
            <Knob :model-value="24" :max="60" value-template="{value}m" />
            <span class="demo-label">Minutes</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Step</h4>
        <p class="section-note">Step of 10</p>
        <div class="demo-row">
          <div class="demo-item">
            <Knob v-model="valueStepped" :step="10" />
            <span class="demo-label">Value: {{ valueStepped }}</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Custom Range</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob :model-value="60" :min="0" :max="120" value-template="{value}bpm" />
            <span class="demo-label">0-120 BPM</span>
          </div>
          <div class="demo-item">
            <Knob :model-value="-10" :min="-50" :max="50" />
            <span class="demo-label">-50 to 50</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>No Value Display</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob :model-value="65" :show-value="false" />
            <span class="demo-label">Hidden value</span>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled</h4>
        <div class="demo-row">
          <div class="demo-item">
            <Knob :model-value="30" is-disabled />
            <span class="demo-label">Disabled</span>
          </div>
        </div>
      </div>
    </ComponentDemo>

    <div class="events-section">
      <h3>Events</h3>
      <table class="events-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in knobEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keyboard-section">
      <h3>Keyboard Support</h3>
      <table class="events-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Arrow Up/Right</code></td>
            <td>Increase value by step</td>
          </tr>
          <tr>
            <td><code>Arrow Down/Left</code></td>
            <td>Decrease value by step</td>
          </tr>
          <tr>
            <td><code>Page Up</code></td>
            <td>Increase value by step * 10</td>
          </tr>
          <tr>
            <td><code>Page Down</code></td>
            <td>Decrease value by step * 10</td>
          </tr>
          <tr>
            <td><code>Home</code></td>
            <td>Set to minimum value</td>
          </tr>
          <tr>
            <td><code>End</code></td>
            <td>Set to maximum value</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-xl);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.section-note {
  font-size: 13px;
  color: var(--doc-text-muted);
  margin: 0 0 var(--doc-space-m);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--doc-space-xl);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--doc-space-s);
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.events-section,
.keyboard-section {
  margin-top: var(--doc-space-xl);
  padding: var(--doc-space-l);
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);

  h3 {
    margin: 0 0 var(--doc-space-m);
    font-size: 18px;
    font-weight: 600;
  }
}

.events-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: var(--doc-space-s) var(--doc-space-m);
    border-bottom: 1px solid var(--doc-border-subtle);
  }

  th {
    font-weight: 600;
    font-size: 13px;
    color: var(--doc-text-muted);
  }

  td code {
    background: var(--doc-surface-muted);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
}
</style>
