<script setup lang="ts">
import FileUpload from '@components/FileUpload/FileUpload.vue'
import '@components/FileUpload/FileUpload.scss'

const componentProps = [
  { name: 'accept', type: 'String', default: 'null', description: 'Accepted file types (MIME types or extensions)' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple file selection' },
  { name: 'maxFileSize', type: 'Number', default: 'null', description: 'Maximum file size in bytes' },
  { name: 'maxFiles', type: 'Number', default: 'null', description: 'Maximum number of files allowed' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disable the upload component' }
]

const events = [
  { name: 'select', description: 'Emitted when files are selected. Payload: array of files' },
  { name: 'remove', description: 'Emitted when a file is removed. Payload: removed file' },
  { name: 'error', description: 'Emitted on validation errors. Payload: { type, file, ... }' }
]

const previewStyles = ref<Record<string, string>>({})

function handleTokensChanged(tokens: Record<string, string>) {
  previewStyles.value = tokens
}

function handleSelect(files: File[]) {
  console.log('Selected files:', files)
}

function handleRemove(file: File) {
  console.log('Removed file:', file)
}

function handleError(error: any) {
  console.log('Error:', error)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="FileUpload"
      description="File upload component with drag-and-drop support, file validation, and file list display."
    />

    <section class="demo-section">
      <h2>Basic</h2>
      <p class="section-description">Simple file upload with single file selection.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <FileUpload
            @select="handleSelect"
            @remove="handleRemove"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Multiple Files</h2>
      <p class="section-description">Upload multiple files at once.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <FileUpload
            multiple
            @select="handleSelect"
            @remove="handleRemove"
          />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>With Restrictions</h2>
      <p class="section-description">Limit to images only with max 5MB file size.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <FileUpload
            accept="image/*"
            :maxFileSize="5 * 1024 * 1024"
            :maxFiles="3"
            multiple
            @select="handleSelect"
            @error="handleError"
          >
            <template #header>Drop images here</template>
            <template #subheader>Max 5MB, up to 3 files</template>
          </FileUpload>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled</h2>
      <p class="section-description">Disabled state prevents interaction.</p>
      <div class="demo-row">
        <div class="demo-item" style="width: 100%; max-width: 500px;">
          <FileUpload isDisabled />
        </div>
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic usage -->
  <FileUpload
    @select="onFilesSelected"
    @remove="onFileRemoved"
  />

  <!-- Multiple files with restrictions -->
  <FileUpload
    accept="image/*,.pdf"
    :maxFileSize="10 * 1024 * 1024"
    :maxFiles="5"
    multiple
    @select="onFilesSelected"
    @error="onError"
  >
    <template #header>Drop files here</template>
    <template #subheader>Images and PDFs, max 10MB</template>
  </FileUpload>
</template>

<script setup>
import FileUpload from "@components/FileUpload/FileUpload.vue"
import "@components/FileUpload/FileUpload.scss"

const onFilesSelected = (files) => {
  console.log("Selected:", files)
}

const onFileRemoved = (file) => {
  console.log("Removed:", file)
}

const onError = (error) => {
  if (error.type === "size") {
    alert(`File ${error.file.name} exceeds size limit`)
  } else if (error.type === "limit") {
    alert("Maximum files reached")
  }
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
          <tr v-for="prop in componentProps" :key="prop.name">
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
      <p class="section-description">Customize the file upload appearance with design tokens.</p>

      <div class="token-editor-layout">
        <div class="token-editor-panel">
          <ComponentTokenEditor
            component="fileUpload"
            @tokens-changed="handleTokensChanged"
          />
        </div>

        <div class="live-preview-panel">
          <div class="preview-header">
            <h3>Live Preview</h3>
          </div>
          <div class="preview-content" :style="previewStyles">
            <FileUpload
              multiple
              @select="handleSelect"
            />
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

.demo-item {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-s);
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
