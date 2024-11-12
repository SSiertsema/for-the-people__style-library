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
const version = packageConfig.version;

const fireProcess = require("../utilities/fireProcess.cjs");

async function run() {
  consola.info("Start preprocessing");
  await fireProcess("npm run process-utility-classes");
  consola.success("Preprocessing done");
  consola.info("Start deployment");
  const files = await getFiles();
  await processFiles(files);
  consola.success("Deployment done");
  cleanUp();
}

async function getFiles() {
  const targetGlob = path.normalize(
    `${config.paths.publishDest}/${version}/**/*.*`
  );
  return await glob(targetGlob);
}

async function processFiles(fileNames) {
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const targetFolder = path.normalize(`${config.cdnContainer}/${version}`);
    const splitOn = `/${version}/`;
    const relativeBlobName = fileName
      .split(splitOn)[1]
      .replace("utility-classes-", "");
    const content = fs.readFileSync(fileName, "utf-8");
    await uploadBlob(content, `${targetFolder}/${relativeBlobName}`);
  }
}

function cleanUp() {
  fs.rm(config.paths.publishDest, { recursive: true }, (err) => {
    if (err) consola.error(err);
    consola.success(`Clean-up done`);
  });
}

run()
  .then(async () => {
    await delay(50);
    consola.success("Process done");
  })
  .catch((err) => {
    console.error(err);
  });
