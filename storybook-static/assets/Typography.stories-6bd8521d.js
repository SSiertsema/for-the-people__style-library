import {
  c as o,
  F as r,
  r as p,
  o as n,
  a as e,
  t as a,
  b as i,
  n as l,
} from "./vue.esm-bundler-c6369bcc.js";
const m = { class: "typography" },
  h = { class: "typography__name-and-usage" },
  x = { class: "typography__name" },
  T = { class: "typography__usage" },
  f = { class: "typography__name-and-usage" },
  b = { class: "typography__name" },
  v = { class: "typography__usage" },
  S = "The fox jumps over the lazy brown dog",
  q = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat.
  <strong>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
  dolore eu fugiat nulla pariatur.</strong>
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
  officia deserunt mollit anim id est laborum.
`,
  d = {
    __name: "Typography",
    setup(M) {
      const y = ["xxxl", "xxl", "xl", "l", "m", "s"],
        g = ["l", "m", "s"];
      return (N, V) => (
        n(),
        o("ul", m, [
          (n(),
          o(
            r,
            null,
            p(y, (s) =>
              e("li", null, [
                e("div", h, [
                  e("span", x, "Heading " + a(s), 1),
                  i(", "),
                  e(
                    "span",
                    T,
                    " @include typography(heading, " + a(s) + "); ",
                    1
                  ),
                ]),
                e(
                  "div",
                  {
                    class: l(
                      "typography__sample typography__sample--heading-" + s
                    ),
                    innerHTML: S,
                  },
                  null,
                  2
                ),
              ])
            ),
            64
          )),
          (n(),
          o(
            r,
            null,
            p(g, (s) =>
              e("li", null, [
                e("div", f, [
                  e("span", b, "Text " + a(s), 1),
                  i(", "),
                  e("span", v, " @include typography(text, " + a(s) + "); ", 1),
                ]),
                e(
                  "div",
                  {
                    class: l(
                      "typography__sample typography__sample--text-" + s
                    ),
                    innerHTML: q,
                  },
                  null,
                  2
                ),
              ])
            ),
            64
          )),
        ])
      );
    },
  },
  H = d;
d.__docgenInfo = {
  exportName: "default",
  displayName: "Typography",
  description: "",
  tags: {},
  sourceFiles: [
    "C:/Users/svens/Projects/PZH/style-library/src/components/Typography/Typography.vue",
  ],
};
const L = { title: "Style Components/Typography", component: H },
  t = { args: {} };
var c, u, _;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((c = t.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {}
}`,
      ...((_ = (u = t.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : _.source),
    },
  },
};
const j = ["Typography"],
  B = Object.freeze(
    Object.defineProperty(
      { __proto__: null, Typography: t, __namedExportsOrder: j, default: L },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
export { B as S, t as T };
//# sourceMappingURL=Typography.stories-6bd8521d.js.map
