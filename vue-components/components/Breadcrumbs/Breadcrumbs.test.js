import { mount } from "@vue/test-utils";
import { beforeEach, describe, test, expect } from "vitest";
import Component from "./Breadcrumbs.vue";

describe("Computed properties", () => {
  beforeEach(async () => {
    const props = {
      items: [
        {
          href: "#",
          text: "Home",
        },
        {
          href: "#",
          text: "Parent page",
        },
        {
          text: "Current page",
        },
      ],
    };

    const wrapper = mount(Component, {
      props,
    });
  });

  test("Computed value 1", () => {
    expect(1 + 1).toEqual(2);
  });
});
