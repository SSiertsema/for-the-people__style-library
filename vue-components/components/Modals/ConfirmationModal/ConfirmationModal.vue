<script setup>
import Modal from "../Modal/Modal.vue";
import ButtonPrimary from "../../ButtonPrimary/ButtonPrimary.vue";
import Link from "../../Link/Link.vue";

const emit = defineEmits(["proceed", "cancel"]);

defineProps({
  title: String,
  message: String,
  textProceed: String,
  textCancel: String,
});
</script>

<template>
  <Modal @backdropClick="emit('cancel')">
    <div class="confirmation-modal-content">
      <div class="confirmation-modal-content__title">{{ title }}</div>
      <div class="confirmation-modal-content__message">{{ message }}</div>
      <div class="confirmation-modal-content__button-section">
        <ButtonPrimary :text="textProceed" @click="emit('proceed')" />
        <Link :text="textCancel" @click="emit('cancel')" />
      </div>
    </div>
  </Modal>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/confirmation-modal.css"
></style>
