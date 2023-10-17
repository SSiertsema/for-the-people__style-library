const { uploadBlob } = require("./azureStorageConnector");
require("dotenv").config();

const package = "pzh-style-library";
const glob = require("glob");
const consola = require("consola");
const fs = require("fs");
const config = require("../config");

const targetGlob = `${config.paths.src}/assets/fonts/*.*`;

glob(targetGlob, (err, matches) => {
  if (err) {
    consola.error(err);
  }
  matches.forEach(async (src) => {
    const blobName = `${package}/assets/` + src.split(`/assets/`)[1];
    const content = fs.readFileSync(src, "utf-8");
    await uploadBlob(content, blobName);
  });
});
