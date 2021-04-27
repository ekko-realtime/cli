const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const process = require("process");
const FileUtil = require("../../util/fileUtil.js");
const deployFunction = require("../../util/deployFunction.js");

class InitCommand extends Command {
  async run() {
    let response = await cli.promt(
      "Do you want to initialize ekko for a brand new ekko service (newly deployed infrastructure with no existing apps or functions)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      console.log("new init");
    } else if (response === "n") {
      console.log("old init");
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
