const fs = require("fs");
const path = require("path");

const src = "../src/variables/spacers/spacers.src.js";
const dest = path.resolve(__dirname, "../src/variables/spacers/spacers.scss");

async function run() {
  const module = await import(src);
  const spacers = module.default;

  // Create the SCSS content based on the input data
  const scssContent = spacers
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
