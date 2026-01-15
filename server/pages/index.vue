<script setup lang="ts">
import { Palette, Type, Space, Circle, Layers, Image, Grid3x3, Box, User, ArrowRight } from 'lucide-vue-next'

const components = [
  {
    title: 'Avatar',
    description: 'Avatar component voor gebruikersprofielen.',
    path: '/components/avatar',
    icon: User
  }
]

const styleLibrary = [
  {
    title: 'Kleuren',
    description: 'Kleurenpallet en semantische kleur tokens.',
    path: '/style-library/kleuren',
    icon: Palette
  },
  {
    title: 'Typography',
    description: 'Typografie stijlen voor headings en body text.',
    path: '/style-library/typography',
    icon: Type
  },
  {
    title: 'Spacers',
    description: 'Spacing tokens voor consistente marges en padding.',
    path: '/style-library/spacers',
    icon: Space
  },
  {
    title: 'Radii',
    description: 'Border radius tokens voor afgeronde hoeken.',
    path: '/style-library/radii',
    icon: Circle
  },
  {
    title: 'Levitation',
    description: 'Box shadow niveaus voor elevatie effecten.',
    path: '/style-library/levitation',
    icon: Layers
  },
  {
    title: 'Icons',
    description: 'Beschikbare icons in light en solid varianten.',
    path: '/style-library/icons',
    icon: Image
  },
  {
    title: 'Grid',
    description: 'Het responsive grid systeem.',
    path: '/style-library/grid',
    icon: Grid3x3
  },
  {
    title: 'Container',
    description: 'De container mixin voor responsive padding.',
    path: '/style-library/container',
    icon: Box
  }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="For the People"
      description="Design system met design tokens, mixins en utility classes voor consistente styling."
    />

    <section class="intro">
      <h2>Wat is dit?</h2>
      <p>
        Dit is een documentatie omgeving die de design componenten weergeeft met hun technische implementatie.
      </p>

      <h2>Hoe te gebruiken?</h2>
      <p>De library kan op twee manieren worden gebruikt:</p>

      <h3>1. CSS Utility Classes (via CDN)</h3>
      <CodeSnippet
        language="html"
        code='<link rel="stylesheet" href="https://your-cdn.com/css/utility-classes.css">'
      />

      <h3>2. SCSS Variables & Mixins (via NPM)</h3>
      <CodeSnippet
        language="bash"
        code="npm install @ftp/style-library"
      />
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/variables/colors" as *;
@use "@ftp/style-library/scss/mixins/typography" as *;

.my-heading {
  @include typography("heading", "xl");
  color: $color-primary-600;
}'
      />
    </section>

    <section class="sections">
      <h2>Style Library</h2>
      <div class="section-grid">
        <NuxtLink
          v-for="item in styleLibrary"
          :key="item.path"
          :to="item.path"
          class="section-card"
        >
          <div class="card-icon">
            <component :is="item.icon" :size="24" />
          </div>
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </NuxtLink>
      </div>
    </section>

    <section class="sections">
      <h2>Components</h2>
      <div class="section-grid">
        <NuxtLink
          v-for="item in components"
          :key="item.path"
          :to="item.path"
          class="section-card"
        >
          <div class="card-icon">
            <component :is="item.icon" :size="24" />
          </div>
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <ArrowRight :size="16" class="card-arrow" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.intro {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: var(--doc-space-xl) 0 var(--doc-space-m);

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    margin: var(--doc-space-l) 0 var(--doc-space-s);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);

    a {
      color: var(--doc-accent);
    }
  }
}

.sections {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-l);
  }
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--doc-space-m);
}

.section-card {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  background: var(--doc-surface-panel);
  padding: var(--doc-space-l);
  border-radius: var(--doc-radius-m);
  border: 1px solid var(--doc-border);
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    border-color: var(--doc-accent);
    box-shadow: var(--doc-shadow-xs);
    transform: translateY(-2px);

    .card-arrow {
      transform: translateX(4px);
      color: var(--doc-accent);
    }
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--doc-accent-light);
    color: var(--doc-accent);
    border-radius: var(--doc-radius-m);
    flex-shrink: 0;
  }

  .card-content {
    flex: 1;
    min-width: 0;
  }

  h3 {
    margin: 0 0 var(--doc-space-2xs);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0;
    font-size: 14px;
  }

  .card-arrow {
    color: var(--doc-text-muted);
    flex-shrink: 0;
    transition: transform 0.15s, color 0.15s;
  }
}
</style>
