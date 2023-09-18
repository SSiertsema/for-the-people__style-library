const fs = require("fs");
const path = require("path");
const dest = path.resolve(__dirname, "../src/variables/colors/colors.scss");

async function run() {
  const colorsModule = await import("../src/variables/colors/colors.src.js");
  const colors = colorsModule.default;

  // Array om de gegenereerde SCSS voor alle categorieën op te slaan
  const allCategorySCSS = [];

  // Loop door elke categorie in de JSON en genereer SCSS
  for (const category in colors) {
    const categoryColors = colors[category];
    const categorySCSS = generateSCSSForCategory(category, categoryColors);
    allCategorySCSS.push(categorySCSS);
  }

  // De volledige SCSS voor alle categorieën samenvoegen
  const fullSCSS = allCategorySCSS.join("\n\n");

  // Schrijf de SCSS naar een bestand
  fs.writeFile(dest, fullSCSS, (err) => {
    if (err) {
      console.error("Fout bij schrijven naar bestand:", err);
    } else {
      console.log("SCSS is succesvol naar colors.scss geschreven.");
    }
  });
}

// Functie om een SCSS-variabele te genereren
function generateSCSSVariable(variable, hex) {
  return `${variable}: ${hex};`;
}

// Functie om SCSS voor een bepaalde categorie te genereren
function generateSCSSForCategory(category, colors) {
  const categorySCSS = [`// Categorie: ${category}`];
  for (const color of colors) {
    categorySCSS.push(generateSCSSVariable(color.variable, color.hex));
  }
  return categorySCSS.join("\n");
}

run();
