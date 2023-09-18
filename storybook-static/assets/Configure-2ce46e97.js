import{j as e}from"./jsx-runtime-85e77d95.js";import{M as s}from"./index-523cd64e.js";import{u as t}from"./index-4ca30c6d.js";import"./iframe-cdeb6426.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-725317a4.js";import"./index-d37d4223.js";import"./index-f073aaf1.js";import"./index-356e4a49.js";function r(i){const n=Object.assign({h1:"h1",h2:"h2",p:"p",a:"a",h4:"h4",ul:"ul",li:"li",h3:"h3",ol:"ol",pre:"pre",code:"code",strong:"strong"},t(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"PZH Style Library"}),`
`,e.jsx(n.h1,{id:"pzh-html-componenten-bibliotheek",children:"PZH HTML Componenten bibliotheek"}),`
`,e.jsx(n.h2,{id:"wat-is-dit",children:"Wat is dit?"}),`
`,e.jsx(n.p,{children:"Lorem"}),`
`,e.jsx(n.h2,{id:"waarom-bestaat-dit",children:"Waarom bestaat dit?"}),`
`,e.jsx(n.p,{children:"Lorem"}),`
`,e.jsx(n.h2,{id:"input-voor-deze-bibliotheek",children:"Input voor deze bibliotheek"}),`
`,e.jsxs(n.p,{children:["De input voor deze bibliotheek is het ",e.jsx(n.a,{href:"https://www.figma.com/file/11ZuN25dSOqx3w1ie9Avbz/Design-System---Provincie-Zuid-Holland?type=design&node-id=0-1&mode=design&t=QcNAIJsbMhtMMUQQ-0",target:"_blank",rel:"nofollow noopener noreferrer",children:"Design System"}),". Dit is een systeem waar het design team design elementen heeft genormaliseerd. Het systeem is gemaakt in ",e.jsx(n.a,{href:"https://help.figma.com/hc/en-us/articles/14563969806359-What-is-Figma-#:~:text=Figma's%20mission%20is%20to%20make,other%20digital%20products%20and%20experiences.",target:"_blank",rel:"nofollow noopener noreferrer",children:"Figma"}),". Net als deze library is het een incrementeel product. Een product die altijd zal evolueren. Dit doen we in projectvorm. Hier staat de ",e.jsx(n.a,{href:"https://pzh-nl.visualstudio.com/Design%20System%20Architectuur/_backlogs/backlog/Design%20System%20Architecture%20Team/Features",target:"_blank",rel:"nofollow noopener noreferrer",children:"backlog"})," centraal."]}),`
`,e.jsx(n.h2,{id:"output",children:"Output"}),`
`,e.jsx(n.h4,{id:"toegankelijke-omgeving-waar-we",children:"Toegankelijke omgeving waar we:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Inzichtelijk maken welke componenten we hebben"}),`
`,e.jsx(n.li,{children:"Communiceren waarom een component bestaat (Rationale)"}),`
`,e.jsx(n.li,{children:"Communiceren wanneer het component gebruikt dient te worden (Richtlijnen)"}),`
`,e.jsx(n.li,{children:"Communiceren hoe de library gebruikt kan worden (Techniek)"}),`
`,e.jsx(n.li,{children:"Communiceren hoe een component geimplementeerd kan worden (Techniek)"}),`
`]}),`
`,e.jsx(n.h4,{id:"css-utility-classes",children:"CSS utility classes"}),`
`,e.jsxs(n.p,{children:["Deze ",e.jsx(n.a,{href:"",children:"Utility classes"})," wordt beschikbaar gesteld op het CDN (Content delivery network) van Provincie Zuid-Holland."]}),`
`,e.jsx(n.h4,{id:"scss-variabelen-en-mixins",children:"SCSS variabelen en Mixins"}),`
`,e.jsxs(n.p,{children:["We hebben een ",e.jsx(n.a,{href:"https://www.npmjs.com/package/@pzh-temporary/style-library",target:"_blank",rel:"nofollow noopener noreferrer",children:"NPM omgeving"})," waar we SCSS variabelen opslaan. Deze kunnen vanuit andere applicaties gebruikt worden als bronbestanden."]}),`
`,e.jsx(n.h2,{id:"nice-hoe-kan-ik-er-gebruik-van-maken",children:"Nice! Hoe kan ik er gebruik van maken?"}),`
`,e.jsx(n.p,{children:"Jazeker! Op verschillende manieren"}),`
`,e.jsx(n.h3,{id:"inladen-css-van-cdn",children:"Inladen CSS van CDN"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Inladen CSS in je website"}),`
`,e.jsx(n.li,{children:"HTML kopieren uit component documentatie"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<html lang="en">
<link>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample PZH CSS library usage</title>
    <link rel="stylesheet" href="URL NOG TOEVOEGEN"></link>
</head>
<body>
    <button class="button-primary button-primary--size-medium">
        <span>Button Primary</span>
      </button>
</body>
</html>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Let op:"})," Houd er rekening mee dat je applicatie beveiligd kan zijn met een CSP (Content security policy). In dat geval kan het mogelijk zijn dat de applicatie het CSS bestand niet in mag laden."]}),`
`,e.jsx(n.h3,{id:"gebruik-maken-van-scss-library",children:"Gebruik maken van SCSS library"}),`
`,e.jsx(n.p,{children:"We stellen SCSS variabelen beschikbaar via NPM package @pzh-temporary/html-componenten-library."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Vanuit een npm applicatie command line:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-JS",children:`npm i -D @pzh-temporary/style-library
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"In scss bestand:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-SCSS",children:`@import '@pzh-temporary/style-library/variables/colors.scss';
div {
    background-color: $color-green-500;
}
`})}),`
`,e.jsx(n.h2,{id:"referenties",children:"Referenties"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://pzh-nl.visualstudio.com/Design%20System%20Architectuur/_wiki/wikis/Design-system.wiki/1449/Design-System-Digital-Pattern-Architecture",target:"_blank",rel:"nofollow noopener noreferrer",children:"Front-end Architectuur"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.figma.com/file/11ZuN25dSOqx3w1ie9Avbz/Design-System---Provincie-Zuid-Holland?type=design&node-id=0-1&mode=design&t=QcNAIJsbMhtMMUQQ-0",target:"_blank",rel:"nofollow noopener noreferrer",children:"Design System"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"",children:"Repository"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"",children:"Backlog"})}),`
`]})]})}function u(i={}){const{wrapper:n}=Object.assign({},t(),i.components);return n?e.jsx(n,Object.assign({},i,{children:e.jsx(r,i)})):r(i)}export{u as default};
//# sourceMappingURL=Configure-2ce46e97.js.map
