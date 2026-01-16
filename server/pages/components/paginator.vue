<script setup lang="ts">
import Paginator from '@components/Paginator/Paginator.vue'
import '@components/Paginator/Paginator.scss'

const props = [
  { name: 'totalRecords', type: 'Number', default: 'required', description: 'Total number of records to paginate' },
  { name: 'rows', type: 'Number', default: '10', description: 'Number of rows per page' },
  { name: 'first', type: 'Number', default: '0', description: 'Index of the first record to display (0-based)' },
  { name: 'rowsPerPageOptions', type: 'Array', default: '[]', description: 'Array of row options for dropdown (e.g., [10, 20, 50])' },
  { name: 'pageLinkSize', type: 'Number', default: '5', description: 'Number of page links to display' },
  { name: 'showFirstLast', type: 'Boolean', default: 'true', description: 'Whether to show first/last page buttons' },
  { name: 'showInfo', type: 'Boolean', default: 'false', description: 'Whether to show record info (e.g., "1-10 of 100")' }
]

const events = [
  { name: 'update:first', description: 'Emitted when the first record index changes' },
  { name: 'update:rows', description: 'Emitted when rows per page changes' },
  { name: 'page', description: 'Emitted on any page change. Payload: { page, first, rows, pageCount }' }
]

// Demo state
const basicFirst = ref(0)
const basicRows = ref(10)

const infoFirst = ref(0)
const infoRows = ref(10)

const rowsFirst = ref(0)
const rowsRows = ref(10)

function handlePageChange(event: any) {
  console.log('Page changed:', event)
}

// Live preview styles from token editor
const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Paginator"
      description="Paginator provides navigation controls for paging through large sets of data."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">A basic paginator with page navigation.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Paginator
            :totalRecords="120"
            v-model:first="basicFirst"
            v-model:rows="basicRows"
            @page="handlePageChange"
          />
          <span class="demo-label">Showing records {{ basicFirst + 1 }} to {{ Math.min(basicFirst + basicRows, 120) }}</span>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Info</h2>
      <p class="section-description">Paginator showing current record range information.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Paginator
            :totalRecords="250"
            v-model:first="infoFirst"
            v-model:rows="infoRows"
            :showInfo="true"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Rows Per Page</h2>
      <p class="section-description">Paginator with rows per page dropdown.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Paginator
            :totalRecords="200"
            v-model:first="rowsFirst"
            v-model:rows="rowsRows"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :showInfo="true"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Without First/Last</h2>
      <p class="section-description">Paginator without first and last page buttons.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Paginator
            :totalRecords="80"
            :rows="10"
            :first="0"
            :showFirstLast="false"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Few Pages</h2>
      <p class="section-description">Paginator with fewer pages than the page link size.</p>
      <div class="demo-row">
        <div class="demo-item demo-item--wide">
          <Paginator
            :totalRecords="25"
            :rows="10"
            :first="0"
          />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic paginator -->
  <Paginator
    :totalRecords="100"
    v-model:first="first"
    v-model:rows="rows"
    @page="handlePage"
  />

  <!-- With info and rows per page -->
  <Paginator
    :totalRecords="100"
    v-model:first="first"
    v-model:rows="rows"
    :rowsPerPageOptions="[10, 20, 50]"
    :showInfo="true"
  />

  <!-- Customized -->
  <Paginator
    :totalRecords="100"
    :rows="10"
    :first="0"
    :pageLinkSize="7"
    :showFirstLast="false"
  />
</template>

<script setup>
import Paginator from "@components/Paginator/Paginator.vue"
import "@components/Paginator/Paginator.scss"

const first = ref(0)
const rows = ref(10)

function handlePage(event) {
  console.log("Page:", event.page)
  console.log("First:", event.first)
  console.log("Rows:", event.rows)
}
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="tokens-section">
      <h2>Design Tokens</h2>
      <p class="section-description">Customize the paginator tokens and see the result in the live preview.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="paginator"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <div class="preview-group">
              <span class="preview-label">Basic</span>
              <div class="preview-column">
                <Paginator :totalRecords="120" :rows="10" :first="30" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Info</span>
              <div class="preview-column">
                <Paginator :totalRecords="100" :rows="10" :first="0" :showInfo="true" />
              </div>
            </div>

            <div class="preview-group">
              <span class="preview-label">With Rows Selector</span>
              <div class="preview-column">
                <Paginator
                  :totalRecords="200"
                  :rows="20"
                  :first="0"
                  :rowsPerPageOptions="[10, 20, 50]"
                  :showInfo="true"
                />
              </div>
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
  max-width: 1200px;
}

.demo-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
  }
}

.demo-row {
  display: flex;
  align-items: flex-start;
  gap: var(--doc-space-xl);
  flex-wrap: wrap;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--doc-space-s);
}

.demo-item--wide {
  width: 100%;
  max-width: 600px;
}

.demo-label {
  font-size: 13px;
  color: var(--doc-text-muted);
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.tokens-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-m);
  }
}

.token-editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--doc-space-l);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.token-editor-panel {
  min-width: 0;
}

.live-preview-panel {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  overflow: hidden;
}

.preview-header {
  padding: var(--doc-space-m);
  border-bottom: 1px solid var(--doc-border);
  background: var(--doc-surface-muted);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.preview-content {
  padding: var(--doc-space-l);
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-l);
}

.preview-group {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.preview-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--doc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-column {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);
  overflow: hidden;

  th, td {
    padding: var(--doc-space-s) var(--doc-space-m);
    text-align: left;
    border-bottom: 1px solid var(--doc-border);
  }

  th {
    background: var(--doc-surface-muted);
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--doc-text-muted);
  }

  td {
    font-size: 14px;
  }

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
    font-size: 13px;
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>
