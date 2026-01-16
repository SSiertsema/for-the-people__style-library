<script setup lang="ts">
import Galleria from '@components/Galleria/Galleria.vue'
import '@components/Galleria/Galleria.scss'

const componentProps = [
  { name: 'items', type: 'Array', default: '[]', description: 'Array of images (string URLs or objects with src, thumbnail, alt, title, description)' },
  { name: 'activeIndex', type: 'Number', default: '0', description: 'Index of the active/visible image' },
  { name: 'fullscreen', type: 'Boolean', default: 'false', description: 'Enable fullscreen mode on preview click' },
  { name: 'showThumbnails', type: 'Boolean', default: 'true', description: 'Show thumbnail strip' },
  { name: 'showItemNavigators', type: 'Boolean', default: 'true', description: 'Show navigation arrows on preview' },
  { name: 'showIndicators', type: 'Boolean', default: 'false', description: 'Show indicator dots' },
  { name: 'circular', type: 'Boolean', default: 'false', description: 'Enable circular navigation' },
  { name: 'autoplay', type: 'Boolean', default: 'false', description: 'Auto-play through images' },
  { name: 'autoplayInterval', type: 'Number', default: '4000', description: 'Auto-play interval in milliseconds' },
  { name: 'thumbnailsPosition', type: 'String', default: '"bottom"', description: 'Position of thumbnails (bottom, top, left, right)' }
]

const events = [
  { name: 'update:activeIndex', description: 'Emitted when the active image changes' },
  { name: 'show', description: 'Emitted when fullscreen opens' },
  { name: 'hide', description: 'Emitted when fullscreen closes' }
]

const sampleImages = [
  {
    src: 'https://picsum.photos/seed/gal1/800/600',
    thumbnail: 'https://picsum.photos/seed/gal1/100/75',
    alt: 'Image 1',
    title: 'Mountain Landscape',
    description: 'A beautiful mountain view at sunset'
  },
  {
    src: 'https://picsum.photos/seed/gal2/800/600',
    thumbnail: 'https://picsum.photos/seed/gal2/100/75',
    alt: 'Image 2',
    title: 'Ocean View',
    description: 'Calm ocean waters on a clear day'
  },
  {
    src: 'https://picsum.photos/seed/gal3/800/600',
    thumbnail: 'https://picsum.photos/seed/gal3/100/75',
    alt: 'Image 3',
    title: 'Forest Path',
    description: 'A winding path through an ancient forest'
  },
  {
    src: 'https://picsum.photos/seed/gal4/800/600',
    thumbnail: 'https://picsum.photos/seed/gal4/100/75',
    alt: 'Image 4',
    title: 'City Lights',
    description: 'Urban skyline illuminated at night'
  },
  {
    src: 'https://picsum.photos/seed/gal5/800/600',
    thumbnail: 'https://picsum.photos/seed/gal5/100/75',
    alt: 'Image 5'
  }
]

const simpleImages = [
  'https://picsum.photos/seed/simple1/800/600',
  'https://picsum.photos/seed/simple2/800/600',
  'https://picsum.photos/seed/simple3/800/600'
]

const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Galleria"
      description="An advanced image gallery with thumbnails, navigation, captions, and fullscreen support."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">Gallery with thumbnails and navigation.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Galleria :items="sampleImages" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Fullscreen</h2>
      <p class="section-description">Click on the preview image to open fullscreen mode.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Galleria :items="sampleImages" fullscreen />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Indicators</h2>
      <p class="section-description">Shows indicator dots instead of thumbnails.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Galleria :items="simpleImages" :showThumbnails="false" showIndicators />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Autoplay</h2>
      <p class="section-description">Automatically cycles through images.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 600px;">
          <Galleria :items="sampleImages" autoplay circular :autoplayInterval="3000" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Thumbnails on Left</h2>
      <p class="section-description">Vertical thumbnail layout.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 700px;">
          <Galleria :items="sampleImages" thumbnailsPosition="left" />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic gallery -->
  <Galleria :items="images" />

  <!-- With fullscreen and captions -->
  <Galleria
    :items="imagesWithCaptions"
    fullscreen
    circular
    @update:activeIndex="onImageChange"
  />

  <!-- Simple URL array -->
  <Galleria
    :items="imageUrls"
    :showThumbnails="false"
    showIndicators
  />

  <!-- Autoplay gallery -->
  <Galleria
    :items="images"
    autoplay
    :autoplayInterval="5000"
    circular
  />
</template>

<script setup>
import Galleria from "@components/Galleria/Galleria.vue"
import "@components/Galleria/Galleria.scss"

// Rich image objects with captions
const imagesWithCaptions = [
  {
    src: "/images/photo1.jpg",
    thumbnail: "/images/thumb1.jpg",
    title: "Photo Title",
    description: "Photo description text"
  },
  // ...
]

// Simple URL array
const imageUrls = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg"
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
      <p class="section-description">Customize the gallery appearance.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="galleria"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <Galleria :items="sampleImages.slice(0, 3)" />
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
  align-items: flex-start;
  gap: var(--doc-space-xl);
  flex-wrap: wrap;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
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
