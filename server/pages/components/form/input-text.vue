<script setup lang="ts">
import InputText from '@components/InputText/InputText.vue'
import '@components/InputText/InputText.scss'

const basicValue = ref('')
const placeholderValue = ref('')

const componentProps = [
  { name: 'modelValue', type: 'String | Number', default: '""', description: 'Input value (v-model)' },
  { name: 'type', type: 'String', default: '"text"', description: 'Input type: text, password, email, tel, url, search, number' },
  { name: 'placeholder', type: 'String', default: '-', description: 'Placeholder text' },
  { name: 'name', type: 'String', default: '-', description: 'Name attribute for form' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputText"
      description="Text input component for single-line text entry."
    />

    <ComponentDemo
      name="InputText"
      description="A basic text input field for capturing user input."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <InputText v-model="basicValue" />
        </div>
        <p class="demo-hint">Value: {{ basicValue || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Placeholder</h4>
        <div class="demo-row">
          <InputText v-model="placeholderValue" placeholder="Enter your name" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <InputText size="sm" placeholder="Small" />
          <InputText size="md" placeholder="Medium" />
          <InputText size="lg" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row demo-row--column">
          <InputText placeholder="Default" />
          <InputText is-disabled placeholder="Disabled" />
          <InputText is-disabled model-value="Disabled with value" />
          <InputText is-invalid placeholder="Invalid" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Input Types</h4>
        <div class="demo-row demo-row--column">
          <InputText type="text" placeholder="Text input" />
          <InputText type="password" placeholder="Password input" />
          <InputText type="email" placeholder="Email input" />
          <InputText type="search" placeholder="Search input" />
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
