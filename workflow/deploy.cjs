const ftp = require("basic-ftp");
const path = require("path");

// npm run build-storybook

// get credentials from: https://portal.azure.com/#@pzh.nl/resource/subscriptions/d26852ea-8a5e-422f-a754-b46096fe8e62/resourceGroups/pzh-style-library/providers/Microsoft.Web/sites/n2dabaed4e91d4ca59f2a437/vstscd
const userName = "n2dabaed4e91d4ca59f2a437\\$n2dabaed4e91d4ca59f2a437";
const password = "g54FECPaY4Aa604ciWPu7jKYw5HF4wvEXaNnJbjYzu0Dx1ZwmZKQibNdfRXE";
const host = "waws-prod-am2-207.ftp.azurewebsites.windows.net";
const wwwroot = "/site/wwwroot";

const src = path.resolve(__dirname, "../storybook-static/sb-addons");

// ftp files to destination
console.log(userName);

// ESM: import * as ftp from "basic-ftp"

example();

async function example() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  try {
    await client.access({
      host,
      user: userName,
      password: password,
      secure: true,
    });

    await client.ensureDir(wwwroot);
    await client.clearWorkingDir();
    await client.uploadFromDir(src);

    // console.log(await client.list());
    // // await client.uploadFrom("README.md", "README_FTP.md");
    // // await client.downloadTo("README_COPY.md", "README_FTP.md");
  } catch (err) {
    console.log(err);
  }
  client.close();
}
