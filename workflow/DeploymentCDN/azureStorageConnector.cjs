const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const consola = require("consola");
const path = require("path");

const mandatoryEnvironmentVariables = [
  "AZURE_SAS_TOKEN",
  "AZURE_STORAGE_ACCOUNT_NAME",
  "AZURE_STORAGE_CONTAINER_NAME",
];

for (let key of mandatoryEnvironmentVariables) {
  if (typeof process.env[key] === "undefined") {
    throw new Error(`Mandatory environment variable ${key} is nog available`);
  }
}

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net${process.env.AZURE_SAS_TOKEN}`
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

async function uploadBlob(content, blobName) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const extension = path.extname(blobName);

  const extensionMimeTypeMap = {
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".woff2": "font/woff2",
    ".css": "text/css",
    ".scss": "text/x-scss",
  };

  try {
    await blockBlobClient.upload(content, content.length);
    blockBlobClient.setHTTPHeaders({
      blobContentType: extensionMimeTypeMap[extension],
    });
    consola.success(`Uploaded ${blobName}`);
  } catch (error) {
    consola.error(`Not able to upload blob ${blobName} due to:`, error);
  }
}

module.exports = {
  uploadBlob,
};
