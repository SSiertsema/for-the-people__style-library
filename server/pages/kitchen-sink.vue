<script setup lang="ts">
// Button
import Button from '@components/Button/Button.vue'
import '@components/Button/Button.scss'

// Form inputs
import InputText from '@components/InputText/InputText.vue'
import '@components/InputText/InputText.scss'
import Textarea from '@components/Textarea/Textarea.vue'
import '@components/Textarea/Textarea.scss'
import Checkbox from '@components/Checkbox/Checkbox.vue'
import '@components/Checkbox/Checkbox.scss'
import RadioButton from '@components/RadioButton/RadioButton.vue'
import '@components/RadioButton/RadioButton.scss'
import Select from '@components/Select/Select.vue'
import '@components/Select/Select.scss'
import Slider from '@components/Slider/Slider.vue'
import '@components/Slider/Slider.scss'
import ToggleSwitch from '@components/ToggleSwitch/ToggleSwitch.vue'
import '@components/ToggleSwitch/ToggleSwitch.scss'

// Misc
import Avatar from '@components/Avatar/Avatar.vue'
import '@components/Avatar/Avatar.scss'
import Badge from '@components/Badge/Badge.vue'
import '@components/Badge/Badge.scss'
import Tag from '@components/Tag/Tag.vue'
import '@components/Tag/Tag.scss'
import Chip from '@components/Chip/Chip.vue'
import '@components/Chip/Chip.scss'
import Divider from '@components/Divider/Divider.vue'
import '@components/Divider/Divider.scss'

// Feedback
import Message from '@components/Message/Message.vue'
import '@components/Message/Message.scss'
import InlineMessage from '@components/InlineMessage/InlineMessage.vue'
import '@components/InlineMessage/InlineMessage.scss'
import ProgressBar from '@components/ProgressBar/ProgressBar.vue'
import '@components/ProgressBar/ProgressBar.scss'
import ProgressSpinner from '@components/ProgressSpinner/ProgressSpinner.vue'
import '@components/ProgressSpinner/ProgressSpinner.scss'
import Skeleton from '@components/Skeleton/Skeleton.vue'
import '@components/Skeleton/Skeleton.scss'

// Containers
import Card from '@components/Card/Card.vue'
import '@components/Card/Card.scss'
import Panel from '@components/Panel/Panel.vue'
import '@components/Panel/Panel.scss'
import Accordion from '@components/Accordion/Accordion.vue'
import AccordionTab from '@components/Accordion/AccordionTab.vue'
import '@components/Accordion/Accordion.scss'
import Tabs from '@components/Tabs/Tabs.vue'
import TabPanel from '@components/Tabs/TabPanel.vue'
import '@components/Tabs/Tabs.scss'

// Navigation
import Breadcrumb from '@components/Breadcrumb/Breadcrumb.vue'
import '@components/Breadcrumb/Breadcrumb.scss'
import Steps from '@components/Steps/Steps.vue'
import '@components/Steps/Steps.scss'

// Reactive state for interactive components
const checkboxValue = ref(true)
const checkboxDisabled = ref(true)
const checkboxIndeterminate = ref(true)
const radioValue = ref('option1')
const radioDisabled = ref('option1')
const selectValue = ref('option1')
const sliderValue = ref(50)
const sliderDisabled = ref(30)
const toggleValue = ref(true)
const toggleDisabled = ref(false)
const inputValue = ref('')
const textareaValue = ref('')
const activeAccordion = ref(0)
const activeTab = ref(0)

const selectOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const breadcrumbItems = [
  { label: 'Home', url: '/' },
  { label: 'Components', url: '/components' },
  { label: 'Kitchen Sink' }
]

const stepsItems = [
  { label: 'Personal' },
  { label: 'Address' },
  { label: 'Payment' },
  { label: 'Confirmation' }
]
</script>

