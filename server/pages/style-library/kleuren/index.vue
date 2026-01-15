<script setup lang="ts">
</script>

<template>
  <div class="page">
    <PageHeader
      title="Kleuren Systeem"
      description="Een gelaagd kleur token systeem voor consistente en themable styling."
    />

    <section class="layers">
      <h2>Kleurlagen</h2>
      <p>
        Het kleuren systeem bestaat uit drie lagen die samen een flexibel en onderhoudbaar geheel vormen:
      </p>

      <div class="layer-cards">
        <NuxtLink to="/style-library/kleuren/pallet" class="layer-card layer-card--link">
          <h3>1. Primitives</h3>
          <p class="layer-description">
            Ruwe kleurwaarden georganiseerd in schalen (50-950). Dit zijn de bouwstenen van het systeem.
          </p>
          <p class="layer-note">
            <strong>Nooit direct gebruiken</strong> in componenten of applicatiecode.
          </p>
          <span class="layer-link">
            Bekijk het kleurenpallet →
          </span>
        </NuxtLink>

        <NuxtLink to="/style-library/kleuren/semantisch" class="layer-card layer-card--link">
          <h3>2. Semantics</h3>
          <p class="layer-description">
            Betekenisvolle tokens die verwijzen naar primitives. Dit is de publieke API van het kleuren systeem.
          </p>
          <p class="layer-note">
            <strong>Altijd gebruiken</strong> voor alle styling in componenten.
          </p>
          <span class="layer-link">
            Bekijk semantische kleuren →
          </span>
        </NuxtLink>

        <div class="layer-card">
          <h3>3. Themes</h3>
          <p class="layer-description">
            Override mappings die semantische tokens naar andere primitives verwijzen per thema.
          </p>
          <p class="layer-note">
            Maakt <strong>dark mode</strong> en <strong>brand theming</strong> mogelijk.
          </p>
          <code class="layer-example">[data-theme="dark"] { --surface-canvas: #0a0a0a; }</code>
        </div>
      </div>
    </section>

    <section class="flow">
      <h2>Hoe het werkt</h2>
      <div class="flow-diagram">
        <div class="flow-step">
          <span class="flow-label">Primitive</span>
          <code>neutral.0</code>
          <span class="flow-value">#ffffff</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="flow-label">Semantic</span>
          <code>surface.canvas</code>
          <span class="flow-value">verwijst naar neutral.0</span>
        </div>
        <span class="flow-arrow">→</span>
        <div class="flow-step">
          <span class="flow-label">CSS Output</span>
          <code>--surface-canvas</code>
          <span class="flow-value">#ffffff</span>
        </div>
      </div>
      <p class="flow-explanation">
        In dark mode verwijst <code>surface.canvas</code> naar <code>neutral.950</code> (#0a0a0a).
        Door semantische tokens te gebruiken past je UI zich automatisch aan het actieve thema aan.
      </p>
    </section>

    <section class="usage">
      <h2>Gebruik in SCSS</h2>
      <CodeSnippet
        language="scss"
        code='@use "tokens" as *;

.my-element {
  color: $text-default;
  background: $surface-panel;
  border: 1px solid $border-subtle;
}'
      />
      <p class="usage-note">
        Alle SCSS variabelen verwijzen naar CSS custom properties, waardoor runtime theme switching mogelijk is.
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1400px;
}

.layers {
  margin-bottom: var(--doc-space-2xl);

  > p {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
    line-height: 1.6;
  }

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.layer-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--doc-space-m);
}

.layer-card {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
  text-decoration: none;
  color: inherit;
  display: block;

  h3 {
    margin: 0 0 var(--doc-space-s);
    font-size: 16px;
  }

  .layer-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-s);
    line-height: 1.5;
  }

  .layer-note {
    color: var(--doc-text-subtle);
    font-size: 14px;
    margin: 0 0 var(--doc-space-m);

    strong {
      color: var(--doc-text-default);
    }
  }

  .layer-link {
    color: var(--doc-accent);
    font-weight: 500;
    font-size: 14px;
  }

  .layer-example {
    display: block;
    background: var(--doc-surface-muted);
    padding: var(--doc-space-xs) var(--doc-space-s);
    border-radius: var(--doc-radius-xs);
    font-size: 12px;
    color: var(--doc-text-muted);
    word-break: break-all;
  }

  &--link {
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
    cursor: pointer;

    &:hover {
      border-color: var(--doc-accent);
      box-shadow: var(--doc-shadow-xs);
      transform: translateY(-2px);

      .layer-link {
        text-decoration: underline;
      }
    }
  }
}

.flow {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.flow-diagram {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  padding: var(--doc-space-l);
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow-x: auto;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--doc-space-xs);
  min-width: 140px;

  .flow-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--doc-text-subtle);
    font-weight: 600;
  }

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-2xs) var(--doc-space-s);
    border-radius: var(--doc-radius-xs);
    font-size: 13px;
  }

  .flow-value {
    font-size: 12px;
    color: var(--doc-text-muted);
  }
}

.flow-arrow {
  font-size: 24px;
  color: var(--doc-text-subtle);
  flex-shrink: 0;
}

.flow-explanation {
  margin: var(--doc-space-m) 0 0;
  color: var(--doc-text-muted);
  font-size: 14px;
  line-height: 1.6;

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
    font-size: 0.9em;
  }
}

.usage {
  h2 {
    margin: 0 0 var(--doc-space-m);
  }

  .usage-note {
    margin: var(--doc-space-m) 0 0;
    color: var(--doc-text-muted);
    font-size: 14px;
  }
}
</style>
