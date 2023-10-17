const path = require("path");
const basePath = path.resolve(__dirname, "./");
const config = {
  paths: {
    base: basePath,
    workflow: `${basePath}/workflow`,
    public: `${basePath}/public`,
    src: `${basePath}/src`,
    scss: `${basePath}/src/scss`,
    icons: `${basePath}/src/assets/icons`,
    static: `${basePath}/src/static`,
    dest: `${basePath}/public/dest`,
    publishDest: `${basePath}/dest`,
  },
};

module.exports = config;
