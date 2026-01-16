<script setup lang="ts">
import InputIcon from '@components/InputIcon/InputIcon.vue'
import InputText from '@components/InputText/InputText.vue'
import '@components/InputIcon/InputIcon.scss'
import '@components/InputText/InputText.scss'
import { Search, Mail, User, Eye } from 'lucide-vue-next'

const searchValue = ref('')
const emailValue = ref('')

const componentProps = [
  { name: 'size', type: 'String', default: '"md"', description: 'Icon size: sm, md, lg' },
  { name: 'position', type: 'String', default: '"left"', description: 'Icon position: left, right' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="InputIcon"
      description="Icon wrapper for positioning icons inside input fields."
    />

    <ComponentDemo
      name="InputIcon"
      description="Positions icons inside or alongside input fields for visual context."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Left Icon (Default)</h4>
        <div class="demo-row demo-row--column">
          <div class="input-wrapper">
            <InputIcon position="left">
              <Search />
            </InputIcon>
            <InputText v-model="searchValue" placeholder="Search..." class="has-icon-left" />
          </div>
          <div class="input-wrapper">
            <InputIcon position="left">
              <Mail />
            </InputIcon>
            <InputText v-model="emailValue" placeholder="Email address" class="has-icon-left" />
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Right Icon</h4>
        <div class="demo-row demo-row--column">
          <div class="input-wrapper">
            <InputText placeholder="Username" class="has-icon-right" />
            <InputIcon position="right">
              <User />
            </InputIcon>
          </div>
          <div class="input-wrapper">
            <InputText type="password" placeholder="Password" class="has-icon-right" />
            <InputIcon position="right">
              <Eye />
            </InputIcon>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Both Icons</h4>
        <div class="demo-row demo-row--column">
          <div class="input-wrapper">
            <InputIcon position="left">
              <Search />
            </InputIcon>
            <InputText placeholder="Search users..." class="has-icon-both" />
            <InputIcon position="right">
              <User />
            </InputIcon>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>Sizes</h4>
        <div class="demo-row demo-row--column">
          <div class="input-wrapper">
            <InputIcon position="left" size="sm">
              <Search />
            </InputIcon>
            <InputText size="sm" placeholder="Small" class="has-icon-left" />
          </div>
          <div class="input-wrapper">
            <InputIcon position="left" size="md">
              <Search />
            </InputIcon>
            <InputText size="md" placeholder="Medium" class="has-icon-left" />
          </div>
          <div class="input-wrapper">
            <InputIcon position="left" size="lg">
              <Search />
            </InputIcon>
            <InputText size="lg" placeholder="Large" class="has-icon-left" />
          </div>
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
  max-width: 400px;
}

.demo-row--column {
  flex-direction: column;
  align-items: stretch;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

// Adjust input padding when icons are present
:deep(.has-icon-left) {
  padding-left: 40px;
}

:deep(.has-icon-right) {
  padding-right: 40px;
}

:deep(.has-icon-both) {
  padding-left: 40px;
  padding-right: 40px;
}
</style>
