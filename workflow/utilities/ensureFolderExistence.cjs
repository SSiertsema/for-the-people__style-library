const fs = require("fs");
const path = require("path");

function ensureFolderExistence(filePath) {
  const folderPath = path.dirname(filePath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

module.exports = ensureFolderExistence;
