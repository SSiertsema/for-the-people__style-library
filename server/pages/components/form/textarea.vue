<script setup lang="ts">
import Textarea from '@components/Textarea/Textarea.vue'
import '@components/Textarea/Textarea.scss'

const basicText = ref('')
const autoResizeText = ref('')

const componentProps = [
  { name: 'modelValue', type: 'String', default: '""', description: 'Text value (v-model)' },
  { name: 'rows', type: 'Number | String', default: '3', description: 'Number of visible text rows' },
  { name: 'cols', type: 'Number | String', default: 'null', description: 'Number of visible text columns' },
  { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' },
  { name: 'autoResize', type: 'Boolean', default: 'false', description: 'Automatically resize height based on content' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Textarea"
      description="Multi-line text input component for longer form content."
    />

    <ComponentDemo
      name="Textarea"
      description="A native textarea with custom styling and auto-resize capability."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Textarea v-model="basicText" placeholder="Enter your message..." />
        </div>
        <p class="current-value">Value: {{ basicText || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Auto-resize</h4>
        <div class="demo-row">
          <Textarea
            v-model="autoResizeText"
            placeholder="Start typing and the textarea will grow..."
            auto-resize
            :rows="1"
          />
        </div>
        <p class="current-value">Value: {{ autoResizeText || '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <Textarea placeholder="Default" />
          <Textarea placeholder="Disabled" is-disabled />
          <Textarea placeholder="Invalid" is-invalid />
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
  align-items: flex-start;
  gap: var(--doc-space-m);

  .textarea {
    width: 280px;
  }
}

.current-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
