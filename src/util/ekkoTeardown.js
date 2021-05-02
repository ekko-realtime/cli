const process = require("process");
const { spawnSync } = require("child_process");
const { EKKO_GLOBAL_DIRECTORY } = require("./fileUtil.js");
const { homedir } = require("os");
const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const teardown = async () => {
  console.log("");
  spinner.start(
    "Tearing down AWS infrastructure with cdk. This could take 15 minutes or more...\n"
  );
  process.chdir(`${EKKO_GLOBAL_DIRECTORY}/deploy`);

  console.log("");
  let result = spawnSync("cdk", ["destroy", "-f", "*"]);
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status);
  }
  process.chdir(homedir());
  childProcess.execSync("rm -rf .ekko");
  spinner.succeed("AWS infrastructure successfully torn down");
};

module.exports = teardown;
