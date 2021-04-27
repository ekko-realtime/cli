const fs = require("fs");
const associations = require("./associationsTemplate.js");
const os = require("os");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";

const duplicatePath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

const saveAWSCredentials = (credentials) => {
  // create .ekko if it does not already exist
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      console.log("Ekko global directory created");
    } catch (err) {
      throw err;
    }
  }

  // append credentials to .ekko/.env
  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, credentials, { flag: "a+" });
    spinner.succeed("AWS credentials saved to ekko environment");
  } catch (err) {
    console.error(err);
  }
};

const createFile = (path, content) => {
  fs.writeFileSync(path, content, (err) => {
    if (err) throw err;
  });
};

const createEkkoFunctionsDirectory = () => {
  spinner.start();
  if (duplicatePath("./ekko_functions")) {
    spinner.fail(
      "This directory already contains an ekko_functions directory!"
    );
  } else {
    const functionTemplateContent =
      "exports.handler = async (event) => {\nconst response = {\nstatusCode: 200,\nbody: JSON.stringify('Hello from ekko generated Lambda!'),\n};\nreturn response;\n};";

    fs.mkdirSync("./ekko_functions", (err) => {
      if (err) {
        return console.error(err);
      }
    });
    spinner.succeed("Ekko_functions directory created");

    fs.writeFileSync(
      "./ekko_functions/ekkoFunctionTemplate.js",
      functionTemplateContent,
      (err) => {
        if (err) throw err;
      }
    );
    spinner.succeed("ekkoFunctionTemplate.js added to ekko_functions");

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
  saveAWSCredentials,
  EKKO_ENVIRONMENT_PATH,
};
