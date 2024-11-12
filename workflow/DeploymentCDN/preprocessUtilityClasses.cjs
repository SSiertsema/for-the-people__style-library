const fs = require("fs");
const path = require("path");
const consola = require("consola");
const sass = require("sass");
const uglifycss = require("uglifycss");
const glob = require(path.resolve(__dirname, "../utilities/glob.cjs"));

const packageConfig = require(path.resolve(__dirname, "../../package.json"));
const config = require(path.resolve(__dirname, "../../config.cjs"));

const targetGlob = path.normalize(
  `${config.paths.src}/scss/utility-classes/**/*.scss`
);

const destFolder = path.normalize(
  `${config.paths.publishDest}/${packageConfig.version}/css/utility-classes`
);

if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

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
