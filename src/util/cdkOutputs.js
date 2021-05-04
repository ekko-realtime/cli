const fs = require("fs");
const ora = require("ora");
const spinner = ora();
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

const writeToEnv = async () => {
  const { S3_BUCKET, API_ENDPOINT, SECRET, LAMBDA_ROLE_ARN } = getCdkOutputs();
  const ENV_VARIABLES = `S3_BUCKET=${S3_BUCKET}\nAPI_ENDPOINT=${API_ENDPOINT}\nSECRET=${SECRET}\nLAMBDA_ROLE_ARN=${LAMBDA_ROLE_ARN}`;
  await writeFilePromise(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES, { flag: "a+" });
};

const writeFilePromise = async (path, content, flags) => {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(path, content, flags);
    resolve();
  });
};

// const logValues = () => {
//   const { API_ENDPOINT } = getCdkOutputs();
//   spinner.succeed(`Grabbing your ekko server API endpoint...`);
//   console.log("");
//   console.log(
//     "Your ekko server API endpoint:"
//   );
//   console.log("");
//   console.log(API_ENDPOINT);
//   console.log("");
//   console.log("You don't need to save this. The jwt command will ");
// };

module.exports = { writeToEnv };
