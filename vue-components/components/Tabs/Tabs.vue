<script setup>
import { computed } from "vue";
import Indicator from "../Indicator/Indicator.vue";

const props = defineProps({
  type: {
    type: String,
    default: "buttons",
    validator(value) {
      return ["buttons", "links"].includes(value);
    },
  },
  tabs: Array,
  alignment: {
    type: String,
    default: "start",
  },
  size: {
    type: String,
  },
  direction: {
    type: String,
    default: "horizontal",
  },
  indicatorSize: {
    type: String,
    default: "small",
  },
});

const additionalClasses = computed(() => {
  const classes = [];
  classes.push(`pzh-tabs--type-${props.type}`);
  classes.push(`pzh-tabs--align-${props.alignment}`);
  classes.push(`pzh-tabs--direction-${props.direction}`);
  classes.push(`pzh-tabs--size-${props.size}`);

  return classes.join(" ");
});

function handleTabClick(tab) {
  emit("tabClick", tab);
}

const emit = defineEmits(["tabClick"]);
</script>

<template>
  <div class="pzh-tabs" :class="additionalClasses">
    <button
      v-for="tab in props.tabs"
      class="pzh-tabs__tab"
      :key="tab.id"
      type="button"
      :class="{
        'pzh-tabs__tab--active': tab.isActive,
        'pzh-tabs__tab--disabled': tab.isDisabled,
      }"
      @click="handleTabClick(tab)"
    >
      <Indicator
        :size="indicatorSize"
        :class="
          tab.indicatorText
            ? 'pzh-tabs__tab-indicator--with-content'
            : 'pzh-tabs__tab-indicator--without-content'
        "
        :text="tab.indicatorText"
        v-if="tab.showIndicator"
      ></Indicator>
      <i v-if="tab.icon" :class="'icon-light--' + tab.icon"></i>
      <span v-if="tab.text">
        {{ tab.text }}
      </span>
    </button>
  </div>
</template>

<style
  scoped
  lang="scss"
  src="@pzh-temporary/html-component-library/src/components/Tabs/Tabs.scss"
></style>
