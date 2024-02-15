// https://www.npmjs.com/package/svgtofont

const svgtofont = require("svgtofont");
const path = require("path");
const config = require("../config");
const src = config.paths.icons;
const dest = path.resolve(config.paths.dest, "font-icon");
const package = "pzh-style-library";
const fs = require("fs");

const { uploadBlob } = require("./azureStorageConnector");
require("dotenv").config();

async function generateFontAndStyles(fontStyle) {
  await svgtofont({
    src: path.resolve(src, `./${fontStyle}`),
    dist: dest,
    emptyDist: true,
    fontName: `icons-${fontStyle}`,
    classNamePrefix: `icon-${fontStyle}-`,
    styleTemplates: path.resolve(
      config.paths.workflow,
      `./fontIconStyleTemplates/${fontStyle}`
    ),
    css: true,
  });
}

function getFontStyles() {
  const dirents = fs.readdirSync(src, { withFileTypes: true });
  return dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

async function deploy(fontStyle) {
  const woffContents = fs.readFileSync(`${dest}/icons-${fontStyle}.woff`);
  await uploadBlob(
    woffContents,
    `${package}/assets/icons/fonts/icons-${fontStyle}.woff`
  );

  const woff2Contents = fs.readFileSync(`${dest}/icons-${fontStyle}.woff2`);
  await uploadBlob(
    woff2Contents,
    `${package}/assets/icons/fonts/icons-${fontStyle}.woff2`
  );

  const cssContents = fs.readFileSync(`${dest}/icons-${fontStyle}.css`);
  await uploadBlob(
    cssContents,
    `${package}/assets/icons/styles/icons-${fontStyle}.css`
  );
}

async function run() {
  const fontStyles = getFontStyles();
  for (let i = 0; i < fontStyles.length; i++) {
    const fontStyle = fontStyles[i];
    await generateFontAndStyles(fontStyle);
    await deploy(fontStyle);
  }
}

run().then(() => {
  console.log("done");
});
