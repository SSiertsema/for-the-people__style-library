<script setup lang="ts">
import Tabs from '@components/Tabs/Tabs.vue'
import TabPanel from '@components/Tabs/TabPanel.vue'
import '@components/Tabs/Tabs.scss'

const activeIndex = ref(0)
const controlledIndex = ref(0)

const tabsProps = [
  { name: 'activeIndex', type: 'Number', default: '0', description: 'Index of the active tab (v-model)' },
  { name: 'ariaLabel', type: 'String', default: '"Tabs"', description: 'Accessible label for the tab list' }
]

const tabPanelProps = [
  { name: 'header', type: 'String', default: '-', description: 'Tab header text (required)' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disables the tab' }
]

const tabsEvents = [
  { name: 'update:activeIndex', description: 'Emitted when active tab changes' },
  { name: 'tabChange', description: 'Emitted when tab selection changes, with event and index' },
  { name: 'tabClick', description: 'Emitted on tab click, with event and index' }
]

const selectTab = (index: number) => {
  controlledIndex.value = index
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Tabs"
      description="Tabs organize content into multiple sections and allow users to navigate between them."
    />

    <ComponentDemo
      name="Tabs"
      description="A tabbed interface for organizing content."
      :props="tabsProps"
      :events="tabsEvents"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <Tabs v-model:active-index="activeIndex">
          <TabPanel header="Overview">
            <p>This is the overview content. Use tabs to organize related content into separate views.</p>
          </TabPanel>
          <TabPanel header="Features">
            <p>Discover the features available in this component. Tabs support keyboard navigation with arrow keys.</p>
          </TabPanel>
          <TabPanel header="Documentation">
            <p>Read the documentation to learn how to implement tabs in your application.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div class="demo-section">
        <h4>Disabled Tab</h4>
        <Tabs>
          <TabPanel header="Active">
            <p>This tab is active and clickable.</p>
          </TabPanel>
          <TabPanel header="Disabled" disabled>
            <p>This content will not be accessible because the tab is disabled.</p>
          </TabPanel>
          <TabPanel header="Another Tab">
            <p>This tab is also active and clickable.</p>
          </TabPanel>
        </Tabs>
      </div>

      <div class="demo-section">
        <h4>Programmatic Control</h4>
        <div class="demo-controls">
          <button class="demo-button" @click="selectTab(0)">Select First</button>
          <button class="demo-button" @click="selectTab(1)">Select Second</button>
          <button class="demo-button" @click="selectTab(2)">Select Third</button>
        </div>
        <Tabs v-model:active-index="controlledIndex">
          <TabPanel header="First">
            <p>First tab content. Current index: {{ controlledIndex }}</p>
          </TabPanel>
          <TabPanel header="Second">
            <p>Second tab content. Current index: {{ controlledIndex }}</p>
          </TabPanel>
          <TabPanel header="Third">
            <p>Third tab content. Current index: {{ controlledIndex }}</p>
          </TabPanel>
        </Tabs>
      </div>
    </ComponentDemo>

    <ComponentDemo
      name="TabPanel"
      description="Individual tab panel within a Tabs container."
      :props="tabPanelProps"
    >
      <p class="demo-note">TabPanel must be used as a direct child of Tabs component.</p>
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

.demo-controls {
  display: flex;
  gap: var(--doc-space-s);
  margin-bottom: var(--doc-space-m);
}

.demo-button {
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: var(--doc-surface-elevated);
  border: 1px solid var(--doc-border-default);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: var(--doc-surface-muted);
  }
}

.demo-note {
  color: var(--doc-text-muted);
  font-size: 14px;
  font-style: italic;
}
</style>
