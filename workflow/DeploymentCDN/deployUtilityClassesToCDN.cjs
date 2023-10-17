const { uploadBlob } = require("./azureStorageConnector.cjs");
const path = require("path");
const consola = require("consola");
const fireProcess = require("../utilities/fireProcess.cjs");
require("dotenv").config();

console.log("");
console.log("");
consola.info("Start deployment of utility classes");

fireProcess("node workflow/preprocessUtilityClasses.js").then(async () => {
  const packageConfig = require("../../package.json");
  const version = packageConfig.version;
  const packageName = "style-library";
  const { glob } = require("glob");
  const consola = require("consola");
  const fs = require("fs");
  const config = require("../../config.cjs");

  const targetGlob = `${config.paths.publishDest}/${version}/**/*.*`;

  const matches = await glob(targetGlob);
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const targetFolder = `${packageName}/${version}`;
    const relativeBlobName = match
      .split(`${path.sep}${version}${path.sep}`)[1]
      .replace("utility-classes-", "");
    const content = fs.readFileSync(match, "utf-8");
    await uploadBlob(content, `${targetFolder}/${relativeBlobName}`);
  }

  fs.rm(config.paths.publishDest, { recursive: true }, (err) => {
    if (err) consola.error(err);
    consola.success(`Clean-up publish dest folder`);
  });
});
