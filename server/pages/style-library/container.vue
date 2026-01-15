<script setup lang="ts">
</script>

<template>
  <div class="page">
    <PageHeader
      title="Container"
      description="De container mixin voegt responsive padding toe aan een element. De padding schaalt automatisch mee met het schermformaat."
          />

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/mixins/container" as *;

.my-section {
  @include container();
}

// Met extra padding voor "DNA" styling:
.my-dna-section {
  @include container-with-dna();
}'
      />
    </section>

    <section class="padding-table">
      <h2>Padding per breakpoint</h2>
      <div class="table">
        <div class="table-row header">
          <div class="cell">Breakpoint</div>
          <div class="cell">Padding</div>
        </div>
        <div class="table-row">
          <div class="cell">Phone</div>
          <div class="cell">16px ($space-4)</div>
        </div>
        <div class="table-row">
          <div class="cell">Tablet</div>
          <div class="cell">80px ($space-20)</div>
        </div>
        <div class="table-row">
          <div class="cell">Laptop+</div>
          <div class="cell">96px ($space-24)</div>
        </div>
      </div>
    </section>

    <section class="demo">
      <h2>Demo</h2>
      <p class="note">Resize je browser om het responsive gedrag te zien.</p>
      <div class="demo-wrapper">
        <div class="demo-outer">
          <div class="demo-container">
            <div class="demo-content">
              <h3>Container content</h3>
              <p>Deze content zit in een container met responsive padding. De grijze achtergrond toont de container grenzen, de blauwe achtergrond toont de content area.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1000px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.padding-table {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-l);
  }
}

.table {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;

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

.demo {
  h2 {
    margin: 0 0 var(--doc-space-s);
  }

  .note {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
  }
}

.demo-wrapper {
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.demo-outer {
  background: var(--doc-surface-muted);
}

.demo-container {
  background: var(--doc-accent);
  padding: var(--doc-space-l);
}

.demo-content {
  background: var(--doc-surface-panel);
  padding: var(--doc-space-l);
  border-radius: var(--doc-radius-m);

  h3 {
    margin: 0 0 var(--doc-space-s);
  }

  p {
    color: var(--doc-text-muted);
    margin: 0;
  }
}
</style>
