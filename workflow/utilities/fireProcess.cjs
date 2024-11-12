const { exec } = require("child_process");
const consola = require("consola");

module.exports = (
  command,
  logCommand = false,
  printStdOut = false,
  printStdErr = false
) => {
  if (logCommand) consola.info(`Execute '${command}'`);
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }
      if (printStdOut && stdout) consola.info(stdout);
      if (printStdErr && stderr) consola.warn(stderr);
    });

    childProcess.on("exit", function () {
      resolve();
    });
  });
};
