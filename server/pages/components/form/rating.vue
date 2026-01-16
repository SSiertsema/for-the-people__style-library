<script setup lang="ts">
import Rating from '@components/Rating/Rating.vue'
import '@components/Rating/Rating.scss'

const value = ref(3)
const readonlyValue = ref(4)

const componentProps = [
  { name: 'modelValue', type: 'Number', default: 'null', description: 'Rating value (v-model)' },
  { name: 'stars', type: 'Number', default: '5', description: 'Number of stars to display' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'When true, rating cannot be changed' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'cancel', type: 'Boolean', default: 'true', description: 'Show cancel button to clear rating' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Rating"
      description="Star-based rating component for user feedback and reviews."
    />

    <ComponentDemo
      name="Rating"
      description="A rating input using star icons."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Rating v-model="value" />
        </div>
        <p class="selected-value">Value: {{ value ?? 'null' }}</p>
      </div>

      <div class="demo-section">
        <h4>Without Cancel Button</h4>
        <div class="demo-row">
          <Rating v-model="value" :cancel="false" />
        </div>
        <p class="selected-value">Value: {{ value ?? 'null' }}</p>
      </div>

      <div class="demo-section">
        <h4>Readonly</h4>
        <div class="demo-row">
          <Rating v-model="readonlyValue" readonly />
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled</h4>
        <div class="demo-row">
          <Rating :model-value="2" is-disabled />
        </div>
      </div>

      <div class="demo-section">
        <h4>Custom Star Count (10 stars)</h4>
        <div class="demo-row">
          <Rating :model-value="7" :stars="10" readonly />
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
  align-items: center;
  gap: var(--doc-space-m);
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
