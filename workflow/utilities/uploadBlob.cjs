const path = require("path");
const consola = require("consola");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const mandatoryEnvironmentVariables = [
  "AZURE_SAS_CONNECTION_STRING",
  "AZURE_STORAGE_CONTAINER_NAME",
];

for (let key of mandatoryEnvironmentVariables) {
  if (typeof process.env[key] === "undefined") {
    throw new Error(`Mandatory environment variable ${key} is nog available`);
  }
}

const extensionMimeTypeMap = {
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".css": "text/css",
  ".scss": "text/x-scss",
  ".json": "application/json",
};

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_SAS_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

module.exports = async (content, blobName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const extension = path.extname(blobName);
  const mimeType = extensionMimeTypeMap[extension];

  try {
    await blockBlobClient.upload(content, content.length, {
      blobHTTPHeaders: { blobContentType: mimeType },
    });
    consola.success(`Uploaded ${blobName}`);
  } catch (error) {
    consola.error(`Not able to upload blob ${blobName} due to:`, error);
  }
};
