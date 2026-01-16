<script setup lang="ts">
import InputSwitch from '@components/InputSwitch/InputSwitch.vue'
import '@components/InputSwitch/InputSwitch.scss'

const enabled = ref(false)
const enabledOn = ref(true)

const componentProps = [
  { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Switch state (v-model)' },
  { name: 'label', type: 'String', default: '-', description: 'Label text' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for form' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputSwitch"
      description="Toggle switch for on/off states."
    />

    <ComponentDemo
      name="InputSwitch"
      description="A toggle switch component."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <InputSwitch v-model="enabled" label="Enable notifications" />
        </div>
        <p class="selected-value">State: {{ enabled ? 'On' : 'Off' }}</p>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <InputSwitch size="sm" label="Small" />
          <InputSwitch size="md" label="Medium" />
          <InputSwitch size="lg" label="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <InputSwitch label="Default off" />
          <InputSwitch v-model="enabledOn" label="Default on" />
          <InputSwitch is-disabled label="Disabled off" />
          <InputSwitch :model-value="true" is-disabled label="Disabled on" />
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
