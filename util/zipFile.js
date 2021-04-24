const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const zipFile = (filename) => {
  const path = process.cwd() + "/" + filename + ".js";

  try {
    childProcess.execSync(`zip ${filename}.zip ${path}`);
  } catch (error) {
    spinner.fail(`Error zipping file ${filename}: ${error.message}`);
  }
};

module.exports = zipFile;
