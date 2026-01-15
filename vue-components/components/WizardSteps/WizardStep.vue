<template>
  <a
    class="pzh-wizard-steps__step"
    :class="additionalClasses"
    :tabIndex="isDisabled"
    :href="href"
  >
    <div class="pzh-wizard-steps__circle">
      <span v-if="!isComplete">{{ text }}</span>
      <a class="icon-solid--check" v-else></a>
    </div>
    <h4 v-if="label">{{ label }}</h4>
  </a>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: Number,
  text: Number,
  label: String,
  href: String,
  state: String,
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-wizard-steps__step--${props.state}`);
  if (isActive.value) {
    classes.push("pzh-wizard-steps__step--active");
  }
  return classes.join(" ");
});

const isActive = computed(() => {
  return props.currentStep === props.text;
});

const isComplete = computed(() => {
  return props.state === "complete";
});

const isDisabled = computed(() => {
  return props.state === "disabled" ? -1 : 1;
});
</script>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/WizardSteps/WizardSteps.scss"
/>
