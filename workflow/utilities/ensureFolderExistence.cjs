const fs = require("fs");
const path = require("path");

module.exports = (filePath) => {
  const folderPath = path.dirname(filePath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};
