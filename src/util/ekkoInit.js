const childProcess = require("child_process");
const repo = "https://github.com/ekko-live/ekko-init.git";
const process = require("process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const ekkoInit = () => {
  spinner.start("Downloading ekko directory...");
  childProcess.execSync(`git clone -q '${repo}' ekko`);
  process.chdir("./ekko");
  childProcess.execSync("rm -rf .git");
  spinner.succeed("New ekko directory successfully created");
};

module.exports = ekkoInit;
