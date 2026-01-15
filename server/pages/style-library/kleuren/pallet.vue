<script setup lang="ts">
const config = useRuntimeConfig()
const palettes = config.public.designTokens.colorPalettes

const { copied, copy } = useClipboard()

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

function copyValue(value: string) {
  copy(value)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Kleurenpallet"
      description="Het volledige kleurenpallet met alle beschikbare tinten. Dit zijn de primitieve kleuren die als basis dienen voor de semantische tokens. Klik op een kleur om de hex waarde te kopieren."
    />

    <section class="info">
      <h2>Over het pallet</h2>
      <p>
        Het kleurenpallet bestaat uit <strong>{{ palettes.length }} kleurschalen</strong>, elk met tinten van licht (50) naar donker (900/950).
        Deze primitieve kleuren worden niet direct in componenten gebruikt, maar vormen de basis voor de
        <NuxtLink to="/style-library/kleuren">semantische kleur tokens</NuxtLink> pagina.
      </p>
    </section>

    <section v-for="palette in palettes" :key="palette.name" class="palette">
      <h2 class="palette-name">{{ palette.name }}</h2>
      <div class="shades">
        <div
          v-for="shade in palette.shades"
          :key="shade.shade"
          class="shade"
          :style="{ backgroundColor: shade.value }"
          :class="{ 'is-light': isLight(shade.value) }"
          @click="copyValue(shade.value)"
        >
          <span class="shade-number">{{ shade.shade }}</span>
          <span class="shade-value">{{ shade.value }}</span>
        </div>
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
    margin: 0 0 var(--doc-space-s);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0;
    line-height: 1.6;

    a {
      color: var(--doc-accent);
      text-decoration: underline;
    }

    strong {
      color: var(--doc-text-default);
    }
  }
}

.palette {
  margin-bottom: var(--doc-space-2xl);
}

.palette-name {
  margin: 0 0 var(--doc-space-m);
  font-size: 18px;
  font-weight: 600;
}

.shades {
  display: flex;
  border-radius: var(--doc-radius-m);
  overflow: hidden;
  box-shadow: var(--doc-shadow-s);
}

.shade {
  flex: 1;
  min-height: 100px;
  padding: var(--doc-space-s);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  color: white;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: var(--doc-shadow-m);
    z-index: 1;
    border-radius: var(--doc-radius-xs);
  }

  &.is-light {
    color: var(--doc-text-default);
  }
}

.shade-number {
  font-weight: 600;
  font-size: 14px;
}

.shade-value {
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 11px;
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .shades {
    flex-wrap: wrap;
  }

  .shade {
    flex: 0 0 calc(100% / 6);
    min-width: 80px;
  }
}

@media (max-width: 640px) {
  .shade {
    flex: 0 0 calc(100% / 4);
  }
}
</style>
