/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    {
      name: "@storybook/addon-essentials",
      options: {
        controls: false,
        actions: false,
      },
    },
    // "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-designs",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
