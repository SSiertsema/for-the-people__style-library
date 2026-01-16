<script setup lang="ts">
import Editor from '@components/Editor/Editor.vue'
import '@components/Editor/Editor.scss'

const content = ref('<p>Hello <strong>World</strong>! This is a <em>rich text</em> editor.</p>')

const componentProps = [
  { name: 'modelValue', type: 'String', default: '""', description: 'HTML content (v-model)' },
  { name: 'placeholder', type: 'String', default: '"Enter text..."', description: 'Placeholder text' },
  { name: 'isDisabled', type: 'Boolean', default: 'false', description: 'Disabled state' },
  { name: 'isInvalid', type: 'Boolean', default: 'false', description: 'Invalid/error state' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Editor"
      description="Rich text editor with basic formatting options including bold, italic, underline, lists, and links."
    />

    <ComponentDemo
      name="Editor"
      description="WYSIWYG editor for rich text content."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Basic</h4>
        <div class="demo-row">
          <Editor v-model="content" />
        </div>
        <details class="output-details">
          <summary>View HTML output</summary>
          <pre class="output-code">{{ content }}</pre>
        </details>
      </div>

      <div class="demo-section">
        <h4>With Custom Placeholder</h4>
        <div class="demo-row">
          <Editor placeholder="Write your story here..." />
        </div>
      </div>

      <div class="demo-section">
        <h4>States</h4>
        <div class="demo-row">
          <Editor placeholder="Default" />
        </div>
        <div class="demo-row">
          <Editor placeholder="Disabled" is-disabled />
        </div>
        <div class="demo-row">
          <Editor placeholder="Invalid" is-invalid />
        </div>
      </div>
    </ComponentDemo>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-l);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-row {
  margin-bottom: var(--doc-space-m);

  .editor {
    max-width: 600px;
  }
}

.output-details {
  margin-top: var(--doc-space-s);

  summary {
    font-size: 13px;
    color: var(--doc-text-muted);
    cursor: pointer;
    user-select: none;

    &:hover {
      color: var(--doc-text-default);
    }
  }
}

.output-code {
  margin-top: var(--doc-space-s);
  padding: var(--doc-space-m);
  background-color: var(--doc-surface-muted);
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: var(--doc-text-muted);
  white-space: pre-wrap;
  word-break: break-all;
  max-width: 600px;
  overflow-x: auto;
}
</style>
