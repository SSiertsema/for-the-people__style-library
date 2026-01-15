<script setup lang="ts">
const icons = [
  'house',
  'check',
  'magnifying-glass',
  'download',
  'user',
  'envelope',
  'location-dot',
  'arrow-up',
  'arrow-right',
  'arrow-down',
  'arrow-left',
  'chevron-up',
  'chevron-right',
  'chevron-down',
  'chevron-left'
]

const variants = ['light', 'solid']
const { copied, copy } = useClipboard()

function copyClass(variant: string, icon: string) {
  copy(`icon-${variant}--${icon}`)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Icons"
      description="Beschikbare icons in light en solid varianten. De icons worden geladen via CSS classes."
          />

    <section class="usage">
      <h2>Installatie</h2>
      <p>Voeg de icon stylesheets toe aan de head van je HTML:</p>
      <CodeSnippet
        language="html"
        :code="`<link rel=&quot;stylesheet&quot; href=&quot;https://your-cdn.com/icons/icons-light.css&quot;>
<link rel=&quot;stylesheet&quot; href=&quot;https://your-cdn.com/icons/icons-solid.css&quot;>`"
      />

      <h2>Gebruik</h2>
      <p>Gebruik de icon class op een element:</p>
      <CodeSnippet
        language="html"
        :code="`<i class=&quot;icon-light--house&quot;></i>
<i class=&quot;icon-solid--user&quot;></i>`"
      />
    </section>

    <section v-for="variant in variants" :key="variant" class="icon-section">
      <h2>{{ variant === 'light' ? 'Light' : 'Solid' }} Icons</h2>
      <div class="icon-grid">
        <div
          v-for="icon in icons"
          :key="`${variant}-${icon}`"
          class="icon-card"
          @click="copyClass(variant, icon)"
        >
          <div class="icon-preview">
            <i :class="`icon-${variant}--${icon}`" />
          </div>
          <div class="icon-name">{{ icon }}</div>
          <div class="icon-class">icon-{{ variant }}--{{ icon }}</div>
        </div>
      </div>
    </section>

    <section class="note-section">
      <h2>Opmerking</h2>
      <p>
        De icon font is een custom subset van Font Awesome 6.4.0 Pro.
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: var(--doc-space-l) 0 var(--doc-space-s);

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-s);
  }
}

.icon-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-l);
  }
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--doc-space-m);
}

.icon-card {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-m);
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: var(--doc-accent);
    box-shadow: var(--doc-shadow-xs);
  }
}

.icon-preview {
  font-size: 24px;
  color: var(--doc-accent);
  margin-bottom: var(--doc-space-s);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--doc-text-default);
  margin-bottom: var(--doc-space-3xs);
}

.icon-class {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 10px;
  color: var(--doc-text-subtle);
  word-break: break-all;
}

.note-section {
  h2 {
    margin: 0 0 var(--doc-space-s);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0;
  }
}
</style>
