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

const targetGlob = `${config.paths.src}/assets/icons/**/*.*`;

glob(targetGlob)
  .then(async (matches) => {
    for (let i = 0; i < matches.length; i++) {
      const srcPath = matches[i];
      const blobName =
        `${config.cdnContainer}/assets/` + srcPath.split(`/assets/`)[1];
      const content = fs.readFileSync(srcPath, "utf-8");
      await uploadBlob(content, blobName);
      await delay(50);
    }
  })
  .catch((err) => {
    consola.error(err);
  });
