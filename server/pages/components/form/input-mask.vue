<script setup lang="ts">
import InputMask from '@components/InputMask/InputMask.vue'
import '@components/InputMask/InputMask.scss'

const phoneValue = ref('')
const dateValue = ref('')
const ssnValue = ref('')
const creditCardValue = ref('')
const zipValue = ref('')

const componentProps = [
  { name: 'modelValue', type: 'String', default: '""', description: 'Raw input value without mask characters (v-model)' },
  { name: 'mask', type: 'String', default: '-', description: 'Mask pattern: 9 = digit, a = letter, * = alphanumeric' },
  { name: 'slotChar', type: 'String', default: '"_"', description: 'Placeholder character for unfilled positions' },
  { name: 'autoClear', type: 'Boolean', default: 'true', description: 'Clear incomplete value on blur' },
  { name: 'placeholder', type: 'String', default: '-', description: 'Placeholder text when empty' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputMask"
      description="Text input with format mask for structured data entry."
    />

    <ComponentDemo
      name="InputMask"
      description="Input field that enforces a specific format pattern."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Phone Number (99-999-9999)</h4>
        <div class="demo-row">
          <InputMask v-model="phoneValue" mask="99-999-9999" placeholder="Phone number" />
        </div>
        <p class="demo-hint">Raw value: {{ phoneValue || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Date (99/99/9999)</h4>
        <div class="demo-row">
          <InputMask v-model="dateValue" mask="99/99/9999" placeholder="MM/DD/YYYY" />
        </div>
        <p class="demo-hint">Raw value: {{ dateValue || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>SSN (999-99-9999)</h4>
        <div class="demo-row">
          <InputMask v-model="ssnValue" mask="999-99-9999" placeholder="SSN" />
        </div>
        <p class="demo-hint">Raw value: {{ ssnValue || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Credit Card (9999 9999 9999 9999)</h4>
        <div class="demo-row">
          <InputMask v-model="creditCardValue" mask="9999 9999 9999 9999" placeholder="Card number" />
        </div>
        <p class="demo-hint">Raw value: {{ creditCardValue || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Zip Code with Custom Slot Char</h4>
        <div class="demo-row">
          <InputMask v-model="zipValue" mask="99999-9999" slot-char="#" placeholder="Zip+4" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <InputMask size="sm" mask="999-9999" placeholder="Small" />
          <InputMask size="md" mask="999-9999" placeholder="Medium" />
          <InputMask size="lg" mask="999-9999" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row demo-row--column">
          <InputMask mask="99-999" placeholder="Default" />
          <InputMask mask="99-999" is-disabled placeholder="Disabled" />
          <InputMask mask="99-999" is-invalid placeholder="Invalid" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Auto Clear Disabled</h4>
        <div class="demo-row">
          <InputMask mask="999-999" :auto-clear="false" placeholder="Won't clear on blur" />
        </div>
        <p class="demo-hint">Incomplete values will remain on blur</p>
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
  max-width: 400px;
}

.demo-row--column {
  flex-direction: column;
  align-items: stretch;
}

.demo-hint {
  margin-top: var(--doc-space-xs);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
