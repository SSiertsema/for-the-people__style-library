<script setup lang="ts">
const config = useRuntimeConfig()
const colors = config.public.designTokens.colors
</script>

<template>
  <div class="page">
    <PageHeader
      title="Semantische Kleuren"
      description="Betekenisvolle kleur tokens voor consistent gebruik in componenten. Deze tokens vormen de publieke API van het kleuren systeem."
    />

    <section class="info">
      <h2>Over semantische kleuren</h2>
      <p>
        Semantische tokens geven <strong>betekenis</strong> aan kleuren in plaats van hun visuele waarde.
        Door <code>$text-default</code> te gebruiken in plaats van <code>#0a0a0a</code>, past je UI zich automatisch aan bij thema-wisselingen.
      </p>
      <p>
        Alle tokens verwijzen naar het <NuxtLink to="/style-library/kleuren/pallet">kleurenpallet</NuxtLink> met primitieve waarden.
        In dark mode worden dezelfde semantische tokens naar andere primitives gemapped.
      </p>
    </section>

    <section class="usage">
      <h2>Gebruik</h2>
      <div class="usage-grid">
        <div class="usage-block">
          <h3>SCSS</h3>
          <CodeSnippet
            language="scss"
            code='@use "tokens" as *;

.my-element {
  color: $text-default;
  background: $surface-panel;
  border: 1px solid $border-subtle;
}'
          />
        </div>
        <div class="usage-block">
          <h3>CSS</h3>
          <CodeSnippet
            language="css"
            code='.my-element {
  color: var(--text-default);
  background: var(--surface-panel);
  border: 1px solid var(--border-subtle);
}'
          />
        </div>
      </div>
    </section>

    <section class="tokens-header">
      <h2>Alle tokens</h2>
      <p>Klik op een kleur om de CSS variable te kopiëren.</p>
    </section>

    <section v-for="category in colors" :key="category.name" class="color-category">
      <h3>{{ category.name }}</h3>
      <p v-if="category.name === 'Surface'" class="category-description">
        Achtergrondkleuren voor pagina's, panelen, overlays en andere oppervlakken.
      </p>
      <p v-else-if="category.name === 'Text'" class="category-description">
        Tekstkleuren met verschillende niveaus van nadruk en contrast.
      </p>
      <p v-else-if="category.name === 'Border'" class="category-description">
        Randkleuren van subtiel tot sterk voor visuele scheiding.
      </p>
      <p v-else-if="category.name === 'Feedback'" class="category-description">
        Statuskleuren voor succes, waarschuwing, fout en informatie.
      </p>
      <p v-else-if="category.name === 'Intent'" class="category-description">
        Actiekleuren voor interactieve elementen zoals buttons en links.
      </p>
      <p v-else-if="category.name === 'Focus'" class="category-description">
        Focus indicators voor toegankelijkheid.
      </p>
      <div class="color-grid">
        <ColorSwatch
          v-for="token in category.tokens"
          :key="token.variable"
          :name="token.name"
          :variable="token.variable"
          :value="token.value"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1400px;
}

.info {
  margin-bottom: var(--doc-space-2xl);
  max-width: 800px;

  h2 {
    margin: 0 0 var(--doc-space-m);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: var(--doc-accent);
      text-decoration: underline;
    }

    strong {
      color: var(--doc-text-default);
    }

    code {
      background: var(--doc-surface-muted);
      padding: var(--doc-space-3xs) var(--doc-space-2xs);
      border-radius: var(--doc-radius-xs);
      font-size: 0.9em;
    }
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }

  h3 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--doc-space-l);
}

.usage-block {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
}

.tokens-header {
  margin-bottom: var(--doc-space-l);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0;
  }
}

.color-category {
  margin-bottom: var(--doc-space-2xl);

  h3 {
    margin: 0 0 var(--doc-space-xs);
    font-size: 18px;
  }

  .category-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
    font-size: 14px;
  }
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--doc-space-m);
}
</style>
