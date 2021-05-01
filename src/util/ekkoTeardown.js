const process = require("process");
const { spawnSync } = require("child_process");
const { EKKO_GLOBAL_DIRECTORY } = require("./fileUtil.js");
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
  console.log("");
  console.log("");

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status);
  } else {
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
  }

  spinner.succeed("AWS infrastructure successfully torn down");
};

module.exports = teardown;
