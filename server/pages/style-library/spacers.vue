<script setup lang="ts">
const config = useRuntimeConfig()
const spacers = config.public.designTokens.spacers
</script>

<template>
  <div class="page">
    <PageHeader
      title="Spacers"
      description="Spacing tokens voor consistente marges en padding. Klik op een spacer om de SCSS variable te kopiëren."
          />

    <section class="rationale">
      <h2>Ontwerp</h2>
      <p>
        De spacer schaal gebruikt de <strong>gulden snede (φ ≈ 1.618)</strong> als ratio.
        Dit zorgt voor een natuurlijke, harmonieuze progressie waarbij minder stappen
        nodig zijn om het volledige bereik te dekken. Naamgeving volgt t-shirt sizing
        (3xs tot 4xl) voor consistentie met typografie.
      </p>
    </section>

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/variables/spacers" as *;

.my-element {
  padding: $space-m;
  margin-bottom: $space-l;
  gap: $space-xs;
}'
      />
    </section>

    <section class="spacer-list">
      <h2>Spacers</h2>
      <div class="spacers">
        <TokenCard
          v-for="spacer in spacers"
          :key="spacer.variable"
          :name="spacer.name"
          :variable="spacer.variable"
          :value="spacer.value"
        >
          <div
            class="spacer-preview"
            :style="{ width: spacer.value, height: spacer.value }"
          />
        </TokenCard>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-2xl);
  max-width: 1000px;
}

.rationale {
  margin-bottom: var(--doc-space-xl);

  h2 {
    margin: 0 0 var(--doc-space-s);
  }

  p {
    margin: 0;
    max-width: 65ch;
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-s);
  }
}

.spacer-list {
  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.spacers {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.spacer-preview {
  background: var(--doc-accent);
  border-radius: var(--doc-radius-s);
  min-width: 16px;
  min-height: 16px;
  max-width: 128px;
  max-height: 128px;
}
</style>
