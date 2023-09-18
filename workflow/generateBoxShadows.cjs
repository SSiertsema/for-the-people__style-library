const fs = require("fs");
const path = require("path");

const src = "../src/variables/box-shadows/box-shadows.src.js";
const dest = path.resolve(
  __dirname,
  "../src/variables/box-shadows/box-shadows.scss"
);

async function run() {
  const module = await import(src);
  const boxShadows = module.default;

  // Create SCSS content based on the box shadow data
  const scssContent = boxShadows
    .map((item) => `${item.variable}: ${item.value};`)
    .join("\n");

  // Write the SCSS content to the output file
  fs.writeFile(dest, scssContent, (err) => {
    if (err) {
      console.error("Error writing output file:", err);
    } else {
      console.log(
        "SCSS file (box-shadows.scss) has been generated successfully."
      );
    }
  });
}

run();
