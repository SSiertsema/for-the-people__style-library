<script setup lang="ts">
import ImageCompare from '@components/ImageCompare/ImageCompare.vue'
import '@components/ImageCompare/ImageCompare.scss'

const props = [
  { name: 'initialPosition', type: 'Number', default: '50', description: 'Initial slider position (0-100)' },
  { name: 'ariaLabel', type: 'String', default: '"Image comparison slider"', description: 'Accessible label for the slider' },
  { name: 'ariaLabelledBy', type: 'String', default: 'null', description: 'ID of element that labels the slider' }
]

const events = [
  { name: 'change', description: 'Emitted when slider position changes, with current position (0-100)' }
]

const slots = [
  { name: 'before', description: 'Content for the before (left) image' },
  { name: 'after', description: 'Content for the after (right) image' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="ImageCompare"
      description="A component for comparing two images with a draggable slider, perfect for before/after comparisons."
    />

    <section class="demo-section">
      <h2>Basic Usage</h2>
      <p class="section-description">Drag the slider to compare the two images.</p>
      <div class="demo-box">
        <ImageCompare style="width: 100%; max-width: 600px; aspect-ratio: 16/9;">
          <template #before>
            <img src="https://picsum.photos/seed/before/800/450?grayscale" alt="Before image" />
          </template>
          <template #after>
            <img src="https://picsum.photos/seed/before/800/450" alt="After image" />
          </template>
        </ImageCompare>
      </div>
    </section>

    <section class="demo-section">
      <h2>Different Initial Position</h2>
      <p class="section-description">Start with the slider at 25% position.</p>
      <div class="demo-box">
        <ImageCompare :initialPosition="25" style="width: 100%; max-width: 600px; aspect-ratio: 16/9;">
          <template #before>
            <img src="https://picsum.photos/seed/compare2/800/450?blur=5" alt="Blurred image" />
          </template>
          <template #after>
            <img src="https://picsum.photos/seed/compare2/800/450" alt="Sharp image" />
          </template>
        </ImageCompare>
      </div>
    </section>

    <section class="demo-section">
      <h2>Square Aspect Ratio</h2>
      <p class="section-description">Works with any aspect ratio.</p>
      <div class="demo-box">
        <ImageCompare :initialPosition="70" style="width: 300px; aspect-ratio: 1;">
          <template #before>
            <img src="https://picsum.photos/seed/square/400/400?grayscale" alt="Before" />
          </template>
          <template #after>
            <img src="https://picsum.photos/seed/square/400/400" alt="After" />
          </template>
        </ImageCompare>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic image comparison -->
  <ImageCompare style="width: 600px; aspect-ratio: 16/9;">
    <template #before>
      <img src="/before.jpg" alt="Before" />
    </template>
    <template #after>
      <img src="/after.jpg" alt="After" />
    </template>
  </ImageCompare>

  <!-- With initial position -->
  <ImageCompare :initialPosition="25" @change="onPositionChange">
    <template #before>
      <img src="/old.jpg" alt="Old version" />
    </template>
    <template #after>
      <img src="/new.jpg" alt="New version" />
    </template>
  </ImageCompare>
</template>

<script setup>
import ImageCompare from "@components/ImageCompare/ImageCompare.vue"
import "@components/ImageCompare/ImageCompare.scss"

const onPositionChange = (position) => {
  console.log("Position:", position)
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
          <tr v-for="prop in props" :key="prop.name">
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

.demo-box {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
  display: flex;
  justify-content: center;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.slots-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
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
