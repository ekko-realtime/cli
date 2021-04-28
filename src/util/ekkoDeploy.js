const process = require("process");
const childProcess = require("child_process");
const { spawnSync } = require("child_process");
const {
  createEkkoGlobalDirectory,
  updateAWSCredentials,
  EKKO_GLOBAL_DIRECTORY,
} = require("../util/fileUtil.js");
const DEPLOY_DIRECTORY = `${EKKO_GLOBAL_DIRECTORY}/deploy`;
const CDK_OUTPUTS_PATH = `${EKKO_GLOBAL_DIRECTORY}/cdk_outputs.json`;
const parseCdkOutputs = require("./cdkOutputs");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const DEPLOY_REPO = "https://github.com/ekko-live/deploy.git";
/*
before running ekko init
  - install aws-cli
  - input credentials for AWS (then they can install and run cdk deploy)


create ~/.ekko folder
git clone git@github.com:ekko-live/deploy.git     CLONE INTO .ekko
cd into .ekko/deploy
git fetch && git checkout microdeploy  // NOT NEEDED IN THE END

npm install -g aws-cdk
npm install
cdk bootstrap
cdk deploy '*' --outputs-file ~/.ekko/cdk-outputs.json --require-approval never

take cdk outputs and write them to .env
get AWS credentials from dev and write to .env
create ekko directory
*/

const ekkoDeploy = () => {
  spinner.start("spinning");
  setTimeout(() => {
    spinner.succeed("spun!");
  }, 3000);

  // updateAWSCredentials();
  // createEkkoGlobalDirectory();

  process.chdir(EKKO_GLOBAL_DIRECTORY);
  spinner.start(`Cloning ${DEPLOY_REPO}`);
  childProcess.execSync(`git clone -q '${DEPLOY_REPO}' ~/.ekko/deploy`);
  spinner.succeed(`${DEPLOY_REPO} successfully cloned`);
  process.chdir(DEPLOY_DIRECTORY);
  spinner.start("Installing aws-cdk...");
  childProcess.execSync("npm install -g aws-cdk");
  spinner.succeed("aws-cdk successfully installed");
  spinner.start("Installing deployment dependencies...");
  childProcess.execSync("npm install");
  spinner.succeed("Deployment dependencies installed");
  spinner.start("Bootstrapping cdk deployment...");
  spawnSync("cdk", ["bootstrap"]);
  spinner.succeed("cdk depolyment successfully bootstrapped");
  spinner.start(
    "Deploying AWS infrastructure with cdk. This could take 15 minutes or more...\n"
  );
  spawnSync("cdk", [
    "deploy",
    "*",
    "--outputs-file",
    CDK_OUTPUTS_PATH,
    "--require-approval",
    "never",
  ]);
  spinner.succeed("AWS infrastructure successfully deployed");

  // spinner.start("Parsing cdk outputs...");
  // process.chdir("~/.ekko");
  // parseCdkOutputs();
};

module.exports = ekkoDeploy;
