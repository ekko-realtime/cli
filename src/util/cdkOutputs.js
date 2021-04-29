const fs = require("fs");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const { EKKO_ENVIRONMENT_PATH, EKKO_GLOBAL_DIRECTORY } = require("./fileUtil");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

const getCdkOutputs = () => {
  const data = JSON.parse(
    fs.readFileSync(`${EKKO_GLOBAL_DIRECTORY}/cdk_outputs.json`)
  );

  const S3_BUCKET = data["ekko-server"].s3BucketName;
  const API_ENDPOINT = `http://${data["ekko-server"].serviceURL}`;
  const SECRET = data["ekko-server"].secret;

  return { S3_BUCKET, API_ENDPOINT, SECRET };
};

const writeToEnv = () => {
  // console.log("DATA:", data);
  const { S3_BUCKET, API_ENDPOINT, SECRET } = getCdkOutputs();
  const ENV_VARIABLES = `S3_BUCKET=${S3_BUCKET}\nAPI_ENDPOINT=${API_ENDPOINT}\nSECRET=${SECRET}\n`;
  // console.log(S3_BUCKET);
  // console.log(API_ENDPOINT);
  // console.log(SECRET);

  // const json = {
  //   sharedResources: {},
  //   ekkoServer: {
  //     s3BucketName: "s3 bucket name",
  //     serviceURL: "an api endpoint",
  //     secret: "a secret",
  //   },
  // };

  // try {
  fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES, { flag: "a+" });
  //   spinner.succeed("Credentials saved to ekko environment");
  // } catch (err) {
  //   console.error(err);
  // }
};

const logValues = () => {
  const { API_ENDPOINT, SECRET } = getCdkOutputs();
  spinner.succeed(`Generating values for your server and client code:`);
  spinner.succeed(`Your ekko server API key: ${API_ENDPOINT}`);
  spinner.succeed(`Your ekko server JsonWebToken Secret: ${SECRET}`);
};

module.exports = { writeToEnv, logValues };
