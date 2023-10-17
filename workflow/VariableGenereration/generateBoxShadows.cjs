const fs = require("fs");
const path = require("path");

const ensureFolderExistence = require("../utilities/ensureFolderExistence.cjs");

const src = "../../src/variables/box-shadows.src.js";
const dest = path.resolve(
  __dirname,
  "../../src/scss/variables/box-shadows.scss"
);

async function run() {
  const m = await import(src);

  const scssContent = m.default
    .map((item) => `${item.variable}: ${item.value};`)
    .join("\n");

  ensureFolderExistence(dest);

  fs.writeFile(dest, scssContent, (err) => {
    if (err) {
      console.error("Error writing output file:", err);
    } else {
      console.log(`SCSS is succesvol naar ${dest} geschreven.`);
    }
  });
}

run();
