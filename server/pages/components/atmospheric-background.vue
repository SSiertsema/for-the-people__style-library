<script setup lang="ts">
import AtmosphericBackground from '@components/AtmosphericBackground/AtmosphericBackground.vue'
import ParticleBackground from '@components/ParticleBackground/ParticleBackground.vue'

const variants = ['default', 'vibrant', 'dark', 'subtle']

const atmosphericProps = [
  { name: 'variant', type: 'String', default: '"default"', description: 'Background variant: default, vibrant, dark, subtle' },
  { name: 'particles', type: 'Boolean', default: 'true', description: 'Enable particle/star effect' },
  { name: 'particleCount', type: 'Number', default: '60', description: 'Number of particles' },
  { name: 'particleColor', type: 'String', default: '"rgba(255,255,255,0.8)"', description: 'Particle color' },
  { name: 'parallax', type: 'Boolean', default: 'false', description: 'Enable parallax effect on mouse move' },
]

const particleProps = [
  { name: 'particleCount', type: 'Number', default: '80', description: 'Number of particles' },
  { name: 'particleColor', type: 'String', default: '"rgba(255,255,255,0.8)"', description: 'Particle color (rgba recommended)' },
  { name: 'minSize', type: 'Number', default: '0.5', description: 'Minimum particle size in pixels' },
  { name: 'maxSize', type: 'Number', default: '2', description: 'Maximum particle size in pixels' },
  { name: 'speed', type: 'Number', default: '0.2', description: 'Movement speed multiplier' },
  { name: 'twinkle', type: 'Boolean', default: 'true', description: 'Enable twinkling effect' },
  { name: 'parallax', type: 'Boolean', default: 'false', description: 'Enable parallax on mouse move' },
  { name: 'fixed', type: 'Boolean', default: 'false', description: 'Fixed position covering viewport' },
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Atmospheric Background"
      description="Rich, layered background with warm glow effects and animated star particles. Perfect for hero sections and landing pages."
    />

    <section class="demo-section">
      <h2>Variants</h2>
      <p class="section-description">Four intensity variants for different use cases.</p>
      <div class="demo-grid">
        <div v-for="variant in variants" :key="variant" class="demo-card">
          <AtmosphericBackground :variant="variant" class="demo-preview">
            <div class="demo-preview__content">
              <span class="demo-preview__label">{{ variant }}</span>
            </div>
          </AtmosphericBackground>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Parallax</h2>
      <p class="section-description">Move your mouse over the preview to see the parallax effect.</p>
      <div class="demo-card demo-card--large">
        <AtmosphericBackground variant="vibrant" :parallax="true" class="demo-preview demo-preview--large">
          <div class="demo-preview__content">
            <h3>Parallax Effect</h3>
            <p>Stars move with mouse</p>
          </div>
        </AtmosphericBackground>
      </div>
    </section>

    <section class="demo-section">
      <h2>Particles Only</h2>
      <p class="section-description">Use ParticleBackground component standalone for custom backgrounds.</p>
      <div class="demo-card demo-card--large">
        <div class="demo-preview demo-preview--large demo-preview--custom">
          <ParticleBackground
            :particle-count="100"
            particle-color="rgba(255, 180, 100, 0.9)"
            :max-size="3"
            :twinkle="true"
          />
          <div class="demo-preview__content">
            <h3>Custom Particles</h3>
            <p>Warm colored, larger particles</p>
          </div>
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Full atmospheric background -->
  <AtmosphericBackground variant="vibrant" :parallax="true">
    <YourContent />
  </AtmosphericBackground>

  <!-- Particles only (for custom backgrounds) -->
  <div class="my-custom-bg">
    <ParticleBackground
      :particle-count="80"
      particle-color="rgba(255, 255, 255, 0.8)"
      :twinkle="true"
    />
    <div class="content">...</div>
  </div>
</template>

<script setup>
import AtmosphericBackground from "@components/AtmosphericBackground/AtmosphericBackground.vue"
import ParticleBackground from "@components/ParticleBackground/ParticleBackground.vue"
</script>

<style>
/* SCSS Mixin alternative */
@use "@lib/scss/mixins/surface-atmospheric" as *;

.my-section {
  @include surface-atmospheric("top", 0.15, true);
}

.my-section--vibrant {
  @include surface-atmospheric-vibrant();
}
</style>'
      />
    </section>

    <section class="props-section">
      <h2>AtmosphericBackground Props</h2>
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
          <tr v-for="prop in atmosphericProps" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="props-section">
      <h2>ParticleBackground Props</h2>
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
          <tr v-for="prop in particleProps" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--doc-space-m);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.demo-card {
  border-radius: var(--doc-radius-m);
  overflow: hidden;
  border: 1px solid var(--doc-border);
}

.demo-card--large {
  grid-column: 1 / -1;
}

.demo-preview {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-preview--large {
  height: 300px;
}

.demo-preview--custom {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.demo-preview__content {
  text-align: center;
  color: white;

  h3 {
    margin: 0 0 var(--doc-space-xs);
    font-size: 18px;
  }

  p {
    margin: 0;
    opacity: 0.7;
    font-size: 14px;
  }
}

.demo-preview__label {
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  background: rgba(255, 255, 255, 0.1);
  padding: var(--doc-space-xs) var(--doc-space-m);
  border-radius: var(--doc-radius-m);
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section {
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
