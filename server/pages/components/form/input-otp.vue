<script setup lang="ts">
import InputOtp from '@components/InputOtp/InputOtp.vue'
import '@components/InputOtp/InputOtp.scss'

const otp = ref('')
const otpMasked = ref('')
const otpComplete = ref('')
const otpSeparated = ref('')

const handleComplete = (event: { value: string }) => {
  console.log('OTP Complete:', event.value)
}

const componentProps = [
  { name: 'modelValue', type: 'String', default: '""', description: 'The OTP value (v-model)' },
  { name: 'length', type: 'Number', default: '4', description: 'Number of input cells (1-12)' },
  { name: 'mask', type: 'Boolean', default: 'false', description: 'Mask input characters' },
  { name: 'maskChar', type: 'String', default: '"*"', description: 'Character to display when masked' },
  { name: 'integerOnly', type: 'Boolean', default: 'true', description: 'Only allow numeric input' },
  { name: 'separator', type: 'Number', default: '0', description: 'Show separator every N cells (0 = no separator)' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' },
  { name: 'autoFocus', type: 'Boolean', default: 'false', description: 'Auto-focus first cell on mount' }
]

const otpEvents = [
  { name: 'update:modelValue', description: 'Emitted when value changes' },
  { name: 'change', description: 'Emitted when any cell value changes' },
  { name: 'complete', description: 'Emitted when all cells are filled' }
]

const otpMethods = [
  { name: 'focus()', description: 'Focus the first input cell' },
  { name: 'clear()', description: 'Clear all values and focus first cell' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputOtp"
      description="InputOtp component provides a one-time password input with multiple character cells, supporting masking and validation."
    />

    <ComponentDemo
      name="InputOtp"
      description="A one-time password input component."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic (4 digits)</h4>
        <div class="demo-row">
          <InputOtp v-model="otp" />
        </div>
        <p class="selected-value">Value: "{{ otp }}"</p>
      </div>

      <div class="demo-section">
        <h4>6 Digit Code</h4>
        <div class="demo-row">
          <InputOtp v-model="otpComplete" :length="6" @complete="handleComplete" />
        </div>
        <p class="selected-value">Value: "{{ otpComplete }}"</p>
      </div>

      <div class="demo-section">
        <h4>With Separator</h4>
        <p class="section-note">Separator shown every 3 characters</p>
        <div class="demo-row">
          <InputOtp v-model="otpSeparated" :length="6" :separator="3" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Masked</h4>
        <div class="demo-row">
          <InputOtp v-model="otpMasked" mask />
        </div>
        <p class="selected-value">Value: "{{ otpMasked }}"</p>
      </div>

      <div class="demo-section">
        <h4>Allow Letters</h4>
        <p class="section-note">integerOnly set to false</p>
        <div class="demo-row">
          <InputOtp :integer-only="false" :length="5" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <div class="demo-item">
            <InputOtp model-value="1234" is-disabled />
            <span class="demo-label">Disabled</span>
          </div>
          <div class="demo-item">
            <InputOtp model-value="12" is-invalid />
            <span class="demo-label">Invalid</span>
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
          <tr v-for="event in otpEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="methods-section">
      <h3>Methods</h3>
      <table class="events-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in otpMethods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description }}</td>
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
            <td><code>Arrow Left</code></td>
            <td>Move to previous cell</td>
          </tr>
          <tr>
            <td><code>Arrow Right</code></td>
            <td>Move to next cell</td>
          </tr>
          <tr>
            <td><code>Backspace</code></td>
            <td>Clear current cell, move to previous if empty</td>
          </tr>
          <tr>
            <td><code>Delete</code></td>
            <td>Clear current cell</td>
          </tr>
          <tr>
            <td><code>Home</code></td>
            <td>Move to first cell</td>
          </tr>
          <tr>
            <td><code>End</code></td>
            <td>Move to last cell</td>
          </tr>
          <tr>
            <td><code>Ctrl+V / Cmd+V</code></td>
            <td>Paste value starting from current cell</td>
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
  align-items: flex-start;
  gap: var(--doc-space-xl);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--doc-space-s);
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.selected-value {
  margin-top: var(--doc-space-m);
  font-size: 13px;
  color: var(--doc-text-muted);
}

.events-section,
.methods-section,
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
