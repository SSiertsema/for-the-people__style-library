<script setup lang="ts">
defineProps<{
  name: string
  description?: string
  props?: Array<{
    name: string
    type: string
    default?: string
    description?: string
  }>
}>()
</script>

<template>
  <div class="component-demo">
    <div class="demo-header">
      <h3 class="demo-title">{{ name }}</h3>
      <p v-if="description" class="demo-description">{{ description }}</p>
    </div>

    <div class="demo-preview">
      <slot />
    </div>

    <div v-if="props && props.length > 0" class="demo-props">
      <h4>Props</h4>
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td>{{ prop.default || '-' }}</td>
            <td>{{ prop.description || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "tokens" as *;

.component-demo {
  background: $surface-panel;
  border: 1px solid $border-subtle;
  border-radius: $radius-rounded;
  margin-bottom: $stack-l;
  overflow: hidden;
}

.demo-header {
  padding: $inset-m $inset-l;
  border-bottom: 1px solid $border-subtle;
  background: $surface-muted;
}

.demo-title {
  margin: 0;
  font-weight: 600;
}

.demo-description {
  color: $text-muted;
  margin: $stack-xs 0 0;
}

.demo-preview {
  padding: $inset-l;
  background: $surface-panel;
}

.demo-props {
  padding: $inset-m $inset-l;
  border-top: 1px solid $border-subtle;
  background: $surface-muted;

  h4 {
    font-size: 14px;
    margin: 0 0 $stack-s;
  }
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th, td {
    text-align: left;
    padding: $inset-xs $inset-s;
    border: 1px solid $border-subtle;
  }

  th {
    background: $surface-panel;
    font-weight: 500;
  }

  td {
    background: $surface-panel;
  }

  code {
    background: $surface-muted;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
  }
}
</style>
