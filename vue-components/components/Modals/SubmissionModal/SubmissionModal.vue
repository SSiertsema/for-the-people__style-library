<script setup>
import Modal from "../Modal/Modal.vue";
import ButtonPrimary from "../../ButtonPrimary/ButtonPrimary.vue";

defineProps({
  modalConfig: {
    type: Object,
    default: () => {
      return {
        size: "medium",
        enableCloseButton: true,
      };
    },
  },
  state: String,
  content: Object,
});

const emit = defineEmits(["proceed", "cancel"]);
</script>

<template>
  <Modal
    @backdropClick="emit('cancel')"
    @closeButtonClick="emit('cancel')"
    v-bind="modalConfig"
  >
    <div class="loading-modal-content" v-if="state === 'loading'">
      <i class="loading-modal-content__icon icon-solid--spinner"></i>
      <div class="loading-modal-content__message">
        {{ content.loading.message }}
      </div>
    </div>
    <div class="success-modal-content" v-if="state === 'success'">
      <i class="success-modal-content__icon icon-solid--circle-check"></i>
      <div class="success-modal-content__title">
        {{ content.success.title }}
      </div>
      <div class="success-modal-content__message">
        {{ content.success.message }}
      </div>
      <div class="success-modal-content__button-section">
        <ButtonPrimary
          :text="content.success.textProceed"
          @click="emit('proceed')"
        />
      </div>
    </div>
    <div class="error-modal-content" v-if="state === 'error'">
      <i class="error-modal-content__icon icon-solid--circle-exclamation"></i>
      <div class="error-modal-content__title">{{ content.error.title }}</div>
      <div class="error-modal-content__message">
        {{ content.error.message }}
      </div>
      <div class="error-modal-content__button-section">
        <ButtonPrimary
          :text="content.error.textProceed"
          @click="emit('cancel')"
        />
      </div>
    </div>
  </Modal>
</template>

<style
  scoped
  lang="css"
  src="@pzh-temporary/pzh-html-component-library/components/submission-modal.css"
></style>
