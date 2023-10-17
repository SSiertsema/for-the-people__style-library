const fs = require("fs");
const path = require("path");
const sass = require("sass");
const { glob } = require("glob");
const consola = require("consola");
const config = require("../../config.cjs");
const targetGlob = `${config.paths.src}/scss/utility-classes/**/*.scss`;
const packageConfig = require("../../package.json");
const uglifycss = require("uglifycss");

const destFolder = `${config.paths.publishDest}/${packageConfig.version}/css/utility-classes`;

async function preprocessUtilityClasses() {
  const matches = await glob(targetGlob);
  matches.forEach((src) => {
    const fileName = path
      .basename(src, ".scss")
      .replace("utility-classes-", "");
    const dest = path.resolve(destFolder, `./${fileName}.css`);
    fs.mkdirSync(destFolder, { recursive: true });
    const result = sass.compile(src, {
      loadPaths: [path.resolve(__dirname, "../node_modules")],
    });
    fs.writeFileSync(dest, result.css, "utf-8");
  });
  consola.success("Process completed");
}

async function uglifyFiles(targetGlob) {
  const matches = await glob(targetGlob);
  matches.forEach((src) => {
    const dest = src.replace(".css", ".min.css");
    const content = fs.readFileSync(src, "utf-8");
    const uglifiedContent = uglifycss.processString(content);
    fs.writeFileSync(dest, uglifiedContent, "utf-8");
  });
}

async function run() {
  const cssSrc = `${destFolder}/**/*.css`;
  try {
    await preprocessUtilityClasses();
    await uglifyFiles(cssSrc);
  } catch (error) {
    consola.error(error);
  }
}

console.log("");
console.log("");
consola.info("Preprocess Utility Classes");

run();
