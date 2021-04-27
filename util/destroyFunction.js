const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const destroyFunction = async (functionName) => {
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

module.exports = destroyFunction;
