const fs = require("fs");
const path = require("path");
const consola = require("consola");
const glob = require(path.resolve(__dirname, "../utilities/glob.cjs"));
const delay = require(path.resolve(__dirname, "../utilities/delay.cjs"));

const { throttle } = require("lodash");

const uploadBlob = require(path.resolve(
  __dirname,
  "../utilities/uploadBlob.cjs"
));

const config = require(path.resolve(__dirname, "../../config.cjs"));

const targetGlob = `${config.paths.src}/assets/images/**/*.*`;

glob(targetGlob)
  .then(async (matches) => {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const blobName =
        `${config.cdnContainer}/assets/` + match.split(`/assets/`)[1];
      const content = fs.readFileSync(match, "utf-8");
      await uploadBlob(content, blobName);
      await delay(100);
    }
  })
  .catch((err) => {
    consola.error(err);
  });
