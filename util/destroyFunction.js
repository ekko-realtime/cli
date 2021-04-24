const lambda = require("./lambda");

const destroyFunction = async (functionName) => {
  const params = {
    FunctionName: functionName,
  };

  try {
    console.log(`Tearing down Lambda ${functionName}`);
    await lambda.deleteFunction(params).promise();
    console.log(`Lamda ${functionName} destroyed!`);
  } catch (error) {
    console.log(`Error tearing down Lambda ${functionName}`, error);
  }
};

module.exports = destroyFunction;
