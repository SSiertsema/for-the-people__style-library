const path = require("path");
const basePath = path.resolve(__dirname, "./");
const config = {
  cdnContainer: "style-library",
  paths: {
    base: basePath,
    workflow: path.normalize(`${basePath}/workflow`),
    public: path.normalize(`${basePath}/public`),
    src: path.normalize(`${basePath}/src`),
    scss: path.normalize(`${basePath}/src/scss`),
    icons: path.normalize(`${basePath}/src/assets/icons`),
    static: path.normalize(`${basePath}/src/static`),
    dest: path.normalize(`${basePath}/public/dest`),
    publishDest: path.normalize(`${basePath}/dest`),
  },
};

module.exports = config;
