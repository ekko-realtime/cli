const fs = require("fs");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const {
  EKKO_ENVIRONMENT_PATH,
  EKKO_GLOBAL_DIRECTORY,
} = require("./ekkoConfig");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

const getCdkOutputs = () => {
  const data = JSON.parse(
    fs.readFileSync(`${EKKO_GLOBAL_DIRECTORY}/cdk_outputs.json`)
  );

  const S3_BUCKET = data["ekko-server"].s3BucketName;
  const API_ENDPOINT = `http://${data["ekko-server"].serviceURL}`;
  const SECRET = data["ekko-server"].secret;
  const LAMBDA_ROLE_ARN = data["ekko-server"].lambdaRoleArn;

  return { S3_BUCKET, API_ENDPOINT, SECRET, LAMBDA_ROLE_ARN };
};

const writeToEnv = () => {
  const { S3_BUCKET, API_ENDPOINT, SECRET, LAMBDA_ROLE_ARN } = getCdkOutputs();
  const ENV_VARIABLES = `S3_BUCKET=${S3_BUCKET}\nAPI_ENDPOINT=${API_ENDPOINT}\nSECRET=${SECRET}\nLAMBDA_ROLE_ARN=${LAMBDA_ROLE_ARN}`;
  fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES, { flag: "a+" });
};

const logValues = () => {
  const { API_ENDPOINT } = getCdkOutputs();
  console.log("");
  spinner.succeed(`Grabbing your ekko server API endpoint...`);
  console.log("");
  console.log(
    "Copy this ekko server API endpoint and use it to create ekko client instances:"
  );
  console.log(API_ENDPOINT);
  console.log("");
};

module.exports = { writeToEnv, logValues };
