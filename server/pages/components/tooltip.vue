<script setup lang="ts">
import Tooltip from '@components/Tooltip/Tooltip.vue'
import '@components/Tooltip/Tooltip.scss'

const componentProps = [
  { name: 'content', type: 'String', default: '-', description: 'Tooltip text content (required)' },
  { name: 'position', type: 'String', default: '"top"', description: 'Position: top, bottom, left, right' },
  { name: 'showDelay', type: 'Number', default: '0', description: 'Delay before showing tooltip (ms)' },
  { name: 'hideDelay', type: 'Number', default: '0', description: 'Delay before hiding tooltip (ms)' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the tooltip' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Tooltip"
      description="Tooltip component for displaying contextual information on hover or focus."
    />

    <ComponentDemo
      name="Tooltip"
      description="A tooltip wrapper that shows content when hovering or focusing the wrapped element."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>Positions</h4>
        <div class="demo-row">
          <Tooltip content="Tooltip on top" position="top">
            <button class="demo-button">Top</button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" position="bottom">
            <button class="demo-button">Bottom</button>
          </Tooltip>
          <Tooltip content="Tooltip on left" position="left">
            <button class="demo-button">Left</button>
          </Tooltip>
          <Tooltip content="Tooltip on right" position="right">
            <button class="demo-button">Right</button>
          </Tooltip>
        </div>
      </div>

      <div class="demo-section">
        <h4>Different Content</h4>
        <div class="demo-row">
          <Tooltip content="Short tip">
            <button class="demo-button">Short</button>
          </Tooltip>
          <Tooltip content="This is a longer tooltip message that demonstrates how text wraps within the tooltip component.">
            <button class="demo-button">Long text</button>
          </Tooltip>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Delay</h4>
        <div class="demo-row">
          <Tooltip content="Appears after 500ms" :show-delay="500">
            <button class="demo-button">Show delay (500ms)</button>
          </Tooltip>
          <Tooltip content="Hides after 300ms" :hide-delay="300">
            <button class="demo-button">Hide delay (300ms)</button>
          </Tooltip>
        </div>
      </div>

      <div class="demo-section">
        <h4>On Different Elements</h4>
        <div class="demo-row">
          <Tooltip content="Tooltip on a link">
            <a href="#" class="demo-link">Hover this link</a>
          </Tooltip>
          <Tooltip content="Tooltip on an icon">
            <span class="demo-icon">
              <i class="pzhi-light-info-circle" />
            </span>
          </Tooltip>
          <Tooltip content="Tooltip on text">
            <span class="demo-text">Hover this text</span>
          </Tooltip>
        </div>
      </div>

      <div class="demo-section">
        <h4>Disabled State</h4>
        <div class="demo-row">
          <Tooltip content="This will not show" :disabled="true">
            <button class="demo-button">Disabled tooltip</button>
          </Tooltip>
        </div>
      </div>
    </ComponentDemo>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic usage -->
  <Tooltip content="Helpful tip">
    <button>Hover me</button>
  </Tooltip>

  <!-- With position -->
  <Tooltip content="Shows on the right" position="right">
    <span>Hover</span>
  </Tooltip>

  <!-- With delays -->
  <Tooltip
    content="Delayed tooltip"
    :show-delay="300"
    :hide-delay="100"
  >
    <button>Hover me</button>
  </Tooltip>
</template>

<script setup>
import Tooltip from "@components/Tooltip/Tooltip.vue"
import "@components/Tooltip/Tooltip.scss"
</script>'
      />
    </section>
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--doc-space-l);
}

.demo-button {
  padding: var(--doc-space-s) var(--doc-space-m);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  background: var(--doc-surface-panel);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: var(--doc-surface-muted);
  }
}

.demo-link {
  color: var(--doc-text-link, #2563eb);
  text-decoration: underline;
  cursor: pointer;
}

.demo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--doc-surface-muted);
  cursor: pointer;

  i {
    font-size: 18px;
    color: var(--doc-text-muted);
  }
}

.demo-text {
  text-decoration: underline dotted;
  cursor: help;
}

.usage {
  margin-top: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}
</style>
