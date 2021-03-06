const process = require("process");
const fs = require("fs");
const EkkoConfig = require("./ekkoConfig.js");
const { EKKO_GLOBAL_DIRECTORY } = require("./ekkoConfig");
const cdkOutputs = require("./cdkOutputs");
const Promisify = require("./promisify.js");
const ora = require("ora");
const os = require("os");

const spinner = ora();
const DEPLOY_REPO = "https://github.com/ekko-realtime/deploy.git";
const EKKO_REPO = "https://github.com/ekko-realtime/ekko-init.git";
const CWD = process.cwd();
const DEPLOY_DIRECTORY = `${EKKO_GLOBAL_DIRECTORY}/deploy`;
const CDK_OUTPUTS_PATH = `${EKKO_GLOBAL_DIRECTORY}/cdk_outputs.json`;

const existingDeployment = async () => {
  await EkkoConfig.updateAWSCredentials();
  createBlankEkkoDirectory();
  console.log(
    "You can now work on your organization's Ekko realtime apps. Run ekko init --help for more information."
  );
};

const newDeployment = async () => {
  await EkkoConfig.setAWSCredentials();
  await cloneDeployRepo();
  await installCDK();
  await deployAWSInfrastructure();
  await createEkkoDirectory(CWD);
  await handleCDKOutputs();
  console.log(
    "You can now create realtime applications with serverless functions. Run 'ekko --help' to get started."
  );
};

const cloneDeployRepo = async () => {
  process.chdir(EKKO_GLOBAL_DIRECTORY);
  spinner.start(`Cloning ${DEPLOY_REPO}`);
  // loading = ora(`Cloning ${DEPLOY_REPO}`).start();
  await Promisify.execute(`git clone -q '${DEPLOY_REPO}' ~/.ekko/deploy`);
  spinner.succeed(`${DEPLOY_REPO} successfully cloned`);
};

const installCDK = async () => {
  process.chdir(DEPLOY_DIRECTORY);
  spinner.start("Installing aws-cdk...");
  await Promisify.execute("npm install -g aws-cdk");
  spinner.succeed("aws-cdk successfully installed");
  spinner.start("Installing deployment dependencies...");
  await Promisify.execute("npm install");
  spinner.succeed("Deployment dependencies successfully installed");
};

const deployAWSInfrastructure = async () => {
  spinner.start(
    "Deploying temporary resources to bootstrap your AWS deployments..."
  );
  await Promisify.spawner("cdk", ["bootstrap"]);
  spinner.succeed("Bootstrapping complete\n");
  spinner.start(
    "Deploying AWS infrastructure with CDK. This could take 15 minutes or more...\n"
  );
  await Promisify.execute(
    `cdk deploy '*' --outputs-file ${CDK_OUTPUTS_PATH} --require-approval never`
  );
  spinner.succeed("AWS infrastructure successfully deployed");
};

const createEkkoDirectory = async (CWD) => {
  await Promisify.changeDir(os.homedir());
  await Promisify.changeDir(CWD);
  spinner.start("Downloading ekko directory...");
  await Promisify.execute(`git clone -q '${EKKO_REPO}' ekko`);
  await Promisify.changeDir("./ekko");
  await Promisify.execute("rm -rf .git");
  spinner.succeed("New ekko directory successfully created");
};

const handleCDKOutputs = async () => {
  spinner.start("Parsing CDK outputs...");
  await cdkOutputs.writeToEnv();
  spinner.succeed("CDK outputs written to ekko environment");
  spinner.start();
  spinner.succeed("Ekko init complete!\n");
};

const createBlankEkkoDirectory = () => {
  spinner.start();
  if (fs.existsSync("./ekko")) {
    spinner.fail("This directory already contains an ekko directory!");
  } else {
    fs.mkdirSync("./ekko", (err) => {
      if (err) {
        spinner.fail(err);
        return;
      }
    });
    fs.mkdirSync("./ekko/ekko_apps", (err) => {
      if (err) {
        spinner.fail(err);
        return;
      }
    });

    spinner.succeed("ekko directory created.");
  }
};

module.exports = { newDeployment, existingDeployment };
