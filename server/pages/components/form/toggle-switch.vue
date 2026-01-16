<script setup lang="ts">
import ToggleSwitch from '@components/ToggleSwitch/ToggleSwitch.vue'
import '@components/ToggleSwitch/ToggleSwitch.scss'

const enabled = ref(false)
const enabledOn = ref(true)

const componentProps = [
  { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Switch state (v-model)' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for form' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ToggleSwitch"
      description="Toggle switch for binary on/off states."
    />

    <ComponentDemo
      name="ToggleSwitch"
      description="A toggle switch component for toggling between on and off states."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <ToggleSwitch v-model="enabled" />
        </div>
        <p class="selected-value">State: {{ enabled ? 'On' : 'Off' }}</p>
      </div>

      <div class="demo-section">
        <h4>Disabled States</h4>
        <div class="demo-row">
          <ToggleSwitch is-disabled />
          <span class="demo-label">Disabled (off)</span>
        </div>
        <div class="demo-row">
          <ToggleSwitch :model-value="true" is-disabled />
          <span class="demo-label">Disabled (on)</span>
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
  margin-bottom: var(--doc-space-s);
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
