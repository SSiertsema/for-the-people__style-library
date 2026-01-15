<template>
  <NuxtLink v-if="href && isNuxtLink" :to="href" class="pzh-header__link">
    <i v-if="icon" :class="'icon-solid--' + icon"></i>
    <span>
      {{ text }}
    </span>
  </NuxtLink>
  <a v-else-if="href" :href="href" class="pzh-header__link">
    <i v-if="icon" :class="'icon-light--' + icon"></i>
    <span>
      {{ text }}
    </span>
  </a>
  <button v-else :href="href" class="pzh-header__link" @click="emit('click')">
    <i v-if="icon" :class="'icon-light--' + icon"></i>
    <span>
      {{ text }}
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  text: String,
  href: String,
  icon: String,
  isNuxtLink: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>
