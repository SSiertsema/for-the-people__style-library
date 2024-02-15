// https://www.npmjs.com/package/svgtofont
// Create spriter instance (see below for `config` examples)

const { uploadBlob } = require("./azureStorageConnector");
require("dotenv").config();
const package = "pzh-style-library";

const glob = require("glob");
const consola = require("consola");
const fs = require("fs");
const config = require("../config");
const SVGSpriter = require("svg-sprite");
const spriter = new SVGSpriter({
  mode: {
    css: true, // Create a «css» sprite
    view: true, // Create a «view» sprite
    defs: true, // Create a «defs» sprite
    symbol: true, // Create a «symbol» sprite
    stack: true, // Create a «stack» sprite
  },
  shape: {
    transform: ["svgo"],
  },
});

const targetGlob = `${config.paths.src}/assets/icons/*.svg`;
const dest = `${config.paths.dest}/icons-sprite`;

function generateSprite() {
  return new Promise((resolve, reject) => {
    glob(targetGlob, (err, matches) => {
      if (err) {
        consola.error(err);
      }

      matches.forEach(async (match) => {
        spriter.add(match, null, fs.readFileSync(match, "utf-8"));
      });

      spriter.compile((error, result) => {
        fs.writeFileSync(
          `${dest}/icons.sprite.svg`,
          result.symbol.sprite.contents
        );
        resolve();
      });
    });
  });
}

async function run() {
  fs.mkdirSync(dest, { recursive: true });
  await generateSprite();
  const sprite = fs.readFileSync(`${dest}/icons.sprite.svg`);
  await uploadBlob(sprite, `${package}/assets/icons/icons.sprite.svg`);
}

run().then(() => {
  consola.success("Done!");
});
