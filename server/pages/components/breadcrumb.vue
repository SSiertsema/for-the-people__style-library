<script setup lang="ts">
import Breadcrumb from '@components/Breadcrumb/Breadcrumb.vue'
import '@components/Breadcrumb/Breadcrumb.scss'

const props = [
  { name: 'model', type: 'Array', default: '[]', description: 'Array of menu items with label, url, and icon properties' },
  { name: 'home', type: 'Object', default: '-', description: 'Home item configuration with label, url, and icon properties' }
]

const slots = [
  { name: 'separator', description: 'Custom separator content between breadcrumb items' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

// Demo data
const basicItems = [
  { label: 'Electronics' },
  { label: 'Computers' },
  { label: 'Laptops' }
]

const itemsWithLinks = [
  { label: 'Electronics', url: '#' },
  { label: 'Computers', url: '#' },
  { label: 'Laptops' }
]

const itemsWithIcons = [
  { label: 'Electronics', url: '#', icon: 'pi pi-bolt' },
  { label: 'Computers', url: '#', icon: 'pi pi-desktop' },
  { label: 'Laptops', icon: 'pi pi-laptop' }
]

const homeItem = { url: '#' }
const homeItemWithLabel = { label: 'Home', url: '#', icon: 'pi pi-home' }
</script>

<template>
  <div class="page">
    <PageHeader
      title="Breadcrumb"
      description="Breadcrumb provides contextual information about page hierarchy."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A basic breadcrumb with text labels.</p>
      <div class="demo-row">
        <Breadcrumb :model="basicItems" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Links</h2>
      <p class="section-description">Breadcrumb items can be navigable links. The last item is typically not a link as it represents the current page.</p>
      <div class="demo-row">
        <Breadcrumb :model="itemsWithLinks" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Home Icon</h2>
      <p class="section-description">A home icon can be displayed as the first item in the breadcrumb.</p>
      <div class="demo-row">
        <Breadcrumb :home="homeItem" :model="itemsWithLinks" />
      </div>
    </section>

    <section class="demo-section">
      <h2>With Icons</h2>
      <p class="section-description">Each breadcrumb item can have an icon.</p>
      <div class="demo-row">
        <Breadcrumb :home="homeItemWithLabel" :model="itemsWithIcons" />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic breadcrumb -->
  <Breadcrumb :model="items" />

  <!-- With home icon -->
  <Breadcrumb :home="{ url: &apos;/&apos; }" :model="items" />

  <!-- With icons -->
  <Breadcrumb
    :home="{ label: &apos;Home&apos;, url: &apos;/&apos;, icon: &apos;pi pi-home&apos; }"
    :model="itemsWithIcons"
  />
</template>

<script setup>
import Breadcrumb from "@components/Breadcrumb/Breadcrumb.vue"
import "@components/Breadcrumb/Breadcrumb.scss"

const items = [
  { label: "Electronics", url: "/electronics" },
  { label: "Computers", url: "/electronics/computers" },
  { label: "Laptops" }
]

const itemsWithIcons = [
  { label: "Electronics", url: "/electronics", icon: "pi pi-bolt" },
  { label: "Computers", url: "/electronics/computers", icon: "pi pi-desktop" },
  { label: "Laptops", icon: "pi pi-laptop" }
]
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize breadcrumb tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="breadcrumb"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Basic</span>
              <div class="preview-row">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                  <ol class="breadcrumb__list">
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link">
                        <span class="breadcrumb__label">Home</span>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link">
                        <span class="breadcrumb__label">Category</span>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item breadcrumb__item--current">
                      <span class="breadcrumb__text" aria-current="page">
                        <span class="breadcrumb__label">Current Page</span>
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Home Icon</span>
              <div class="preview-row">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                  <ol class="breadcrumb__list">
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link" aria-label="Home">
                        <svg class="breadcrumb__home-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M2 6.5L8 2L14 6.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 14V9H10V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link">
                        <span class="breadcrumb__label">Products</span>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item breadcrumb__item--current">
                      <span class="breadcrumb__text" aria-current="page">
                        <span class="breadcrumb__label">Details</span>
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Icons</span>
              <div class="preview-row">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                  <ol class="breadcrumb__list">
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link">
                        <i class="pi pi-home breadcrumb__icon"></i>
                        <span class="breadcrumb__label">Home</span>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item">
                      <a href="#" class="breadcrumb__link">
                        <i class="pi pi-folder breadcrumb__icon"></i>
                        <span class="breadcrumb__label">Files</span>
                      </a>
                    </li>
                    <li class="breadcrumb__separator" aria-hidden="true">
                      <svg class="breadcrumb__separator-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </li>
                    <li class="breadcrumb__item breadcrumb__item--current">
                      <span class="breadcrumb__text" aria-current="page">
                        <i class="pi pi-file breadcrumb__icon"></i>
                        <span class="breadcrumb__label">Document</span>
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.demo-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
  }
}

.demo-row {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.slots-section,
.tokens-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
  }
}

.token-editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--doc-space-l);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.token-editor-panel {
  min-width: 0;
}

.live-preview-panel {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.preview-header {
  padding: var(--doc-space-m);
  border-bottom: 1px solid var(--doc-border);
  background: var(--doc-surface-muted);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.preview-content {
  padding: var(--doc-space-l);
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-l);
}

.preview-group {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.preview-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--doc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-row {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  flex-wrap: wrap;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);
  overflow: hidden;

  th, td {
    padding: var(--doc-space-s) var(--doc-space-m);
    text-align: left;
    border-bottom: 1px solid var(--doc-border);
  }

  th {
    background: var(--doc-surface-muted);
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--doc-text-muted);
  }

  td {
    font-size: 14px;
  }

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
    font-size: 13px;
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>
