<template>
  <ul class="pzh-input-messages">
    <li v-for="message in messages">
      <InputMessage :text="message.text" :type="message.type" :size="size" />
    </li>
  </ul>
</template>

<script setup>
import InputMessage from "../InputMessage/InputMessage.vue";

const props = defineProps({
  messages: Array,
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium"].includes(value),
  },
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/InputMessages/InputMessages.scss"
/>
