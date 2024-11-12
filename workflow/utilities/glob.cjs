const path = require("path");
const glob = require("glob-promise");

module.exports = async (pattern) => {
  posixPattern = pattern.replaceAll("\\", path.posix.sep);
  console.log(pattern, posixPattern);
  return await glob(posixPattern);
};
