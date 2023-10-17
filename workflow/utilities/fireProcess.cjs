const { exec } = require("child_process");
const consola = require("consola");

function fireProcess(
  command,
  logCommand = false,
  printStdOut = false,
  printStdErr = false
) {
  if (logCommand) consola.info(`Execute '${command}'`);
  return new Promise((resolve, reject) => {
    const ls = exec(command, function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }
      if (printStdOut && stdout) consola.info(stdout);
      if (printStdErr && stderr) consola.warn(stderr);
    });

    ls.on("exit", function () {
      resolve();
    });
  });
}

module.exports = fireProcess;
