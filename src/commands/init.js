const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const process = require("process");
const {
  updateAWSCredentials,
  createBlankEkkoDirectory,
} = require("../../util/fileUtil.js");
const deployFunction = require("../../util/deployFunction.js");
const ekkoInit = require("../../util/ekkoInit.js");

class InitCommand extends Command {
  async run() {
    let response = await cli.prompt(
      "Do you want to initialize ekko for a brand new ekko service (newly deployed infrastructure with no existing apps or functions)(y/n)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      // updateAWSCredentials(CONTENT);
      ekkoInit();
    } else if (response === "n") {
      // updateAWSCredentials(CONTENT);
      createBlankEkkoDirectory();
    }
    // const AWS_ACCESS_KEY_ID = await cli.prompt(
    //   "Please enter your AWS ACCESS KEY ID"
    // );
    // const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
    // const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
    // const CONTENT = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}`;

    // FileUtil.saveAWSCredentials(CONTENT);

    // FileUtil.createEkkoFunctionsDirectory();
    // process.chdir("./ekko_functions");
    // deployFunction("sampleEkkoFunction");
  }
}

InitCommand.description = `Create ekko_functions directory, associations.json, and sampleEkkoFunction that gets deployed to AWS Lambda with your AWS credentials 
...
Creates ekko_functions directory, associations.json, and sampleEkkoFunction that gets deployed to AWS Lambda with your AWS credentials
`;

module.exports = InitCommand;
