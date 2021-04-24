const lambda = require("./lambda");
const { deleteLocalFile } = require("./fileUtil");

const destroyFunction = async (functionName) => {
  const params = {
    FunctionName: functionName,
  };

  try {
    console.log(`Tearing down ${functionName} Lambda`);
    await lambda.deleteFunction(params).promise();
    console.log(`Lamda successfully destroyed!`);
    deleteLocalFile(functionName + ".js");
  } catch (error) {
    console.log(`Error tearing down Lambda ${functionName}`, error);
  }
};

module.exports = destroyFunction;
