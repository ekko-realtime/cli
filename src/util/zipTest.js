const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const zipFile = (filename) => {
  // const path = `./${filename}/${filename}.js`;

  // console.log(path);

  try {
    childProcess.execSync(`zip ${filename} ${filename}`);
  } catch (error) {
    spinner.fail(`Error zipping file ${filename}: ${error.message}`);
  }
};

module.exports = zipFile;
