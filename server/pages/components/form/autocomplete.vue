<script setup lang="ts">
import AutoComplete from '@components/AutoComplete/AutoComplete.vue'
import '@components/AutoComplete/AutoComplete.scss'

const selectedCity = ref(null)
const selectedCities = ref([])
const suggestions = ref([])

const cities = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtd' },
  { label: 'Den Haag', value: 'dhg' },
  { label: 'Utrecht', value: 'utr' },
  { label: 'Eindhoven', value: 'ehv' },
  { label: 'Groningen', value: 'grn' },
  { label: 'Tilburg', value: 'tlb' },
  { label: 'Almere', value: 'alm' },
  { label: 'Breda', value: 'brd' },
  { label: 'Nijmegen', value: 'njm' }
]

const searchCities = (event: { query: string }) => {
  const query = event.query.toLowerCase()
  if (!query) {
    suggestions.value = [...cities]
  } else {
    suggestions.value = cities.filter(city =>
      city.label.toLowerCase().includes(query)
    )
  }
}

const componentProps = [
  { name: 'modelValue', type: 'Any', default: 'null', description: 'Selected value (v-model)' },
  { name: 'suggestions', type: 'Array', default: '[]', description: 'Array of suggestions to display' },
  { name: 'optionLabel', type: 'String', default: '"label"', description: 'Property name for label' },
  { name: 'optionValue', type: 'String', default: '"value"', description: 'Property name for value' },
  { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple selections' },
  { name: 'minLength', type: 'Number', default: '1', description: 'Minimum characters to trigger search' },
  { name: 'delay', type: 'Number', default: '300', description: 'Debounce delay in ms' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' },
  { name: 'isLoading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'dropdown', type: 'Boolean', default: 'false', description: 'Show dropdown button' },
  { name: 'completeOnFocus', type: 'Boolean', default: 'false', description: 'Show suggestions on focus' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="AutoComplete"
      description="Text input with suggestions dropdown. Supports single and multiple selection modes."
    />

    <ComponentDemo
      name="AutoComplete"
      description="Input field with type-ahead suggestions."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <AutoComplete
            v-model="selectedCity"
            :suggestions="suggestions"
            placeholder="Search cities..."
            @complete="searchCities"
          />
        </div>
        <p class="selected-value">Selected: {{ selectedCity?.label || 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Multiple Selection</h4>
        <div class="demo-row">
          <AutoComplete
            v-model="selectedCities"
            :suggestions="suggestions"
            placeholder="Select cities..."
            multiple
            @complete="searchCities"
          />
        </div>
        <p class="selected-value">Selected: {{ selectedCities.map(c => c.label).join(', ') || 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Dropdown Mode</h4>
        <div class="demo-row">
          <AutoComplete
            :suggestions="suggestions"
            placeholder="Click to show all..."
            dropdown
            complete-on-focus
            @complete="searchCities"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <AutoComplete :suggestions="suggestions" placeholder="Small" size="sm" @complete="searchCities" />
          <AutoComplete :suggestions="suggestions" placeholder="Medium" size="md" @complete="searchCities" />
          <AutoComplete :suggestions="suggestions" placeholder="Large" size="lg" @complete="searchCities" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <AutoComplete :suggestions="suggestions" placeholder="Default" @complete="searchCities" />
          <AutoComplete :suggestions="suggestions" placeholder="Disabled" is-disabled />
          <AutoComplete :suggestions="suggestions" placeholder="Invalid" is-invalid @complete="searchCities" />
          <AutoComplete :suggestions="suggestions" placeholder="Loading..." is-loading @complete="searchCities" />
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

  .autocomplete {
    width: 250px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
