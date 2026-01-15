<script setup lang="ts">
import { Copy, Check, File } from 'lucide-vue-next'

const props = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const { copied, copy } = useClipboard()

// Language to file icon color mapping (VS Code style)
const languageColors: Record<string, string> = {
  vue: '#41b883',
  ts: '#3178c6',
  typescript: '#3178c6',
  js: '#f7df1e',
  javascript: '#f7df1e',
  scss: '#c6538c',
  sass: '#c6538c',
  css: '#264de4',
  html: '#e34c26',
  json: '#cbcb41',
  bash: '#4eaa25',
  shell: '#4eaa25'
}

const languageColor = computed(() => {
  if (!props.language) return '#808080'
  return languageColors[props.language.toLowerCase()] || '#808080'
})

// Generate line numbers
const lineCount = computed(() => props.code.split('\n').length)
</script>

<template>
  <div class="vscode-editor">
    <!-- Title bar -->
    <div class="editor-titlebar">
      <div class="window-controls">
        <span class="control close"></span>
        <span class="control minimize"></span>
        <span class="control maximize"></span>
      </div>
      <div class="file-tab">
        <File :size="14" :color="languageColor" />
        <span class="filename">{{ filename || `example.${language || 'txt'}` }}</span>
      </div>
      <button class="copy-btn" @click="copy(code)">
        <Check v-if="copied" :size="14" />
        <Copy v-else :size="14" />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Editor content -->
    <div class="editor-content">
      <div class="line-numbers" aria-hidden="true">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <pre class="code-area"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.vscode-editor {
  background: #1e1e1e;
  border-radius: var(--doc-radius-m);
  overflow: hidden;
  font-family: "Fira Code", "Consolas", "Monaco", monospace;
  font-size: 13px;
  line-height: 1.5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Title bar */
.editor-titlebar {
  display: flex;
  align-items: center;
  gap: var(--doc-space-m);
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: #323233;
  border-bottom: 1px solid #252526;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3c3c3c;
}

.control.close {
  background: #ff5f57;
}

.control.minimize {
  background: #febc2e;
}

.control.maximize {
  background: #28c840;
}

.file-tab {
  display: flex;
  align-items: center;
  gap: var(--doc-space-xs);
  padding: var(--doc-space-2xs) var(--doc-space-s);
  background: #1e1e1e;
  border-radius: var(--doc-radius-s) var(--doc-radius-s) 0 0;
  margin-bottom: -1px;
}

.filename {
  color: #cccccc;
  font-size: 12px;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--doc-space-2xs);
  margin-left: auto;
  background: transparent;
  border: 1px solid #3c3c3c;
  color: #808080;
  padding: var(--doc-space-3xs) var(--doc-space-s);
  border-radius: var(--doc-radius-s);
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all 0.15s;
}

.copy-btn:hover {
  background: #3c3c3c;
  color: #cccccc;
  border-color: #505050;
}

/* Editor content */
.editor-content {
  display: flex;
  overflow-x: auto;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: var(--doc-space-m) 0;
  padding-left: var(--doc-space-m);
  padding-right: var(--doc-space-m);
  background: #1e1e1e;
  border-right: 1px solid #2d2d2d;
  text-align: right;
  user-select: none;
  color: #858585;
  font-size: 13px;
  line-height: 1.5;
  min-width: 40px;
}

.code-area {
  flex: 1;
  margin: 0;
  padding: var(--doc-space-m);
  overflow-x: auto;
  background: #1e1e1e;
}

.code-area code {
  color: #d4d4d4;
  font-family: "Fira Code", "Consolas", "Monaco", monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre;
}

/* Scrollbar styling */
.editor-content::-webkit-scrollbar,
.code-area::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.editor-content::-webkit-scrollbar-track,
.code-area::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.editor-content::-webkit-scrollbar-thumb,
.code-area::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}

.editor-content::-webkit-scrollbar-thumb:hover,
.code-area::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
</style>
