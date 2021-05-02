const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const zipFile = (filename) => {
  try {
    console.log(process.cwd());
    process.chdir(filename);
    console.log(process.cwd());

    childProcess.execSync(`zip -r ${filename}.zip .`);
  } catch (error) {
    spinner.fail(`Error zipping file ${filename}: ${error.message}`);
  }
};

module.exports = zipFile;
