const zipFile = require("./zipFile");
const fs = require("fs");
const getLambdaRole = require("./getLambdaRole");
const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const deploy = async (fileName) => {
  zipFile(fileName);
  const zipContents = fs.readFileSync(`${fileName}.zip`);
  spinner.start(`Deploying ${fileName}...`);
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
    await lambda.createFunction(params).promise();
    spinner.succeed(
      `Ekko function '${fileName}' successfully deployed to AWS Lambda`
    );
  } catch (error) {
    spinner.fail(`There was a problem deploying ${fileName}: ${error.message}`);
  }

  deleteLocalFile(fileName + ".zip");
};

const destroy = async (functionName) => {
  spinner.start(`Destroying ${functionName}...`);
  const params = {
    FunctionName: functionName,
  };

  try {
    await lambda.deleteFunction(params).promise();
    spinner.succeed(`Lambda '${functionName}' successfully destroyed!`);
    deleteLocalFile(functionName + ".js");
  } catch (error) {
    spinner.fail(`Error tearing down Lambda ${functionName}: ${error}`);
  }
};

const update = async (functionName) => {
  spinner.start(`Updating ${functionName}...`);
  zipFile(functionName);
  const zipContents = fs.readFileSync(`${functionName}.zip`);

  const params = {
    FunctionName: functionName,
    ZipFile: zipContents,
  };

  try {
    const response = await lambda.updateFunctionCode(params).promise();
    spinner.succeed(`'${functionName}' Lamda successfully updated!`);
  } catch (error) {
    spinner.fail(`Error updating Lambda ${functionName}: ${error.message}`);
  }

  deleteLocalFile(functionName + ".zip");
};

module.exports = { deploy, destroy, update };
