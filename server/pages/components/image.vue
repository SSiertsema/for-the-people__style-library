<script setup lang="ts">
import Image from '@components/Image/Image.vue'
import '@components/Image/Image.scss'

const componentProps = [
  { name: 'src', type: 'String', default: '-', description: 'Image source URL (required)' },
  { name: 'alt', type: 'String', default: '""', description: 'Alternative text for the image' },
  { name: 'width', type: 'Number | String', default: 'null', description: 'Image width' },
  { name: 'height', type: 'Number | String', default: 'null', description: 'Image height' },
  { name: 'preview', type: 'Boolean', default: 'false', description: 'Enable preview/lightbox on click' }
]

const events = [
  { name: 'show', description: 'Emitted when preview opens' },
  { name: 'hide', description: 'Emitted when preview closes' },
  { name: 'load', description: 'Emitted when image loads successfully' },
  { name: 'error', description: 'Emitted when image fails to load' }
]

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Image"
      description="Image component with optional preview/lightbox functionality. Click to view full-size images."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A simple image display without preview.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Image
            src="https://picsum.photos/seed/basic/300/200"
            alt="Sample image"
            :width="300"
            :height="200"
          />
          <span class="demo-label">Basic Image</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Preview</h2>
      <p class="section-description">Click on the image to open a full-size preview.</p>
      <div class="demo-row">
        <div class="demo-item">
          <Image
            src="https://picsum.photos/seed/preview1/300/200"
            alt="Image with preview"
            :width="300"
            :height="200"
            preview
          />
          <span class="demo-label">Click to preview</span>
        </div>
        <div class="demo-item">
          <Image
            src="https://picsum.photos/seed/preview2/300/200"
            alt="Another image with preview"
            :width="300"
            :height="200"
            preview
          />
          <span class="demo-label">Click to preview</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Gallery</h2>
      <p class="section-description">Multiple images with preview enabled.</p>
      <div class="demo-gallery">
        <Image
          v-for="i in 6"
          :key="i"
          :src="`https://picsum.photos/seed/gallery${i}/200/200`"
          :alt="`Gallery image ${i}`"
          :width="150"
          :height="150"
          preview
        />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic image -->
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    :width="300"
    :height="200"
  />

  <!-- With preview/lightbox -->
  <Image
    src="/path/to/image.jpg"
    alt="Click to preview"
    :width="300"
    :height="200"
    preview
  />

  <!-- With event handlers -->
  <Image
    src="/path/to/image.jpg"
    alt="Interactive image"
    preview
    @show="onPreviewOpen"
    @hide="onPreviewClose"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup>
import Image from "@components/Image/Image.vue"
import "@components/Image/Image.scss"

const onPreviewOpen = () => console.log("Preview opened")
const onPreviewClose = () => console.log("Preview closed")
const onImageLoad = () => console.log("Image loaded")
const onImageError = () => console.log("Image failed to load")
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
          <tr v-for="prop in componentProps" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the image tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="image"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Without Preview</span>
              <Image
                src="https://picsum.photos/seed/token1/200/150"
                alt="Token preview"
                :width="200"
                :height="150"
              />
            </div>

            <div class="preview-group">
              <span class="preview-label">With Preview (hover to see indicator)</span>
              <Image
                src="https://picsum.photos/seed/token2/200/150"
                alt="Token preview with hover"
                :width="200"
                :height="150"
                preview
              />
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
  align-items: flex-end;
  gap: var(--doc-space-xl);
  flex-wrap: wrap;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--doc-space-s);
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.demo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--doc-space-m);
  max-width: 600px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
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
