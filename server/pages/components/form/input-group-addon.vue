<script setup lang="ts">
import InputGroup from '@components/InputGroup/InputGroup.vue'
import InputGroupAddon from '@components/InputGroupAddon/InputGroupAddon.vue'
import InputText from '@components/InputText/InputText.vue'
import '@components/InputGroup/InputGroup.scss'
import '@components/InputGroupAddon/InputGroupAddon.scss'
import '@components/InputText/InputText.scss'

const componentProps = [
  { name: 'size', type: 'String', default: '"md"', description: 'Size: sm, md, lg - should match input size' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputGroupAddon"
      description="Addon element for InputGroup to display icons, text, or other content."
    />

    <ComponentDemo
      name="InputGroupAddon"
      description="An addon element that pairs with InputGroup for additional context."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Text Addons</h4>
        <div class="demo-row demo-row--column">
          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <InputText placeholder="Price" />
          </InputGroup>
          <InputGroup>
            <InputText placeholder="Email" />
            <InputGroupAddon>@example.com</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>+1</InputGroupAddon>
            <InputText placeholder="Phone number" />
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <InputGroup>
            <InputGroupAddon size="sm">@</InputGroupAddon>
            <InputText size="sm" placeholder="Small" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon size="md">@</InputGroupAddon>
            <InputText size="md" placeholder="Medium" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon size="lg">@</InputGroupAddon>
            <InputText size="lg" placeholder="Large" />
          </InputGroup>
        </div>
      </div>

      <div class="demo-section">
        <h4>Both Sides</h4>
        <div class="demo-row">
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputText placeholder="domain" />
            <InputGroupAddon>.com</InputGroupAddon>
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

.demo-row--column {
  flex-direction: column;
  align-items: flex-start;
}
</style>
