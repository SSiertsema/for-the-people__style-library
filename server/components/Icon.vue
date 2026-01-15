<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  size?: number | string
  strokeWidth?: number | string
  color?: string
}>()

const iconComponent = computed(() => {
  // Convert kebab-case or snake_case to PascalCase
  const pascalName = props.name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  return (icons as Record<string, unknown>)[pascalName] || null
})
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :size="size ?? 24"
    :stroke-width="strokeWidth ?? 2"
    :color="color"
  />
</template>
