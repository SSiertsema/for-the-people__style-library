<script setup lang="ts">
import Steps from '@components/Steps/Steps.vue'
import '@components/Steps/Steps.scss'

const activeIndex = ref(1)
const activeIndexReadonly = ref(2)

const basicSteps = ref([
  { label: 'Personal Info' },
  { label: 'Reservation' },
  { label: 'Review' },
  { label: 'Confirmation' }
])

const disabledSteps = ref([
  { label: 'Step 1' },
  { label: 'Step 2', disabled: true },
  { label: 'Step 3' },
  { label: 'Step 4' }
])

const componentProps = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of step items with label property' },
  { name: 'activeIndex', type: 'Number', default: '0', description: 'Index of the active step (v-model)' },
  { name: 'isReadonly', type: 'Boolean', default: 'false', description: 'When true, steps are not clickable' }
]

const stepEvents = [
  { name: 'update:activeIndex', description: 'Emitted when active step changes' },
  { name: 'step-click', description: 'Emitted when a step is clicked' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Steps"
      description="Steps component displays a wizard-like workflow with numbered steps and progress indication."
    />

    <ComponentDemo
      name="Steps"
      description="A step indicator for multi-step processes."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Steps v-model:active-index="activeIndex" :model="basicSteps" />
        </div>
        <p class="selected-value">Active: Step {{ activeIndex + 1 }} ({{ basicSteps[activeIndex].label }})</p>
      </div>

      <div class="demo-section">
        <h4>Interactive</h4>
        <p class="section-note">Click on steps to navigate</p>
        <div class="demo-row">
          <Steps v-model:active-index="activeIndex" :model="basicSteps" />
        </div>
        <div class="step-controls">
          <button
            class="control-btn"
            :disabled="activeIndex === 0"
            @click="activeIndex--"
          >
            Previous
          </button>
          <button
            class="control-btn"
            :disabled="activeIndex === basicSteps.length - 1"
            @click="activeIndex++"
          >
            Next
          </button>
        </div>
      </div>

      <div class="demo-section">
        <h4>Readonly</h4>
        <p class="section-note">Steps cannot be clicked directly</p>
        <div class="demo-row">
          <Steps :active-index="activeIndexReadonly" :model="basicSteps" is-readonly />
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled Step</h4>
        <div class="demo-row">
          <Steps :active-index="0" :model="disabledSteps" />
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
          <tr v-for="event in stepEvents" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
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
  max-width: 700px;
}

.selected-value {
  margin-top: var(--doc-space-m);
  font-size: 13px;
  color: var(--doc-text-muted);
}

.step-controls {
  display: flex;
  gap: var(--doc-space-s);
  margin-top: var(--doc-space-m);
}

.control-btn {
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  font-size: 14px;
  transition: background-color 150ms ease;

  &:hover:not(:disabled) {
    background: var(--doc-surface-muted);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.events-section {
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
