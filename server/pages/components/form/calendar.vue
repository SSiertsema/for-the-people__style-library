<script setup lang="ts">
import Calendar from '@components/Calendar/Calendar.vue'
import '@components/Calendar/Calendar.scss'

const selectedDate = ref<Date | null>(null)
const selectedRange = ref<[Date | null, Date | null]>([null, null])

const componentProps = [
  { name: 'modelValue', type: 'Date | Array', default: 'null', description: 'Selected date(s) (v-model)' },
  { name: 'placeholder', type: 'String', default: '"Select date"', description: 'Placeholder text' },
  { name: 'dateFormat', type: 'String', default: '"dd/mm/yyyy"', description: 'Date format string' },
  { name: 'selectionMode', type: 'String', default: '"single"', description: 'Selection mode: single, range' },
  { name: 'minDate', type: 'Date', default: 'null', description: 'Minimum selectable date' },
  { name: 'maxDate', type: 'Date', default: 'null', description: 'Maximum selectable date' },
  { name: 'inline', type: 'Boolean', default: 'false', description: 'Show calendar inline instead of popup' },
  { name: 'showTodayButton', type: 'Boolean', default: 'false', description: 'Show today button in footer' },
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Calendar"
      description="Date picker component with month/year navigation. Supports single date and date range selection."
    />

    <ComponentDemo
      name="Calendar"
      description="Calendar for selecting dates."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Calendar v-model="selectedDate" placeholder="Pick a date" />
        </div>
        <p class="selected-value">Selected: {{ selectedDate?.toLocaleDateString() || 'none' }}</p>
      </div>

      <div class="demo-section">
        <h4>Date Range</h4>
        <div class="demo-row">
          <Calendar
            v-model="selectedRange"
            selection-mode="range"
            placeholder="Select date range"
          />
        </div>
        <p class="selected-value">
          Selected: {{ selectedRange[0]?.toLocaleDateString() || 'start' }} - {{ selectedRange[1]?.toLocaleDateString() || 'end' }}
        </p>
      </div>

      <div class="demo-section">
        <h4>With Today Button</h4>
        <div class="demo-row">
          <Calendar placeholder="Select date" show-today-button />
        </div>
      </div>

      <div class="demo-section">
        <h4>Inline Calendar</h4>
        <div class="demo-row">
          <Calendar inline />
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row">
          <Calendar placeholder="Small" size="sm" />
          <Calendar placeholder="Medium" size="md" />
          <Calendar placeholder="Large" size="lg" />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <Calendar placeholder="Default" />
          <Calendar placeholder="Disabled" is-disabled />
          <Calendar placeholder="Invalid" is-invalid />
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

  .calendar {
    width: 250px;
  }
}

.selected-value {
  margin-top: var(--doc-space-s);
  font-size: 13px;
  color: var(--doc-text-muted);
}
</style>
