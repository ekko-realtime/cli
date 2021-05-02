const process = require("process");
const childProcess = require("child_process");
const { spawnSync } = require("child_process");
const {
  provideAWSCredentials,
  updateAWSCredentials,
  createBlankEkkoDirectory,
  EKKO_GLOBAL_DIRECTORY,
} = require("./fileUtil.js");
const DEPLOY_DIRECTORY = `${EKKO_GLOBAL_DIRECTORY}/deploy`;
const CDK_OUTPUTS_PATH = `${EKKO_GLOBAL_DIRECTORY}/cdk_outputs.json`;
const cdkOutputs = require("./cdkOutputs");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const DEPLOY_REPO = "https://github.com/ekko-live/deploy.git";
const os = require("os");
const repo = "https://github.com/ekko-live/ekko-init.git";
const CWD = process.cwd();

const existingDeployment = async () => {
  await updateAWSCredentials();
  createBlankEkkoDirectory();
};

const newDeployment = async () => {
  await provideAWSCredentials();
  cloneDeployRepo();
  installCDK();
  deployAWSInfrastructure();
  createEkkoDirectory(CWD);
  handleCDKOutputs();
};

const cloneDeployRepo = () => {
  process.chdir(EKKO_GLOBAL_DIRECTORY);
  console.log("");
  spinner.start(`Cloning ${DEPLOY_REPO}`);
  console.log("");
  childProcess.execSync(`git clone -q '${DEPLOY_REPO}' ~/.ekko/deploy`);
  spinner.succeed(`${DEPLOY_REPO} successfully cloned`);
  console.log("");
};

const installCDK = () => {
  process.chdir(DEPLOY_DIRECTORY);
  console.log("");
  spinner.start("Installing aws-cdk...");
  console.log("");
  childProcess.execSync("npm install -g aws-cdk");
  spinner.succeed("aws-cdk successfully installed");
  console.log("");
  spinner.start("Installing deployment dependencies...");
  console.log("");
  childProcess.execSync("npm install");
  spinner.succeed("Deployment dependencies installed");
  console.log("");
};

const deployAWSInfrastructure = () => {
  console.log("");
  spinner.start(
    "Deploying temporary resources to bootstrap your AWS deployments..."
  );
  console.log("");
  spawnSync("cdk", ["bootstrap"]);
  spinner.succeed("Bootstrapping complete");
  console.log("");
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
  console.log("");
  spinner.succeed("AWS infrastructure successfully deployed");
  console.log("");
};

const createEkkoDirectory = (CWD) => {
  process.chdir(os.homedir());
  process.chdir(CWD);
  console.log("");
  spinner.start("Downloading ekko directory...");
  console.log("");
  childProcess.execSync(`git clone -q '${repo}' ekko`);
  process.chdir("./ekko");
  childProcess.execSync("rm -rf .git");
  spinner.succeed("New ekko directory successfully created");
  console.log("");
};

const handleCDKOutputs = () => {
  console.log("");
  spinner.start("Parsing cdk outputs...");
  console.log("");
  cdkOutputs.writeToEnv();
  spinner.succeed("cdk outputs written to ekko environment");
  console.log("");
  cdkOutputs.logValues();
};

module.exports = { newDeployment, existingDeployment };
