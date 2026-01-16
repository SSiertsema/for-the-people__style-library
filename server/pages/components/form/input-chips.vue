<script setup lang="ts">
import InputChips from '@components/InputChips/InputChips.vue'
import '@components/InputChips/InputChips.scss'

const basicValue = ref<string[]>([])
const prefilledValue = ref(['Vue', 'React', 'Angular'])
const separatorValue = ref<string[]>([])
const maxValue = ref(['Tag 1', 'Tag 2'])
const noDuplicatesValue = ref<string[]>([])

const componentProps = [
  { name: 'modelValue', type: 'Array', default: '[]', description: 'Array of chip values (v-model)' },
  { name: 'separator', type: 'String | RegExp', default: 'null', description: 'Character or pattern that triggers chip creation (in addition to Enter)' },
  { name: 'allowDuplicate', type: 'Boolean', default: 'false', description: 'Allow duplicate chip values' },
  { name: 'max', type: 'Number', default: 'null', description: 'Maximum number of chips allowed' },
  { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text when empty' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputChips"
      description="A text input that creates chips/tags from user input."
    />

    <ComponentDemo
      name="InputChips"
      description="Input field that converts text into chips on Enter or separator character."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <InputChips v-model="basicValue" placeholder="Type and press Enter" />
        </div>
        <p class="demo-hint">Values: {{ basicValue.length ? basicValue.join(', ') : '(empty)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Prefilled Values</h4>
        <div class="demo-row">
          <InputChips v-model="prefilledValue" />
        </div>
      </div>

      <div class="demo-section">
        <h4>With Separator (comma)</h4>
        <div class="demo-row">
          <InputChips
            v-model="separatorValue"
            separator=","
            placeholder="Separate with commas"
          />
        </div>
        <p class="demo-hint">Type multiple values separated by commas</p>
      </div>

      <div class="demo-section">
        <h4>Maximum Chips (max: 3)</h4>
        <div class="demo-row">
          <InputChips
            v-model="maxValue"
            :max="3"
            placeholder="Max 3 tags"
          />
        </div>
        <p class="demo-hint">{{ 3 - maxValue.length }} remaining</p>
      </div>

      <div class="demo-section">
        <h4>No Duplicates</h4>
        <div class="demo-row">
          <InputChips
            v-model="noDuplicatesValue"
            :allow-duplicate="false"
            placeholder="Duplicates not allowed"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <InputChips size="sm" :model-value="['Small']" placeholder="Small" />
          <InputChips size="md" :model-value="['Medium']" placeholder="Medium" />
          <InputChips size="lg" :model-value="['Large']" placeholder="Large" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row demo-row--column">
          <InputChips placeholder="Default" />
          <InputChips is-disabled :model-value="['Disabled']" placeholder="Disabled" />
          <InputChips is-invalid :model-value="['Invalid']" placeholder="Invalid" />
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
  max-width: 500px;
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
