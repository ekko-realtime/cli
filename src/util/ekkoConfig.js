const os = require("os");
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const fs = require("fs");
const { cli } = require("cli-ux");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const createEkkoGlobalDirectory = () => {
  spinner.start("Creating ekko global directory...");
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      spinner.succeed("Ekko global directory created");
    } catch (err) {
      throw err;
    }
  } else {
    spinner.succeed("~/.ekko already exists");
  }
};

const AWSCredentials = async () => {
  createEkkoGlobalDirectory();
  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID"
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\n`;

  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
    spinner.succeed("Credentials saved to ekko environment");
  } catch (err) {
    console.error(err);
  }
};

const updateAWSCredentials = async () => {
  // create .ekko if it does not already exist
  createEkkoGlobalDirectory();

  // if secret, api endpoint, and s3 already exist in .env, do not update them
  const SECRET = process.env.SECRET
    ? process.env.SECRET
    : await cli.prompt(
        "Please enter the JWT secret for your organization's deployed ekko infrastructure"
      );
  const API_ENDPOINT = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : await cli.prompt(
        "Please enter the API Key for your organization's deployed ekko infrastructure"
      );

  const S3_BUCKET = process.env.S3_BUCKET
    ? process.env.S3_BUCKET
    : await cli.prompt(
        "Please enter the name of the S3 bucket where your organization's associations.json is stored"
      );

  const LAMBDA_ROLE_ARN = process.env.LAMBDA_ROLE_ARN
    ? process.env.LAMBDA_ROLE_ARN
    : await cli.prompt(
        "Please enter Lambda Role ARN that your organization uses to deploy lambdas from ekko_functions"
      );

  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID"
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\nSECRET=${SECRET}\nAPI_ENDPOINT=${API_ENDPOINT}\nS3_BUCKET=${S3_BUCKET}\nLAMBDA_ROLE_ARN=${LAMBDA_ROLE_ARN}\n`;

  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
    spinner.succeed("Credentials saved to ekko environment");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  AWSCredentials,
  updateAWSCredentials,
  EKKO_ENVIRONMENT_PATH,
  EKKO_GLOBAL_DIRECTORY,
};
