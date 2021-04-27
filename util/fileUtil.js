const fs = require("fs");
const associations = require("./associationsTemplate.js");
const os = require("os");
const { cli } = require("cli-ux");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

const FUNCTION_TEMPLATE = `exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from ekko generated Lambda!"),
  };
  return response;
}`;

const duplicatePath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

const updateAWSCredentials = async () => {
  // create .ekko if it does not already exist
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      console.log("Ekko global directory created");
    } catch (err) {
      throw err;
    }
  }

  // if secret and api endpoint already exist in .env, do not update them
  const SECRET = process.env.SECRET
    ? process.env.SECRET
    : await cli.prompt(
        "Please enter the JWT secret for your organization's deployed ekko infrastructure"
      );
  const API_ENDPOINT = process.env.API_ENDPOINT
    ? process.env.API_ENDPOINT
    : await cli.prompt(
        "Please enter the API Key for your organization's deployed ekko infrastructure"
      );

  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID"
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\nSECRET=${SECRET}\nAPI_ENDPOINT=${API_ENDPOINT}\n`;

  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
    spinner.succeed("Credentials saved to ekko environment");
  } catch (err) {
    console.error(err);
  }
};

const createFile = (path, content) => {
  fs.writeFileSync(path, content, (err) => {
    if (err) throw err;
  });
};

const createFunction = (functionName) => {
  spinner.start();
  const PATH = functionName + ".js";

  if (duplicatePath(PATH)) {
    spinner.fail(`${functionName} already exists. Please specify a new name.`);
  } else {
    createFile(PATH, FUNCTION_TEMPLATE);
    spinner.succeed(`Created ekko function '${functionName}'`);
  }
};

const createEkkoFunctionsDirectory = () => {
  spinner.start();
  if (duplicatePath("./ekko_functions")) {
    spinner.fail(
      "This directory already contains an ekko_functions directory!"
    );
  } else {
    fs.mkdirSync("./ekko_functions", (err) => {
      if (err) {
        return console.error(err);
      }
    });
    spinner.succeed("ekko_functions directory created");

    fs.writeFileSync(
      "./ekko_functions/sampleEkkoFunction.js",
      FUNCTION_TEMPLATE,
      (err) => {
        if (err) throw err;
      }
    );
    spinner.succeed("sampleEkkoFunction.js added to ekko_functions");

    fs.writeFileSync(
      "./ekko_functions/associations.json",
      associations,
      (err) => {
        if (err) throw err;
      }
    );
    spinner.succeed("associations.json added to ekko_functions");
  }
};

const deleteLocalFile = (fileName) => {
  fs.unlink(fileName, (err) => {
    if (err)
      spinner.fail(`Error deleting ${filename} from ekko_functions:`, err);
    else {
      if (fileName.includes(".js")) {
        spinner.succeed(
          `Successfully deleted ${fileName} from ekko_functions.`
        );
      }
      // Get the files in current diectory
      // after deletion
      // getFilesInDirectory();
    }
  });
};

// const getFilesInDirectory = () => {
//   console.log("\nFiles present in directory:");
//   let files = fs.readdirSync(__dirname);
//   files.forEach((file) => {
//     console.log(file);
//   });
// };

module.exports = {
  duplicatePath,
  createFile,
  createEkkoFunctionsDirectory,
  deleteLocalFile,
  updateAWSCredentials,
  EKKO_ENVIRONMENT_PATH,
  createFunction,
};
