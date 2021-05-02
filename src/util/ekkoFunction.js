const zipFile = require("./zipFile");
const fs = require("fs");
const lambda = require("./lambda");
const process = require("process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const LAMBDA_ROLE_ARN = process.env.LAMBDA_ROLE_ARN;
const FUNCTION_TEMPLATE = `exports.handler = async (message) => {
  // Implement ekko function
  return message;
};`;

const create = (functionName) => {
  spinner.start("Creating function...");
  fs.mkdirSync(`./${functionName}`, (err) => {
    if (err) {
      spinner.fail();
      return console.error(err);
    }
  });
  process.chdir(functionName);

  fs.writeFileSync("index.js", FUNCTION_TEMPLATE, (err) => {
    if (err) throw err;
  });

  spinner.succeed(`Ekko function ${functionName} successfully created:`);
  console.log(process.cwd());
};

const deploy = async (fileName) => {
  if (validDirectory) {
    zipFile(fileName);
    const zipContents = fs.readFileSync(`${fileName}.zip`);
    spinner.start(`Deploying ${fileName}...`);
    const params = {
      Code: {
        ZipFile: zipContents,
      },
      FunctionName: fileName,
      Handler: `${fileName}.handler`,
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
      spinner.fail(
        `There was a problem deploying ${fileName}: ${error.message}`
      );
    }

    deleteLocalFile(fileName + ".zip");
  } else {
    spinner.fail("Command can't be run outside of ekko_functions directory.");
  }
};

const destroy = async (functionName) => {
  if (validDirectory) {
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
  } else {
    spinner.fail("Command can't be run outside of ekko_functions directory.");
  }
};

const update = async (functionName) => {
  if (validDirectory) {
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
  } else {
    spinner.fail("Command can't be run outside of ekko_functions directory.");
  }
};

const getLambdas = async () => {
  var params = {};

  return lambda
    .listFunctions(params, (err, data) => {
      if (err) console.log(err, err.stack);
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
    (file) =>
      !file.match(/.json/) &&
      !file.match(/.DS_Store/) &&
      !file.match(/.ekko_functions/)
  );
};

const listFunctionsStatus = async () => {
  if (validDirectory()) {
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
  } else {
    spinner.fail("Command can't be run outside of ekko_functions directory.");
  }
};

const validDirectory = () => {
  let files = getFiles();
  return files.includes(".ekko_functions.txt");
};

const deleteLocalDirectory = (name) => {
  fs.rmdir(
    name,
    {
      recursive: true,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        spinner.succeed(`Local ekko function '${name}' successfully deleted`);
      }
    }
  );
};

const deleteLocalFile = (fileName) => {
  fs.unlink(fileName, (err) => {
    if (err)
      spinner.fail(`Error deleting ${fileName} from ekko_functions:`, err);
    else {
      if (fileName.includes(".js")) {
        spinner.succeed`Successfully deleted ${fileName} from ekko_functions.`();
      }
    }
  });
};

const getFiles = () => {
  let files = fs.readdirSync(".");
  return files;
};

module.exports = {
  create,
  deploy,
  destroy,
  update,
  getEkkoLambdas,
  getEkkoFunctions,
  listFunctionsStatus,
};
