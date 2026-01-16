<script setup lang="ts">
import Divider from '@components/Divider/Divider.vue'
import '@components/Divider/Divider.scss'

const props = [
  { name: 'layout', type: 'String', default: '"horizontal"', description: 'Orientation of the divider: horizontal or vertical' },
  { name: 'align', type: 'String', default: '"center"', description: 'Alignment of content: left, center, right (horizontal) or top, center, bottom (vertical)' },
  { name: 'type', type: 'String', default: '"solid"', description: 'Border style: solid, dashed, or dotted' }
]

const slots = [
  { name: 'default', description: 'Content to display within the divider (e.g., "OR" text)' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Divider"
      description="A separator component to divide content sections visually."
    />

    <section class="demo-section">
      <h2>Basic Horizontal Divider</h2>
      <p class="section-description">A simple horizontal line to separate content.</p>
      <div class="demo-box">
        <p>Content above the divider</p>
        <Divider />
        <p>Content below the divider</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>Divider with Content</h2>
      <p class="section-description">Add text or other content within the divider.</p>
      <div class="demo-box">
        <p>First section</p>
        <Divider>OR</Divider>
        <p>Second section</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>Content Alignment</h2>
      <p class="section-description">Position the content to the left, center, or right.</p>
      <div class="demo-box">
        <Divider align="left">Left</Divider>
        <Divider align="center">Center</Divider>
        <Divider align="right">Right</Divider>
      </div>
    </section>

    <section class="demo-section">
      <h2>Border Types</h2>
      <p class="section-description">Different border styles for the divider line.</p>
      <div class="demo-box">
        <p>Solid (default)</p>
        <Divider type="solid" />
        <p>Dashed</p>
        <Divider type="dashed" />
        <p>Dotted</p>
        <Divider type="dotted" />
      </div>
    </section>

    <section class="demo-section">
      <h2>Vertical Divider</h2>
      <p class="section-description">Use vertical orientation to separate inline content.</p>
      <div class="demo-box demo-box--flex">
        <span>Item 1</span>
        <Divider layout="vertical" />
        <span>Item 2</span>
        <Divider layout="vertical" />
        <span>Item 3</span>
      </div>
    </section>

    <section class="demo-section">
      <h2>Vertical with Content</h2>
      <p class="section-description">Vertical dividers can also contain content.</p>
      <div class="demo-box demo-box--flex demo-box--tall">
        <span>Left</span>
        <Divider layout="vertical">|</Divider>
        <span>Right</span>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic horizontal divider -->
  <Divider />

  <!-- With content -->
  <Divider>OR</Divider>

  <!-- Aligned content -->
  <Divider align="left">Section</Divider>

  <!-- Dashed style -->
  <Divider type="dashed" />

  <!-- Vertical divider -->
  <Divider layout="vertical" />
</template>

<script setup>
import Divider from "@components/Divider/Divider.vue"
import "@components/Divider/Divider.scss"
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

  p {
    margin: 0;
  }
}

.demo-box--flex {
  display: flex;
  align-items: center;
  gap: 0;
  min-height: 60px;
}

.demo-box--tall {
  min-height: 120px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
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
