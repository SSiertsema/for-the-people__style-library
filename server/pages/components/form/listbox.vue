<script setup lang="ts">
import ListBox from '@components/ListBox/ListBox.vue'
import '@components/ListBox/ListBox.scss'

const basicValue = ref(null)
const multipleValue = ref<string[]>([])
const filterValue = ref(null)
const objectValue = ref(null)

const cities = ['Amsterdam', 'Berlin', 'London', 'Madrid', 'Paris', 'Rome', 'Vienna', 'Warsaw']

const citiesWithDisabled = [
  { name: 'Amsterdam', code: 'AMS' },
  { name: 'Berlin', code: 'BER' },
  { name: 'London', code: 'LON', disabled: true },
  { name: 'Madrid', code: 'MAD' },
  { name: 'Paris', code: 'PAR' },
  { name: 'Rome', code: 'ROM' },
  { name: 'Vienna', code: 'VIE' },
  { name: 'Warsaw', code: 'WAR' }
]

const componentProps = [
  { name: 'modelValue', type: 'String | Number | Object | Array', default: 'null', description: 'Selected value(s) (v-model)' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options to display' },
  { name: 'optionLabel', type: 'String', default: '"label"', description: 'Property name for option label' },
  { name: 'optionValue', type: 'String', default: '"value"', description: 'Property name for option value' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple selections' },
  { name: 'filter', type: 'Boolean', default: 'false', description: 'Show filter input' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ListBox"
      description="A scrollable list of options with single or multiple selection."
    />

    <ComponentDemo
      name="ListBox"
      description="Selectable list component for choosing from a set of options."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic (String Options)</h4>
        <div class="demo-row">
          <ListBox v-model="basicValue" :options="cities" />
        </div>
        <p class="demo-hint">Selected: {{ basicValue || '(none)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Multiple Selection</h4>
        <div class="demo-row">
          <ListBox v-model="multipleValue" :options="cities" multiple />
        </div>
        <p class="demo-hint">Selected: {{ multipleValue.length ? multipleValue.join(', ') : '(none)' }}</p>
      </div>

      <div class="demo-section">
        <h4>With Filter</h4>
        <div class="demo-row">
          <ListBox v-model="filterValue" :options="cities" filter />
        </div>
        <p class="demo-hint">Type to filter options</p>
      </div>

      <div class="demo-section">
        <h4>Object Options with Disabled Items</h4>
        <div class="demo-row">
          <ListBox
            v-model="objectValue"
            :options="citiesWithDisabled"
            option-label="name"
            option-value="code"
          />
        </div>
        <p class="demo-hint">Selected code: {{ objectValue || '(none)' }}</p>
      </div>

      <div class="demo-section">
        <h4>Disabled ListBox</h4>
        <div class="demo-row">
          <ListBox :options="cities" is-disabled model-value="Paris" />
        </div>
      </div>

      <div class="demo-section">
        <h4>Multiple with Filter</h4>
        <div class="demo-row">
          <ListBox :options="cities" multiple filter />
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
  max-width: 300px;
}

.demo-hint {
  margin-top: var(--doc-space-xs);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
