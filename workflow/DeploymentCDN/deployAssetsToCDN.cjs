const fs = require("fs");
const path = require("path");
const consola = require("consola");
const delay = require(path.resolve(__dirname, "../utilities/delay.cjs"));
const glob = require(path.resolve(__dirname, "../utilities/glob.cjs"));
const uploadBlob = require(path.resolve(
  __dirname,
  "../utilities/uploadBlob.cjs"
));

const config = require(path.resolve(__dirname, "../../config.cjs"));

const packageConfig = require(path.resolve(__dirname, "../../package.json"));

const pattern = `${config.paths.src}/assets/**/*.*`.replace(/\\/g, "/");

try {
  const matches = glob(pattern);
  matches.forEach(async (src) => {
    const blobName =
      `${config.cdnContainer}/${packageConfig.version}/assets/` +
      src.split(`/assets/`)[1];
    const content = fs.readFileSync(src, "utf-8");
    await uploadBlob(content, blobName);
    await delay(50);
  });
} catch (err) {
  consola.error(err);
}
