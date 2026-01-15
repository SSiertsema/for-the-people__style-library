<script setup lang="ts">
const config = useRuntimeConfig()
const shadows = config.public.designTokens.shadows

const levels = [
  { level: 'xs', name: 'Extra Small', mixin: '@include levitate("xs");', useCase: 'Hover states, subtle depth' },
  { level: 's', name: 'Small', mixin: '@include levitate("s");', useCase: 'Cards, buttons' },
  { level: 'm', name: 'Medium', mixin: '@include levitate("m");', useCase: 'Dropdowns, popovers' },
  { level: 'l', name: 'Large', mixin: '@include levitate("l");', useCase: 'Modals, dialogs' },
  { level: 'xl', name: 'Extra Large', mixin: '@include levitate("xl");', useCase: 'Toasts, high elevation' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Levitation"
      description="Box shadow niveaus voor elevatie effecten. Hogere niveaus geven meer diepte."
          />

    <section class="rationale">
      <h2>Ontwerp</h2>
      <p>
        De shadow schaal gebruikt een <strong>verdubbelings-progressie (2×)</strong> voor
        y-offset en blur. Elke shadow is opgebouwd uit twee lagen: een <em>key shadow</em>
        (scherp, directioneel) en een <em>ambient shadow</em> (zacht, diffuus). Dit creëert
        realistische diepte zoals in de fysieke wereld.
      </p>
    </section>

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/mixins/levitation" as *;

.my-card {
  @include levitate("s");
}

.my-modal {
  @include levitate("l");
}'
      />
    </section>

    <section class="shadow-list">
      <h2>Shadow Levels</h2>
      <div class="shadows">
        <PreviewFrame v-for="level in levels" :key="level.level" :title="level.name">
          <div class="shadow-demo">
            <div :class="`shadow-preview level-${level.level}`">
              {{ level.useCase }}
            </div>
          </div>
          <CodeSnippet :code="level.mixin" language="scss" />
        </PreviewFrame>
      </div>
    </section>

    <section class="variables">
      <h2>Variables</h2>
      <p class="note">De shadows zijn ook beschikbaar als SCSS variables:</p>
      <div class="variable-list">
        <TokenCard
          v-for="shadow in shadows"
          :key="shadow.variable"
          :name="shadow.name"
          :variable="shadow.variable"
          :value="shadow.value"
        >
          <div class="shadow-var-preview" :style="{ boxShadow: shadow.value }" />
        </TokenCard>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "mixins/levitation" as *;

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

.shadow-list,
.variables {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.shadows {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.shadow-demo {
  display: flex;
  justify-content: center;
  padding: var(--doc-space-2xl);
  background: var(--doc-surface-muted);
  border-radius: var(--doc-radius-s);
  margin-bottom: var(--doc-space-s);
}

.shadow-preview {
  width: 200px;
  height: 100px;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-s);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--doc-text-muted);
  text-align: center;
  padding: var(--doc-space-s);
}

.level-xs {
  @include levitate("xs");
}

.level-s {
  @include levitate("s");
}

.level-m {
  @include levitate("m");
}

.level-l {
  @include levitate("l");
}

.level-xl {
  @include levitate("xl");
}

.note {
  color: var(--doc-text-muted);
  margin: 0 0 var(--doc-space-s);
}

.variable-list {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-xs);
}

.shadow-var-preview {
  width: 64px;
  height: 40px;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-s);
}
</style>
