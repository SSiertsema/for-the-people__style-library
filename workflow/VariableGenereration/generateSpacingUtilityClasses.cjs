const fs = require("fs");
const path = require("path");
const ensureFolderExistence = require("../utilities/ensureFolderExistence.cjs");

const src = "../../src/variables/spacers.src.js";
const dest = path.resolve(
  __dirname,
  "../../src/scss/utility-classes/utility-classes-spacing.scss"
);

async function run() {
  const m = await import(src);
  const spacers = m.default;

  const includes = ['@import "../variables/spacers.scss";'];

  const scssPartials = [...includes];

  for (let i = 0; i < spacers.length; i++) {
    const spacer = spacers[i];
    const variableName = spacer.variable.replace("$space-", "");
    scssPartials.push(`.pzh-m-${variableName}{ margin: ${spacer.variable}; }`);
    scssPartials.push(
      `.pzh-mt-${variableName}{ margin-top: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-mr-${variableName}{ margin-right: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-mb-${variableName}{ margin-bottom: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-ml-${variableName}{ margin-left: ${spacer.variable}; }`
    );

    scssPartials.push(`.pzh-p-${variableName}{ padding: ${spacer.variable}; }`);
    scssPartials.push(
      `.pzh-pt-${variableName}{ padding-top: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-pr-${variableName}{ padding-right: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-pb-${variableName}{ padding-bottom: ${spacer.variable}; }`
    );
    scssPartials.push(
      `.pzh-pl-${variableName}{ padding-left: ${spacer.variable}; }`
    );
  }

  const fullSCSS = scssPartials.join("\n\n");

  ensureFolderExistence(dest);

  fs.writeFile(dest, fullSCSS, (err) => {
    if (err) {
      console.error("Fout bij schrijven naar bestand:", err);
    } else {
      console.log(`SCSS is succesvol naar ${dest} geschreven.`);
    }
  });
}

run();
