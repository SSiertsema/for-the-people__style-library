<script setup lang="ts">
import Accordion from '@components/Accordion/Accordion.vue'
import AccordionTab from '@components/Accordion/AccordionTab.vue'
import '@components/Accordion/Accordion.scss'

const activeBasic = ref(0)
const activeMultiple = ref([0, 2])

const accordionProps = [
  { name: 'activeIndex', type: 'Number | Array', default: 'null', description: 'Index(es) of active tab(s). Use array when multiple is true.' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple tabs to be open simultaneously' }
]

const accordionTabProps = [
  { name: 'header', type: 'String', default: '""', description: 'Header text for the tab' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Whether the tab is disabled' }
]

const accordionEvents = [
  { name: 'update:activeIndex', description: 'Emitted when active tab(s) change' },
  { name: 'tab-open', description: 'Emitted when a tab is opened' },
  { name: 'tab-close', description: 'Emitted when a tab is closed' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Accordion"
      description="Accordion component for collapsible content sections."
    />

    <ComponentDemo
      name="Accordion"
      description="A container for collapsible content panels."
      :props="accordionProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Accordion v-model:active-index="activeBasic">
            <AccordionTab header="What is Vue.js?">
              Vue.js is a progressive JavaScript framework for building user interfaces.
              It is designed to be incrementally adoptable and focuses on the view layer.
            </AccordionTab>
            <AccordionTab header="What are components?">
              Components are reusable Vue instances with a name. They accept props,
              emit events, and can have their own internal state and lifecycle.
            </AccordionTab>
            <AccordionTab header="What is reactivity?">
              Vue's reactivity system automatically tracks JavaScript state changes
              and updates the DOM when changes happen.
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <div class="demo-section">
        <h4>Multiple Open</h4>
        <div class="demo-row">
          <Accordion v-model:active-index="activeMultiple" multiple>
            <AccordionTab header="Section 1">
              This is the content of section 1. Multiple sections can be expanded at the same time.
            </AccordionTab>
            <AccordionTab header="Section 2">
              This is the content of section 2. Click any header to toggle its content.
            </AccordionTab>
            <AccordionTab header="Section 3">
              This is the content of section 3. The multiple prop enables this behavior.
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled Tab</h4>
        <div class="demo-row">
          <Accordion>
            <AccordionTab header="Active Tab">
              This tab can be expanded and collapsed normally.
            </AccordionTab>
            <AccordionTab header="Disabled Tab" is-disabled>
              This content cannot be accessed because the tab is disabled.
            </AccordionTab>
            <AccordionTab header="Another Active Tab">
              This tab is also fully functional.
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <div class="demo-section">
        <h4>Custom Header Slot</h4>
        <div class="demo-row">
          <Accordion>
            <AccordionTab>
              <template #header>
                <span style="display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Custom Header with Icon
                </span>
              </template>
              You can use the header slot to provide custom header content including icons.
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </ComponentDemo>

    <ComponentDemo
      name="AccordionTab"
      description="Individual tab within an Accordion."
      :props="accordionTabProps"
    >
      <p class="info-text">AccordionTab components must be direct children of an Accordion component.</p>
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
          <tr v-for="event in accordionEvents" :key="event.name">
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
  margin-bottom: var(--doc-space-l);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-row {
  max-width: 600px;
}

.info-text {
  color: var(--doc-text-muted);
  font-size: 14px;
  margin: 0;
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
