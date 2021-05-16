const { EKKO_GLOBAL_DIRECTORY } = require("./ekkoConfig.js");
const Promisify = require("./promisify.js");
const EkkoFunction = require("./ekkoFunction.js");
const { homedir } = require("os");
const ora = require("ora");
const spinner = ora();

const teardown = async () => {
  await EkkoFunction.destroyAllLambdas();
  spinner.start(
    "Tearing down remaining Ekko infrastructure on AWS. This could take 15 minutes or more...\n"
  );
  await Promisify.changeDir(`${EKKO_GLOBAL_DIRECTORY}/deploy`);
  await Promisify.spawner("cdk", ["destroy", "-f", "*"]);
  await Promisify.changeDir(homedir());
  await Promisify.execute("rm -rf .ekko");
  spinner.succeed("AWS infrastructure successfully torn down");
};

module.exports = teardown;
