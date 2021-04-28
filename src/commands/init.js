const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const {
  updateAWSCredentials,
  createBlankEkkoDirectory,
} = require("../util/fileUtil.js");
const ekkoInit = require("../util/ekkoInit.js");

class InitCommand extends Command {
  async run() {
    let response = await cli.prompt(
      "Do you want to initialize ekko for a brand new ekko service (newly deployed infrastructure with no existing apps or functions)(y/n)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      updateAWSCredentials();
      ekkoInit();
    } else if (response === "n") {
      updateAWSCredentials();
      createBlankEkkoDirectory();
    }
  }
}

InitCommand.description = `Initialize a new ekko project or join an existing one 
...
Initializes a new ekko project or join an existing one
`;

module.exports = InitCommand;
