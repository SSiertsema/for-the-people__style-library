<script setup lang="ts">
const gridExamples = [
  { items: 12, title: '12 items (volledig grid)' },
  { items: 6, title: '6 items' },
  { items: 3, title: '3 items' },
  { items: 2, title: '2 items' },
  { items: 1, title: '1 item' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Grid"
      description="Het responsive 12-column grid systeem. Het grid past automatisch aan op verschillende schermformaten."
          />

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/mixins/grid" as *;
@use "@ftp/style-library/scss/mixins/breakpoint" as *;

.my-grid {
  @include grid();
}

.my-item {
  // Standaard: 1 kolom (phone)
  // Tablet: 2 kolommen
  @include breakpoint-from(tablet) {
    grid-column: span 6;
  }
  // Laptop+: 3 kolommen
  @include breakpoint-from(laptop) {
    grid-column: span 4;
  }
}'
      />
    </section>

    <section class="breakpoints">
      <h2>Breakpoints</h2>
      <div class="breakpoint-table">
        <div class="table-row header">
          <div class="cell">Breakpoint</div>
          <div class="cell">Range</div>
          <div class="cell">Columns</div>
          <div class="cell">Gap</div>
        </div>
        <div class="table-row">
          <div class="cell">Phone</div>
          <div class="cell">0 - 767px</div>
          <div class="cell">1</div>
          <div class="cell">24px</div>
        </div>
        <div class="table-row">
          <div class="cell">Tablet</div>
          <div class="cell">768 - 1280px</div>
          <div class="cell">4-6</div>
          <div class="cell">24px</div>
        </div>
        <div class="table-row">
          <div class="cell">Laptop</div>
          <div class="cell">1281 - 1919px</div>
          <div class="cell">6-12</div>
          <div class="cell">40px</div>
        </div>
        <div class="table-row">
          <div class="cell">Desktop</div>
          <div class="cell">1920 - 2559px</div>
          <div class="cell">12</div>
          <div class="cell">48px</div>
        </div>
        <div class="table-row">
          <div class="cell">Wide-screen</div>
          <div class="cell">2560px+</div>
          <div class="cell">12</div>
          <div class="cell">48px</div>
        </div>
      </div>
    </section>

    <section v-for="example in gridExamples" :key="example.items" class="grid-example">
      <h2>{{ example.title }}</h2>
      <PreviewFrame>
        <div class="demo-grid">
          <div v-for="n in example.items" :key="n" class="demo-item">
            {{ n }}
          </div>
        </div>
      </PreviewFrame>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "mixins/grid" as *;

.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.breakpoints {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-l);
  }
}

.breakpoint-table {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  &.header {
    background: var(--doc-surface-muted);
    font-weight: 500;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--doc-border);
  }
}

.cell {
  padding: var(--doc-space-s) var(--doc-space-m);
  font-size: 14px;

  &:not(:last-child) {
    border-right: 1px solid var(--doc-border);
  }
}

.grid-example {
  margin-bottom: var(--doc-space-xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.demo-grid {
  @include grid();
}

.demo-item {
  background: var(--doc-accent);
  color: var(--doc-text-inverse);
  padding: var(--doc-space-m);
  border-radius: var(--doc-radius-m);
  text-align: center;
  font-weight: 500;
}
</style>
