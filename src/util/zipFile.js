const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora();

const zipFile = (filename) => {
  try {
    process.chdir(filename);
    childProcess.execSync(`zip -r ${filename}.zip .`);
  } catch (error) {
    spinner.fail(`Error zipping file ${filename}: ${error.message}`);
  }
};

module.exports = zipFile;
