const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const destroyFunction = async (functionName) => {
  spinner.start();
  const params = {
    FunctionName: functionName,
  };

  try {
    await lambda.deleteFunction(params).promise();
    spinner.succeed(`Lamda '${functionName}' successfully destroyed!`);
    deleteLocalFile(functionName + ".js");
  } catch (error) {
    spinner.fail(`Error tearing down Lambda ${functionName}: ${error}`);
  }
};

module.exports = destroyFunction;
