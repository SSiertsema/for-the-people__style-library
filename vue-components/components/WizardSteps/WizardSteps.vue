<template>
  <div class="pzh-wizard-steps" ref="hoi">
    <div class="pzh-wizard-steps__navigation">
      <h3 v-if="title">{{ title }}</h3>
      <WizardStep
        v-for="(step, index) in mutableSteps"
        :key="index"
        :text="index + 1"
        :currentStep="currentStep"
        v-bind="step"
        @click="navigateToStep(index + 1)"
      ></WizardStep>
    </div>
    <div class="pzh-wizard-steps__content">
      <slot></slot>
      <div class="pzh-wizard-steps__button-section">
        <ButtonSecondary
          text="Vorige"
          :is-disabled="isFirstStep"
          @click="navigatePrevious"
        />
        <ButtonCallToAction :text="buttonText" @click="navigateNext" />
      </div>
    </div>
  </div>
</template>

<script setup>
import WizardStep from "./WizardStep.vue";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary.vue";
import ButtonCallToAction from "../ButtonCallToAction/ButtonCallToAction.vue";
import {
  ref,
  watch,
  computed,
  onMounted,
  getCurrentInstance,
  nextTick,
} from "vue";

const props = defineProps({
  title: String,
  steps: Array,
});

const mutableSteps = ref(props.steps);

const currentStep = ref(1);

const buttonText = computed(() => {
  return isLastStep.value ? "Indienen" : "Volgende";
});

const isFirstStep = computed(() => {
  return currentStep.value === 1;
});

const isLastStep = computed(() => {
  return currentStep.value === props.steps.length;
});

function navigateToStep(step) {
  currentStep.value = step;
}

function navigateNext() {
  if (!isLastStep.value) {
    currentStep.value += 1;
  } else {
    // Indieden actie
  }
}

function navigatePrevious() {
  if (!isFirstStep.value) currentStep.value -= 1;
}

onMounted(async () => {
  await nextTick();
  const isntance = getCurrentInstance();
  const refs = isntance.refs;

  console.log("Refs: ", refs);
});

function getStepState() {
  const stepComponent = this.$refs.stepComponent;
  if (stepComponent && stepComponent.getState) {
    console.log(stepComponent.getState());
  }
}
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/WizardSteps/WizardSteps.scss"
/>
