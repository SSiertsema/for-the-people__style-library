<script setup lang="ts">
import InputGroup from '@components/InputGroup/InputGroup.vue'
import InputGroupAddon from '@components/InputGroupAddon/InputGroupAddon.vue'
import InputText from '@components/InputText/InputText.vue'
import Button from '@components/Button/Button.vue'
import '@components/InputGroup/InputGroup.scss'
import '@components/InputGroupAddon/InputGroupAddon.scss'
import '@components/InputText/InputText.scss'
import '@components/Button/Button.scss'

const searchValue = ref('')
const urlValue = ref('')

const componentProps = [
  { name: 'fluid', type: 'Boolean', default: 'false', description: 'Makes the input group take full width' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputGroup"
      description="Container for grouping inputs with addons like icons, text, or buttons."
    />

    <ComponentDemo
      name="InputGroup"
      description="Groups form inputs with addons for enhanced UI patterns."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic with Text Addons</h4>
        <div class="demo-row">
          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <InputText placeholder="Amount" />
            <InputGroupAddon>.00</InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Prefix</h4>
        <div class="demo-row">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputText v-model="urlValue" placeholder="www.example.com" />
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Button</h4>
        <div class="demo-row">
          <InputGroup>
            <InputText v-model="searchValue" placeholder="Search..." />
            <Button label="Search" />
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>Fluid Width</h4>
        <div class="demo-row demo-row--full">
          <InputGroup fluid>
            <InputGroupAddon>@</InputGroupAddon>
            <InputText placeholder="Username" />
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>Multiple Addons</h4>
        <div class="demo-row">
          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <InputGroupAddon>0.00</InputGroupAddon>
            <InputText placeholder="Enter amount" />
            <InputGroupAddon>per</InputGroupAddon>
            <InputGroupAddon>month</InputGroupAddon>
          </InputGroup>
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
}

.demo-row--full {
  max-width: 400px;
}
</style>
