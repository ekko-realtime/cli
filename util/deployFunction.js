const zipFile = require("./zipFile");
const fs = require("fs");
const getLambdaRole = require("./getLambdaRole");
const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const deployFunction = async (fileName) => {
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

module.exports = deployFunction;
