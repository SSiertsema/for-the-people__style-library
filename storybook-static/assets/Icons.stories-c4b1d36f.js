import {
  c as n,
  F as _,
  r as p,
  o as r,
  a as o,
  n as d,
  t as u,
} from "./vue.esm-bundler-c6369bcc.js";
const m = { class: "iconography" },
  g = { class: "iconography__icon" },
  h = { class: "iconography__sample" },
  y = { class: "iconography__name" },
  l = {
    __name: "Icons",
    setup(w) {
      const i = [
        "house",
        "check",
        "magnifying-glass",
        "download",
        "user",
        "envelope",
        "location-dot",
        "arrow-up",
        "arrow-right",
        "arrow-down",
        "arrow-left",
        "chevron-up",
        "chevron-right",
        "chevron-down",
        "chevron-left",
      ];
      return (S, x) => (
        r(),
        n("ul", m, [
          (r(),
          n(
            _,
            null,
            p(i, (e) =>
              o("li", null, [
                o("div", g, [
                  o("div", h, [
                    o("i", { class: d("icon-light--" + e) }, null, 2),
                  ]),
                  o("span", y, u(e), 1),
                ]),
              ])
            ),
            64
          )),
        ])
      );
    },
  },
  v = l;
l.__docgenInfo = {
  exportName: "default",
  displayName: "Icons",
  description: "",
  tags: {},
  sourceFiles: [
    "C:/Users/svens/Projects/PZH/style-library/src/components/Icons/Icons.vue",
  ],
};
const I = { title: "Style Components/Icons", component: v },
  s = { args: {} };
var t, c, a;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((t = s.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `{
  args: {}
}`,
      ...((a = (c = s.parameters) == null ? void 0 : c.docs) == null
        ? void 0
        : a.source),
    },
  },
};
const f = ["Icons"],
  j = Object.freeze(
    Object.defineProperty(
      { __proto__: null, Icons: s, __namedExportsOrder: f, default: I },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
export { s as I, j as S };
//# sourceMappingURL=Icons.stories-c4b1d36f.js.map
