<script setup lang="ts">
import Splitter from '@components/Splitter/Splitter.vue'
import SplitterPanel from '@components/Splitter/SplitterPanel.vue'
import '@components/Splitter/Splitter.scss'

const props = [
  { name: 'layout', type: 'String', default: '"horizontal"', description: 'Orientation of the splitter: horizontal or vertical' },
  { name: 'gutterSize', type: 'Number', default: '10', description: 'Size of the gutter between panels in pixels' },
  { name: 'stateKey', type: 'String', default: 'null', description: 'Key for storing panel sizes in storage' },
  { name: 'stateStorage', type: 'String', default: '"session"', description: 'Storage mechanism: local or session' }
]

const panelProps = [
  { name: 'size', type: 'Number', default: 'undefined', description: 'Initial size of the panel as a percentage' },
  { name: 'minSize', type: 'Number', default: '5', description: 'Minimum size of the panel as a percentage' }
]

const events = [
  { name: 'resizestart', description: 'Fired when user begins resizing panels' },
  { name: 'resize', description: 'Continuously emitted during panel resizing' },
  { name: 'resizeend', description: 'Fired when panel resizing is complete' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Splitter"
      description="A layout component that allows users to resize content panels by dragging a divider."
    />

    <section class="demo-section">
      <h2>Horizontal Splitter</h2>
      <p class="section-description">Drag the gutter between panels to resize them.</p>
      <div class="demo-box">
        <Splitter layout="horizontal" style="height: 200px;">
          <SplitterPanel :size="30">
            <div class="panel-content">Panel 1</div>
          </SplitterPanel>
          <SplitterPanel :size="70">
            <div class="panel-content">Panel 2</div>
          </SplitterPanel>
        </Splitter>
      </div>
    </section>

    <section class="demo-section">
      <h2>Vertical Splitter</h2>
      <p class="section-description">Vertical layout splits content into top and bottom panels.</p>
      <div class="demo-box">
        <Splitter layout="vertical" style="height: 300px;">
          <SplitterPanel :size="40">
            <div class="panel-content">Top Panel</div>
          </SplitterPanel>
          <SplitterPanel :size="60">
            <div class="panel-content">Bottom Panel</div>
          </SplitterPanel>
        </Splitter>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Panels</h2>
      <p class="section-description">Splitter supports multiple panels with independent gutters.</p>
      <div class="demo-box">
        <Splitter layout="horizontal" style="height: 200px;">
          <SplitterPanel :size="25">
            <div class="panel-content">Panel 1</div>
          </SplitterPanel>
          <SplitterPanel :size="50">
            <div class="panel-content">Panel 2</div>
          </SplitterPanel>
          <SplitterPanel :size="25">
            <div class="panel-content">Panel 3</div>
          </SplitterPanel>
        </Splitter>
      </div>
    </section>

    <section class="demo-section">
      <h2>Nested Splitters</h2>
      <p class="section-description">Create complex layouts by nesting splitters.</p>
      <div class="demo-box">
        <Splitter layout="horizontal" style="height: 300px;">
          <SplitterPanel :size="30">
            <div class="panel-content">Sidebar</div>
          </SplitterPanel>
          <SplitterPanel :size="70">
            <Splitter layout="vertical" style="height: 100%;">
              <SplitterPanel :size="60">
                <div class="panel-content">Main Content</div>
              </SplitterPanel>
              <SplitterPanel :size="40">
                <div class="panel-content">Footer</div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic horizontal splitter -->
  <Splitter layout="horizontal" style="height: 200px;">
    <SplitterPanel :size="30">
      <div>Left Panel</div>
    </SplitterPanel>
    <SplitterPanel :size="70">
      <div>Right Panel</div>
    </SplitterPanel>
  </Splitter>

  <!-- Vertical splitter -->
  <Splitter layout="vertical" style="height: 300px;">
    <SplitterPanel :size="50">Top</SplitterPanel>
    <SplitterPanel :size="50">Bottom</SplitterPanel>
  </Splitter>

  <!-- With state persistence -->
  <Splitter stateKey="my-splitter" stateStorage="local">
    <SplitterPanel :size="40">Persisted</SplitterPanel>
    <SplitterPanel :size="60">Panels</SplitterPanel>
  </Splitter>
</template>

<script setup>
import Splitter from "@components/Splitter/Splitter.vue"
import SplitterPanel from "@components/Splitter/SplitterPanel.vue"
import "@components/Splitter/Splitter.scss"
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Splitter Props</h2>
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

    <section class="props-section">
      <h2>SplitterPanel Props</h2>
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
          <tr v-for="prop in panelProps" :key="prop.name">
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
}

.panel-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--doc-surface-muted);
  padding: var(--doc-space-m);
  font-weight: 500;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section {
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
