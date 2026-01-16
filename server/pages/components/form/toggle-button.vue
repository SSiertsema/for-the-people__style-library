<script setup lang="ts">
import ToggleButton from '@components/ToggleButton/ToggleButton.vue'
import '@components/ToggleButton/ToggleButton.scss'

const basic = ref(false)
const withLabels = ref(false)
const withIcons = ref(false)
const disabledOff = ref(false)
const disabledOn = ref(true)

const componentProps = [
  { name: 'modelValue', type: 'Boolean', default: 'false', description: 'Toggle state (v-model)' },
  { name: 'onLabel', type: 'String', default: '""', description: 'Label when toggled on' },
  { name: 'offLabel', type: 'String', default: '""', description: 'Label when toggled off' },
  { name: 'onIcon', type: 'String', default: '""', description: 'Icon class when toggled on' },
  { name: 'offIcon', type: 'String', default: '""', description: 'Icon class when toggled off' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ToggleButton"
      description="ToggleButton component for toggling between two states with customizable labels and icons."
    />

    <ComponentDemo
      name="ToggleButton"
      description="A button that toggles between on and off states."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <ToggleButton v-model="basic" on-label="On" off-label="Off" />
          <span class="demo-value">Value: {{ basic }}</span>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Labels</h4>
        <div class="demo-row">
          <ToggleButton v-model="withLabels" on-label="Active" off-label="Inactive" />
          <ToggleButton v-model="withLabels" on-label="Enabled" off-label="Disabled" />
          <ToggleButton v-model="withLabels" on-label="Yes" off-label="No" />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Icons</h4>
        <div class="demo-row">
          <ToggleButton
            v-model="withIcons"
            on-icon="pi pi-check"
            off-icon="pi pi-times"
            on-label="On"
            off-label="Off"
          />
          <ToggleButton
            v-model="withIcons"
            on-icon="pi pi-sun"
            off-icon="pi pi-moon"
          />
          <ToggleButton
            v-model="withIcons"
            on-icon="pi pi-lock-open"
            off-icon="pi pi-lock"
            on-label="Unlocked"
            off-label="Locked"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <ToggleButton size="sm" on-label="Small" off-label="Small" />
          <ToggleButton size="md" on-label="Medium" off-label="Medium" />
          <ToggleButton size="lg" on-label="Large" off-label="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled</h4>
        <div class="demo-row">
          <ToggleButton v-model="disabledOff" is-disabled on-label="On" off-label="Off" />
          <ToggleButton v-model="disabledOn" is-disabled on-label="On" off-label="Off" />
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
  font-size: 14px;
  color: var(--doc-text-muted);
}
</style>
