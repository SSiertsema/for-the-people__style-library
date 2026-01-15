<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: string[]
  tokenType?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref<HTMLElement | null>(null)

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(opt => opt.toLowerCase().includes(query))
})

function selectOption(option: string) {
  emit('update:modelValue', `{${option}}`)
  isOpen.value = false
  searchQuery.value = ''
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="token-reference-selector">
    <button
      type="button"
      class="selector-trigger"
      @click="isOpen = !isOpen"
    >
      <span class="current-value">{{ modelValue }}</span>
      <span class="chevron" :class="{ open: isOpen }">
        <i class="pzh-icons-light-angle-down" />
      </span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search tokens..."
        @click.stop
      />
      <ul class="options-list">
        <li
          v-for="option in filteredOptions"
          :key="option"
          class="option"
          :class="{ selected: `{${option}}` === modelValue }"
          @click="selectOption(option)"
        >
          {{ option }}
        </li>
        <li v-if="filteredOptions.length === 0" class="no-results">
          No tokens found
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "tokens" as *;

.token-reference-selector {
  position: relative;
  display: inline-block;
  min-width: 200px;
}

.selector-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: $inset-xs $inset-s;
  background: $surface-panel;
  border: 1px solid $border-subtle;
  border-radius: $radius-default;
  cursor: pointer;
  font-size: 13px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  color: $text-default;
  transition: border-color 0.15s;

  &:hover {
    border-color: $border-default;
  }

  &:focus {
    outline: none;
    border-color: $intent-action-default;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.current-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  margin-left: $inline-xs;
  transition: transform 0.15s;
  font-size: 12px;
  color: $text-muted;

  &.open {
    transform: rotate(180deg);
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: $stack-2xs;
  background: $surface-panel;
  border: 1px solid $border-subtle;
  border-radius: $radius-default;
  box-shadow: $shadow-m;
  z-index: 100;
  max-height: 300px;
  display: flex;
  flex-direction: column;
}

.search-input {
  padding: $inset-s;
  border: none;
  border-bottom: 1px solid $border-subtle;
  font-size: 13px;
  outline: none;
  background: transparent;
  color: $text-default;

  &::placeholder {
    color: $text-subtle;
  }
}

.options-list {
  list-style: none;
  margin: 0;
  padding: $inset-2xs 0;
  overflow-y: auto;
  flex: 1;
}

.option {
  padding: $inset-xs $inset-s;
  font-size: 13px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  color: $text-default;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background: $surface-muted;
  }

  &.selected {
    background: $surface-muted;
    color: $intent-action-default;
  }
}

.no-results {
  padding: $inset-s;
  text-align: center;
  color: $text-muted;
  font-size: 13px;
}
</style>
