const fs = require("fs");
const path = require("path");

const src = "../src/variables/radii/radii.src.js";
const dest = path.resolve(__dirname, "../src/variables/radii/radii.scss");

async function run() {
  const module = await import(src);
  const radii = module.default;

  // Create the SCSS content based on the input data
  const scssContent = radii
    .map((item) => `${item.variable}: ${item.value};`)
    .join("\n");

  // Write the SCSS content to the output file
  fs.writeFile(dest, scssContent, (err) => {
    if (err) {
      console.error("Error writing output file:", err);
    } else {
      console.log("SCSS file (radii.scss) has been generated successfully.");
    }
  });
}

run();
