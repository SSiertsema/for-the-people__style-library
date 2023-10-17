const fs = require("fs");
const path = require("path");
const ensureFolderExistence = require("../utilities/ensureFolderExistence.cjs");

const src = "../../src/variables/colors.src.js";
const dest = path.resolve(__dirname, "../../src/scss/variables/colors.scss");

async function run() {
  const m = await import(src);
  const colors = m.default;

  const allCategorySCSS = [];

  for (const category in colors) {
    const categoryColors = colors[category];
    const categorySCSS = generateSCSSForCategory(category, categoryColors);
    allCategorySCSS.push(categorySCSS);
  }

  const fullSCSS = allCategorySCSS.join("\n\n");

  ensureFolderExistence(dest);

  fs.writeFile(dest, fullSCSS, (err) => {
    if (err) {
      console.error("Fout bij schrijven naar bestand:", err);
    } else {
      console.log(`SCSS is succesvol naar ${dest} geschreven.`);
    }
  });
}

function generateSCSSVariable(variable, hex) {
  return `${variable}: ${hex};`;
}

function generateSCSSForCategory(category, colors) {
  const categorySCSS = [`// Categorie: ${category}`];
  for (const color of colors) {
    categorySCSS.push(generateSCSSVariable(color.variable, color.hex));
  }
  return categorySCSS.join("\n");
}

run();
