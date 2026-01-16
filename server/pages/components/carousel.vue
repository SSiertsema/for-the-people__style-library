<script setup lang="ts">
import Carousel from '@components/Carousel/Carousel.vue'
import '@components/Carousel/Carousel.scss'

const componentProps = [
  { name: 'items', type: 'Array', default: '[]', description: 'Array of items to display in the carousel' },
  { name: 'numVisible', type: 'Number', default: '1', description: 'Number of items visible at once' },
  { name: 'numScroll', type: 'Number', default: '1', description: 'Number of items to scroll at once' },
  { name: 'circular', type: 'Boolean', default: 'false', description: 'Enable circular/infinite scrolling' },
  { name: 'autoplay', type: 'Boolean', default: 'false', description: 'Auto-play slides' },
  { name: 'autoplayInterval', type: 'Number', default: '3000', description: 'Auto-play interval in milliseconds' },
  { name: 'showNavigators', type: 'Boolean', default: 'true', description: 'Show navigation arrows' },
  { name: 'showIndicators', type: 'Boolean', default: 'true', description: 'Show indicator dots' },
  { name: 'orientation', type: 'String', default: '"horizontal"', description: 'Orientation (horizontal, vertical)' }
]

const events = [
  { name: 'update:page', description: 'Emitted when the current page/slide changes' }
]

const sampleItems = [
  { id: 1, title: 'Slide 1', image: 'https://picsum.photos/seed/carousel1/400/250' },
  { id: 2, title: 'Slide 2', image: 'https://picsum.photos/seed/carousel2/400/250' },
  { id: 3, title: 'Slide 3', image: 'https://picsum.photos/seed/carousel3/400/250' },
  { id: 4, title: 'Slide 4', image: 'https://picsum.photos/seed/carousel4/400/250' },
  { id: 5, title: 'Slide 5', image: 'https://picsum.photos/seed/carousel5/400/250' }
]

const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Carousel"
      description="A carousel component for displaying content in a sliding format with navigation controls."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">Simple carousel with navigation and indicators.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <Carousel :items="sampleItems">
            <template #item="{ data }">
              <div class="demo-slide">
                <img :src="data.image" :alt="data.title" />
                <span class="demo-slide-title">{{ data.title }}</span>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Circular Navigation</h2>
      <p class="section-description">Infinite looping carousel.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <Carousel :items="sampleItems" circular>
            <template #item="{ data }">
              <div class="demo-slide">
                <img :src="data.image" :alt="data.title" />
                <span class="demo-slide-title">{{ data.title }}</span>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Autoplay</h2>
      <p class="section-description">Automatically advances slides every 3 seconds.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <Carousel :items="sampleItems" autoplay circular :autoplayInterval="3000">
            <template #item="{ data }">
              <div class="demo-slide">
                <img :src="data.image" :alt="data.title" />
                <span class="demo-slide-title">{{ data.title }}</span>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Navigators</h2>
      <p class="section-description">Navigation via indicators only.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <Carousel :items="sampleItems" :showNavigators="false">
            <template #item="{ data }">
              <div class="demo-slide">
                <img :src="data.image" :alt="data.title" />
                <span class="demo-slide-title">{{ data.title }}</span>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <Carousel
    :items="slides"
    circular
    autoplay
    :autoplayInterval="4000"
    @update:page="onPageChange"
  >
    <template #item="{ data, index }">
      <div class="slide">
        <img :src="data.image" :alt="data.title" />
        <h3>{{ data.title }}</h3>
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import Carousel from "@components/Carousel/Carousel.vue"
import "@components/Carousel/Carousel.scss"

const slides = ref([
  { title: "Slide 1", image: "/img/slide1.jpg" },
  { title: "Slide 2", image: "/img/slide2.jpg" },
  { title: "Slide 3", image: "/img/slide3.jpg" }
])

const onPageChange = (index) => {
  console.log("Current slide:", index)
}
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

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>item</code></td>
            <td><code>{ data, index }</code></td>
            <td>Template for each carousel item</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the carousel appearance.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="carousel"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <Carousel :items="sampleItems.slice(0, 3)">
              <template #item="{ data }">
                <div class="demo-slide">
                  <img :src="data.image" :alt="data.title" />
                  <span class="demo-slide-title">{{ data.title }}</span>
                </div>
              </template>
            </Carousel>
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

.demo-slide {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--doc-radius-m);
  }
}

.demo-slide-title {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
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
