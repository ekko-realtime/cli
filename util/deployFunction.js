const zipFile = require("./zipFile");
const fs = require("fs");
const getLambdaRole = require("./getLambdaRole");
const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");

const deployFunction = async (fileName) => {
  zipFile(fileName);
  const zipContents = fs.readFileSync(`${fileName}.zip`);
  const lambdaRole = await getLambdaRole();
  const params = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: fileName,
    Handler: `${fileName}.handler`,
    Role: lambdaRole.Role.Arn,
    Runtime: "nodejs14.x",
  };

  try {
    console.log(`Deploying ${fileName} to AWS Lambda...`);
    await lambda.createFunction(params).promise();
    console.log(`${fileName} deployed!`);
  } catch (error) {
    console.error(error);
  }

  deleteLocalFile(fileName + ".zip");
};

module.exports = deployFunction;
