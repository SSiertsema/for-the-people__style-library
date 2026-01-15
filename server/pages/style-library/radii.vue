<script setup lang="ts">
const config = useRuntimeConfig()
const radii = config.public.designTokens.radii
</script>

<template>
  <div class="page">
    <PageHeader
      title="Radii"
      description="Border radius tokens voor afgeronde hoeken. Klik op een radius om de SCSS variable te kopiëren."
          />

    <section class="rationale">
      <h2>Ontwerp</h2>
      <p>
        De radii schaal volgt de <strong>Fibonacci reeks</strong> (2, 3, 5, 8, 13, 21),
        een natuurlijk resultaat van de gulden snede. Zes waarden zijn voldoende voor
        alle afrondingsbehoeften. Voor pill-vormen gebruik <code>border-radius: 9999px</code>
        direct — dit is bewust geen variabele.
      </p>
    </section>

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/variables/radii" as *;

.my-card {
  border-radius: $radius-m;
}

.my-button {
  border-radius: $radius-s;
}

.my-pill {
  border-radius: 9999px; // niet een variabele
}'
      />
    </section>

    <section class="radius-list">
      <h2>Border Radius</h2>
      <div class="radii">
        <TokenCard
          v-for="radius in radii"
          :key="radius.variable"
          :name="radius.name"
          :variable="radius.variable"
          :value="radius.value"
        >
          <div
            class="radius-preview"
            :style="{ borderRadius: radius.value }"
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

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
  }
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-s);
  }
}

.radius-list {
  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.radii {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.radius-preview {
  width: 64px;
  height: 64px;
  background: var(--doc-accent);
}
</style>
