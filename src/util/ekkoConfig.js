const os = require("os");
var AWS = require("aws-sdk");
const Promisify = require("./promisify.js");
const { homedir } = require("os");
const childProcess = require("child_process");
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const fs = require("fs");
const { cli } = require("cli-ux");
const ora = require("ora");
const spinner = ora();

const createEkkoGlobalDirectory = async () => {
  spinner.start();
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      spinner.succeed("Ekko global directory created\n");
    } catch (err) {
      throw err;
    }
  } else {
    spinner.succeed("~/.ekko already exists");
  }
};

const setAWSCredentials = async () => {
  await createEkkoGlobalDirectory();
  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID",
    { type: "hide" }
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key", {
    type: "hide",
  });
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\n`;

  spinner.start("Updating AWS config file...");
  await Promisify.execute(`aws configure set region ${AWS_REGION}`);
  await Promisify.execute(
    `aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}`
  );
  await Promisify.execute(
    `aws configure set aws_secret_access_key ${AWS_SECRET_KEY}`
  );
  spinner.succeed("AWS config file updated with credentials");

  spinner.start();
  fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
  spinner.succeed("Credentials saved to ekko environment\n");
};

const updateAWSConfig = async () => {};

const updateAWSCredentials = async () => {
  // create .ekko if it does not already exist
  createEkkoGlobalDirectory();

  // if secret, api endpoint, and s3 already exist in .env, do not update them
  const SECRET = process.env.SECRET
    ? process.env.SECRET
    : await cli.prompt(
        "Please enter the SECRET for your organization's deployed ekko infrastructure",
        { type: "hide" }
      );
  const API_ENDPOINT = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : await cli.prompt(
        "Please enter the API_ENDPOINT for your organization's deployed ekko infrastructure"
      );

  const S3_BUCKET = process.env.S3_BUCKET
    ? process.env.S3_BUCKET
    : await cli.prompt(
        "Please enter the name of the S3_BUCKET where your organization's associations.json is stored"
      );

  const LAMBDA_ROLE_ARN = process.env.LAMBDA_ROLE_ARN
    ? process.env.LAMBDA_ROLE_ARN
    : await cli.prompt(
        "Please enter the LAMBDA_ROLE_ARN that your organization uses to deploy lambdas from ekko_functions"
      );

  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID",
    { type: "hide" }
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key", {
    type: "hide",
  });
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\nSECRET=${SECRET}\nAPI_ENDPOINT=${API_ENDPOINT}\nS3_BUCKET=${S3_BUCKET}\nLAMBDA_ROLE_ARN=${LAMBDA_ROLE_ARN}\n`;

  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
    spinner.succeed("Credentials saved to ekko environment\n");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  setAWSCredentials,
  updateAWSCredentials,
  EKKO_ENVIRONMENT_PATH,
  EKKO_GLOBAL_DIRECTORY,
};
