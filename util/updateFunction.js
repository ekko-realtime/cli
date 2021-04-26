const lambda = require("./lambda");
const zipFile = require("./zipFile");
const fs = require("fs");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const { deleteLocalFile } = require("./fileUtil");

const updateFunction = async (functionName) => {
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

module.exports = updateFunction;
