const fs = require("fs");
const path = require("path");
const consola = require("consola");
const glob = require(path.resolve(__dirname, "../utilities/glob.cjs"));
const uploadBlob = require(path.resolve(
  __dirname,
  "../utilities/uploadBlob.cjs"
));

const config = require(path.resolve(__dirname, "../../config.cjs"));
const targetGlob = `${config.paths.src}/assets/fonts/*.*`;

glob(targetGlob)
  .then((matches) => {
    matches.forEach(async (src) => {
      const blobName =
        `${config.cdnContainer}/assets/` + src.split(`/assets/`)[1];
      const content = fs.readFileSync(src, "utf-8");
      await uploadBlob(content, blobName);
    });
  })
  .catch((err) => {
    consola.error(err);
  });