<template>
  <div class="kitchen-sink">
    <header class="page-header">
      <h1>Kitchen Sink</h1>
      <p>All components rendered in their various states for quick visual inspection.</p>
    </header>

    <!-- BUTTONS -->
    <section class="component-section">
      <h2 class="section-title">Button</h2>

      <div class="state-group">
        <h3>Variants</h3>
        <div class="component-row">
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Outlined" variant="outlined" />
          <Button label="Text" variant="text" />
        </div>
      </div>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </div>
      </div>

      <div class="state-group">
        <h3>With Icons</h3>
        <div class="component-row">
          <Button label="Left Icon" icon="pi pi-check" icon-pos="left" />
          <Button label="Right Icon" icon="pi pi-arrow-right" icon-pos="right" />
          <Button icon="pi pi-search" />
          <Button icon="pi pi-plus" variant="secondary" />
          <Button icon="pi pi-pencil" variant="outlined" />
        </div>
      </div>

      <div class="state-group">
        <h3>Pill Shape</h3>
        <div class="component-row">
          <Button label="Pill Primary" pill />
          <Button label="Pill Secondary" variant="secondary" pill />
          <Button icon="pi pi-plus" pill />
        </div>
      </div>

      <div class="state-group">
        <h3>Loading State</h3>
        <div class="component-row">
          <Button label="Loading" :is-loading="true" />
          <Button label="Loading" variant="secondary" :is-loading="true" />
          <Button label="Loading" variant="outlined" :is-loading="true" />
        </div>
      </div>

      <div class="state-group">
        <h3>Disabled State</h3>
        <div class="component-row">
          <Button label="Disabled" :is-disabled="true" />
          <Button label="Disabled" variant="secondary" :is-disabled="true" />
          <Button label="Disabled" variant="outlined" :is-disabled="true" />
          <Button label="Disabled" variant="text" :is-disabled="true" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- INPUT TEXT -->
    <section class="component-section">
      <h2 class="section-title">InputText</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <InputText placeholder="Small" size="sm" />
          <InputText placeholder="Medium" size="md" />
          <InputText placeholder="Large" size="lg" />
        </div>
      </div>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row">
          <InputText placeholder="Default" />
          <InputText placeholder="With value" v-model="inputValue" model-value="Some text" />
          <InputText placeholder="Disabled" :is-disabled="true" />
          <InputText placeholder="Invalid" :is-invalid="true" />
        </div>
      </div>

      <div class="state-group">
        <h3>Types</h3>
        <div class="component-row">
          <InputText placeholder="Text" type="text" />
          <InputText placeholder="Password" type="password" />
          <InputText placeholder="Email" type="email" />
          <InputText placeholder="Search" type="search" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- TEXTAREA -->
    <section class="component-section">
      <h2 class="section-title">Textarea</h2>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row component-row--wide">
          <Textarea placeholder="Default textarea" :rows="3" />
          <Textarea placeholder="Disabled" :rows="3" :is-disabled="true" />
          <Textarea placeholder="Invalid" :rows="3" :is-invalid="true" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- CHECKBOX -->
    <section class="component-section">
      <h2 class="section-title">Checkbox</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <Checkbox v-model="checkboxValue" label="Small" size="sm" />
          <Checkbox v-model="checkboxValue" label="Medium" size="md" />
          <Checkbox v-model="checkboxValue" label="Large" size="lg" />
        </div>
      </div>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row">
          <Checkbox :model-value="false" label="Unchecked" />
          <Checkbox :model-value="true" label="Checked" />
          <Checkbox v-model="checkboxIndeterminate" :indeterminate="true" label="Indeterminate" />
          <Checkbox v-model="checkboxDisabled" label="Disabled" :is-disabled="true" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- RADIO BUTTON -->
    <section class="component-section">
      <h2 class="section-title">RadioButton</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <RadioButton v-model="radioValue" value="option1" label="Small" size="sm" name="size-demo" />
          <RadioButton v-model="radioValue" value="option2" label="Medium" size="md" name="size-demo" />
          <RadioButton v-model="radioValue" value="option3" label="Large" size="lg" name="size-demo" />
        </div>
      </div>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row">
          <RadioButton :model-value="null" value="a" label="Unselected" name="state-demo" />
          <RadioButton :model-value="'b'" value="b" label="Selected" name="state-demo2" />
          <RadioButton v-model="radioDisabled" value="option1" label="Disabled" :is-disabled="true" name="state-demo3" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- SELECT -->
    <section class="component-section">
      <h2 class="section-title">Select</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <Select v-model="selectValue" :options="selectOptions" placeholder="Small" size="sm" />
          <Select v-model="selectValue" :options="selectOptions" placeholder="Medium" size="md" />
          <Select v-model="selectValue" :options="selectOptions" placeholder="Large" size="lg" />
        </div>
      </div>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row">
          <Select :options="selectOptions" placeholder="Placeholder" />
          <Select v-model="selectValue" :options="selectOptions" />
          <Select :options="selectOptions" placeholder="Disabled" :is-disabled="true" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- SLIDER -->
    <section class="component-section">
      <h2 class="section-title">Slider</h2>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row component-row--wide">
          <div class="slider-demo">
            <span>Default ({{ sliderValue }})</span>
            <Slider v-model="sliderValue" />
          </div>
          <div class="slider-demo">
            <span>Disabled ({{ sliderDisabled }})</span>
            <Slider v-model="sliderDisabled" :is-disabled="true" />
          </div>
        </div>
      </div>
    </section>

    <Divider />

    <!-- TOGGLE SWITCH -->
    <section class="component-section">
      <h2 class="section-title">ToggleSwitch</h2>

      <div class="state-group">
        <h3>States</h3>
        <div class="component-row">
          <div class="toggle-demo">
            <ToggleSwitch :model-value="false" />
            <span>Off</span>
          </div>
          <div class="toggle-demo">
            <ToggleSwitch :model-value="true" />
            <span>On</span>
          </div>
          <div class="toggle-demo">
            <ToggleSwitch v-model="toggleDisabled" :is-disabled="true" />
            <span>Disabled Off</span>
          </div>
          <div class="toggle-demo">
            <ToggleSwitch :model-value="true" :is-disabled="true" />
            <span>Disabled On</span>
          </div>
        </div>
      </div>
    </section>

    <Divider />

    <!-- AVATAR -->
    <section class="component-section">
      <h2 class="section-title">Avatar</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <Avatar label="S" size="small" />
          <Avatar label="M" size="medium" />
          <Avatar label="L" size="large" />
          <Avatar label="XL" size="xlarge" />
        </div>
      </div>

      <div class="state-group">
        <h3>Shapes</h3>
        <div class="component-row">
          <Avatar label="SQ" shape="square" />
          <Avatar label="CI" shape="circle" />
        </div>
      </div>

      <div class="state-group">
        <h3>Content Types</h3>
        <div class="component-row">
          <Avatar label="AB" />
          <Avatar icon="pi pi-user" />
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- BADGE -->
    <section class="component-section">
      <h2 class="section-title">Badge</h2>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-row">
          <Badge value="1" size="sm" />
          <Badge value="2" size="md" />
          <Badge value="3" size="lg" />
        </div>
      </div>

      <div class="state-group">
        <h3>Severities</h3>
        <div class="component-row">
          <Badge value="Primary" severity="primary" />
          <Badge value="Success" severity="success" />
          <Badge value="Warning" severity="warning" />
          <Badge value="Danger" severity="danger" />
          <Badge value="Info" severity="info" />
        </div>
      </div>

      <div class="state-group">
        <h3>Circle (single char)</h3>
        <div class="component-row">
          <Badge value="1" />
          <Badge value="9" severity="success" />
          <Badge value="!" severity="danger" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- TAG -->
    <section class="component-section">
      <h2 class="section-title">Tag</h2>

      <div class="state-group">
        <h3>Brand Colors</h3>
        <div class="component-row">
          <Tag value="Brand" color="brand" />
          <Tag value="Accent" color="accent" />
          <Tag value="Neutral" color="neutral" />
        </div>
      </div>

      <div class="state-group">
        <h3>Status Colors</h3>
        <div class="component-row">
          <Tag value="Success" color="success" />
          <Tag value="Warning" color="warning" />
          <Tag value="Danger" color="danger" />
          <Tag value="Info" color="info" />
        </div>
      </div>

      <div class="state-group">
        <h3>With Icons</h3>
        <div class="component-row">
          <Tag value="New" icon="pi pi-star" color="brand" />
          <Tag value="Approved" icon="pi pi-check" color="success" />
          <Tag value="Warning" icon="pi pi-exclamation-triangle" color="warning" />
        </div>
      </div>

      <div class="state-group">
        <h3>Rounded</h3>
        <div class="component-row">
          <Tag value="Rounded" color="neutral" :rounded="true" />
          <Tag value="Rounded" color="brand" :rounded="true" />
          <Tag value="Rounded" color="success" :rounded="true" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- CHIP -->
    <section class="component-section">
      <h2 class="section-title">Chip</h2>

      <div class="state-group">
        <h3>Variants</h3>
        <div class="component-row">
          <Chip label="Basic" />
          <Chip label="With Icon" icon="pi pi-user" />
          <Chip label="Removable" :removable="true" />
          <Chip label="With Image" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- MESSAGES -->
    <section class="component-section">
      <h2 class="section-title">Message</h2>

      <div class="state-group">
        <h3>Severities</h3>
        <div class="component-column">
          <Message severity="success">Success message content</Message>
          <Message severity="info">Info message content</Message>
          <Message severity="warn">Warning message content</Message>
          <Message severity="error">Error message content</Message>
        </div>
      </div>

      <div class="state-group">
        <h3>Closable</h3>
        <div class="component-column">
          <Message severity="info" :closable="true">This message can be closed</Message>
        </div>
      </div>
    </section>

    <Divider />

    <!-- INLINE MESSAGE -->
    <section class="component-section">
      <h2 class="section-title">InlineMessage</h2>

      <div class="state-group">
        <h3>Severities</h3>
        <div class="component-row">
          <InlineMessage severity="success">Success</InlineMessage>
          <InlineMessage severity="info">Info</InlineMessage>
          <InlineMessage severity="warn">Warning</InlineMessage>
          <InlineMessage severity="error">Error</InlineMessage>
        </div>
      </div>
    </section>

    <Divider />

    <!-- PROGRESS BAR -->
    <section class="component-section">
      <h2 class="section-title">ProgressBar</h2>

      <div class="state-group">
        <h3>Determinate</h3>
        <div class="component-column">
          <ProgressBar :value="0" />
          <ProgressBar :value="25" />
          <ProgressBar :value="50" />
          <ProgressBar :value="75" />
          <ProgressBar :value="100" />
        </div>
      </div>

      <div class="state-group">
        <h3>Indeterminate</h3>
        <div class="component-column">
          <ProgressBar mode="indeterminate" />
        </div>
      </div>

      <div class="state-group">
        <h3>Without Value Label</h3>
        <div class="component-column">
          <ProgressBar :value="60" :show-value="false" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- PROGRESS SPINNER -->
    <section class="component-section">
      <h2 class="section-title">ProgressSpinner</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-row">
          <ProgressSpinner />
        </div>
      </div>
    </section>

    <Divider />

    <!-- SKELETON -->
    <section class="component-section">
      <h2 class="section-title">Skeleton</h2>

      <div class="state-group">
        <h3>Shapes</h3>
        <div class="component-row">
          <Skeleton width="100px" height="100px" />
          <Skeleton width="100px" height="100px" shape="circle" />
        </div>
      </div>

      <div class="state-group">
        <h3>Sizes</h3>
        <div class="component-column">
          <Skeleton width="100%" height="20px" />
          <Skeleton width="75%" height="20px" />
          <Skeleton width="50%" height="20px" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- CARD -->
    <section class="component-section">
      <h2 class="section-title">Card</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-row component-row--cards">
          <Card>
            <template #title>Simple Card</template>
            <template #content>
              <p>This is the card content.</p>
            </template>
          </Card>
          <Card>
            <template #title>Card with Footer</template>
            <template #subtitle>Subtitle text</template>
            <template #content>
              <p>Card content goes here.</p>
            </template>
            <template #footer>
              <Button label="Action" size="sm" />
            </template>
          </Card>
        </div>
      </div>

      <div class="state-group">
        <h3>Highlighted (Vibrant Border)</h3>
        <div class="component-row component-row--cards">
          <Card variant="highlighted">
            <template #title>Highlighted Card</template>
            <template #content>
              <p>This card has a vibrant gradient border to draw attention.</p>
            </template>
          </Card>
          <Card variant="highlighted">
            <template #title>Featured Content</template>
            <template #subtitle>Premium feature</template>
            <template #content>
              <p>Use for promotions, featured items, or important callouts.</p>
            </template>
            <template #footer>
              <Button label="Learn More" size="sm" />
            </template>
          </Card>
        </div>
      </div>
    </section>

    <Divider />

    <!-- PANEL -->
    <section class="component-section">
      <h2 class="section-title">Panel</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-column">
          <Panel header="Panel Header">
            <p>Panel content goes here.</p>
          </Panel>
        </div>
      </div>

      <div class="state-group">
        <h3>Toggleable</h3>
        <div class="component-column">
          <Panel header="Toggleable Panel" :toggleable="true">
            <p>This panel can be collapsed.</p>
          </Panel>
        </div>
      </div>
    </section>

    <Divider />

    <!-- ACCORDION -->
    <section class="component-section">
      <h2 class="section-title">Accordion</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-column">
          <Accordion v-model:activeIndex="activeAccordion">
            <AccordionTab header="First Tab">
              <p>First tab content.</p>
            </AccordionTab>
            <AccordionTab header="Second Tab">
              <p>Second tab content.</p>
            </AccordionTab>
            <AccordionTab header="Third Tab">
              <p>Third tab content.</p>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </section>

    <Divider />

    <!-- TABS -->
    <section class="component-section">
      <h2 class="section-title">Tabs</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-column">
          <Tabs v-model:activeIndex="activeTab">
            <TabPanel header="Tab 1">
              <p>Tab 1 content.</p>
            </TabPanel>
            <TabPanel header="Tab 2">
              <p>Tab 2 content.</p>
            </TabPanel>
            <TabPanel header="Tab 3">
              <p>Tab 3 content.</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>

    <Divider />

    <!-- BREADCRUMB -->
    <section class="component-section">
      <h2 class="section-title">Breadcrumb</h2>

      <div class="state-group">
        <h3>Default</h3>
        <div class="component-row">
          <Breadcrumb :model="breadcrumbItems" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- STEPS -->
    <section class="component-section">
      <h2 class="section-title">Steps</h2>

      <div class="state-group">
        <h3>Various Active Steps</h3>
        <div class="component-column">
          <Steps :model="stepsItems" :activeStep="0" />
          <Steps :model="stepsItems" :activeStep="1" />
          <Steps :model="stepsItems" :activeStep="2" />
          <Steps :model="stepsItems" :activeStep="3" />
        </div>
      </div>
    </section>

    <Divider />

    <!-- DIVIDER -->
    <section class="component-section">
      <h2 class="section-title">Divider</h2>

      <div class="state-group">
        <h3>Horizontal</h3>
        <div class="component-column">
          <p>Content above</p>
          <Divider />
          <p>Content below</p>
        </div>
      </div>

      <div class="state-group">
        <h3>Vertical</h3>
        <div class="component-row" style="height: 60px;">
          <span>Left</span>
          <Divider layout="vertical" />
          <span>Right</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.kitchen-sink {
  padding: var(--doc-space-xl);
  max-width: 1400px;
}

.page-header {
  margin-bottom: var(--doc-space-2xl);

  h1 {
    margin: 0 0 var(--doc-space-xs);
    font-size: 32px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: var(--doc-text-muted);
    font-size: 16px;
  }
}

.component-section {
  margin-bottom: var(--doc-space-2xl);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 var(--doc-space-l);
  padding-bottom: var(--doc-space-s);
  border-bottom: 2px solid var(--doc-border);
}

.state-group {
  margin-bottom: var(--doc-space-xl);

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--doc-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 var(--doc-space-m);
  }
}

.component-row {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;

  &--wide {
    > * {
      flex: 1;
      min-width: 200px;
    }
  }

  &--cards {
    align-items: stretch;

    > * {
      flex: 1;
      min-width: 280px;
      max-width: 400px;
    }
  }
}

.component-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
  max-width: 600px;
}

.slider-demo {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
  min-width: 200px;

  span {
    font-size: 13px;
    color: var(--doc-text-muted);
  }
}

.toggle-demo {
  display: flex;
  align-items: center;
  gap: var(--doc-space-s);

  span {
    font-size: 13px;
    color: var(--doc-text-muted);
  }
}
</style>
