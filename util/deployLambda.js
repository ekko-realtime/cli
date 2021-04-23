const AWS = require("aws-sdk");
const zipLambda = require("./zipLambda");
const fs = require("fs");
const getLambdaRole = require("./getLambdaRole");
const ekkoConfig = require("./ekkoConfig");
require("dotenv").config({ path: ekkoConfig.globalDirectory + "/.env" });

const deploy = async (fileName) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });
  console.log("CONFIG", AWS.config);

  console.log("ATTEMPTING DEPLOY", fileName);
  zipLambda.zipFile(fileName);

  let lambdaRole = await getLambdaRole();
  let newLambda = await createLambda(lambdaRole, fileName);

  console.log("created?", newLambda);
};

const createLambda = async (lambdaRole, fileName) => {
  let newLambda;

  const apiVersion = "latest";
  // const region = "us-east-1";
  const lambda = new AWS.Lambda({ apiVersion });
  const zipContents = fs.readFileSync(`${fileName}.zip`);

  const createFunctionParams = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: fileName,
    Handler: `${fileName}.handler`,
    Role: lambdaRole.Role.Arn,
    Runtime: "nodejs14.x",
  };

  try {
    newLambda = await lambda.createFunction(createFunctionParams).promise();
    console.log("newLambda created: ", newLambda);
  } catch (error) {
    console.error("error creating new lambda: ", error);
  }

  return newLambda;
};

module.exports = deploy;
