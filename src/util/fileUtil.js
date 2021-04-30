const fs = require("fs");
const os = require("os");
const { cli } = require("cli-ux");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

const FUNCTION_TEMPLATE = `exports.handler = async (message) => {
  // Implement ekko function
  return message;
};`;

const duplicatePath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

const getFiles = () => {
  let files = fs.readdirSync(".");
  return files;
};

const createEkkoGlobalDirectory = () => {
  spinner.start("Creating ekko global directory...");
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      spinner.succeed("Ekko global directory created");
    } catch (err) {
      throw err;
    }
  } else {
    spinner.succeed("~/.ekko already exists");
  }
};

const provideAWSCredentials = async () => {
  createEkkoGlobalDirectory();
  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID"
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\n`;

  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, ENV_VARIABLES);
    spinner.succeed("Credentials saved to ekko environment");
  } catch (err) {
    console.error(err);
  }
};

const updateAWSCredentials = async () => {
  // create .ekko if it does not already exist
  createEkkoGlobalDirectory();

  // if secret, api endpoint, and s3 already exist in .env, do not update them
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

  const S3_BUCKET = process.env.S3_BUCKET
    ? process.env.S3_BUCKET
    : await cli.prompt(
        "Please enter the name of the S3 bucket where your organization's associations.json is stored"
      );

  const AWS_ACCESS_KEY_ID = await cli.prompt(
    "Please enter your AWS ACCESS KEY ID"
  );
  const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
  const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
  const ENV_VARIABLES = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}\nSECRET=${SECRET}\nAPI_ENDPOINT=${API_ENDPOINT}\nS3_BUCKET=${S3_BUCKET}\n`;

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

  spinner.succeed(
    `Ekko function ${functionName} successfully created in ${process.cwd()}`
  );
};

const createBlankEkkoDirectory = () => {
  spinner.start();
  if (duplicatePath("./ekko")) {
    spinner.fail("This directory already contains an ekko directory!");
  } else {
    fs.mkdirSync("./ekko", (err) => {
      if (err) {
        return console.error(err);
      }
    });
    fs.mkdirSync("./ekko/apps", (err) => {
      if (err) {
        return console.error(err);
      }
    });

    spinner.succeed("ekko directory created");
  }
};

const deleteLocalFile = (fileName) => {
  // console.log("FILE", fileName);
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
        console.log(`Local ekko function '${name}' successfully deleted`);
      }
    }
  );
};

module.exports = {
  duplicatePath,
  createFile,
  createBlankEkkoDirectory,
  deleteLocalFile,
  updateAWSCredentials,
  EKKO_ENVIRONMENT_PATH,
  createFunction,
  createEkkoGlobalDirectory,
  EKKO_GLOBAL_DIRECTORY,
  provideAWSCredentials,
  getFiles,
  deleteLocalDirectory,
};
