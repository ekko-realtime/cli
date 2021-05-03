const zipFile = require("./zipFile");
const fs = require("fs");
const lambda = require("./lambda");
const {
  deleteLocalFile,
  getFiles,
  deleteLocalDirectory,
} = require("./fileUtil");
const process = require("process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const LAMBDA_ROLE_ARN = process.env.LAMBDA_ROLE_ARN;

const deploy = async (fileName) => {
  zipFile(fileName);
  const zipContents = fs.readFileSync(`${fileName}.zip`);
  spinner.start(`Deploying ${fileName}...`);
  const params = {
    Code: {
      ZipFile: zipContents,
    },
    FunctionName: fileName,
    Handler: `${fileName}/index.handler`,
    Role: LAMBDA_ROLE_ARN,
    Runtime: "nodejs14.x",
    Tags: { service: "ekko" },
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
  } catch (error) {
    spinner.fail(`Error tearing down Lambda ${functionName}: ${error}`);
  }

  deleteLocalDirectory(functionName);
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

const getLambdas = async () => {
  var params = {
    // FunctionVersion: ALL,
    // Marker: 'STRING_VALUE',
    // // MasterRegion: 'STRING_VALUE',
    // // MaxItems: 'NUMBER_VALUE'
  };

  return lambda
    .listFunctions(params, (err, data) => {
      if (err) console.log(err, err.stack);
      // an error occurred
      // else console.log(data.Functions); // successful response
      return data.Functions;
    })
    .promise();
};

const getEkkoLambdas = async () => {
  const lambdas = await getLambdas();
  const ekkoLambdas = lambdas.Functions.filter((lambda) =>
    lambda.Role.includes("ekko-server")
  );

  return ekkoLambdas.map((lambda) => lambda.FunctionName);
};

const getEkkoFunctions = () => {
  const files = getFiles();
  return files.filter(
    (file) => !file.match(/.json/) && !file.match(/.DS_Store/)
  );

  // console.log("Ekko Functions:");
  // functions.forEach((func) => console.log(func));
};

const listFunctionsStatus = async () => {
  spinner.start("Getting the status of your ekko functions...");
  const lambdas = await getEkkoLambdas();
  let functions = getEkkoFunctions();

  functions = functions.map((func) => {
    if (lambdas.includes(func)) {
      return func + " (deployed)";
    } else {
      return func;
    }
  });

  functions.sort();

  spinner.stop();
  console.log("Ekko Functions:");
  functions.forEach((func) => console.log(func));
};

module.exports = {
  deploy,
  destroy,
  update,
  getEkkoLambdas,
  getEkkoFunctions,
  listFunctionsStatus,
};

/*

*/
