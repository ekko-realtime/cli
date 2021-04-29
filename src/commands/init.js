const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const {
  updateAWSCredentials,
  createBlankEkkoDirectory,
} = require("../util/fileUtil.js");
// const ekkoInit = require("../util/ekkoInit.js");
const ekkoDeploy = require("../util/ekkoDeploy.js");

class InitCommand extends Command {
  async run() {
    let response = await cli.prompt(
      "Do you want to deploy a new ekko infrastructure (y/n)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      ekkoDeploy();
    } else if (response === "n") {
      await updateAWSCredentials();
      createBlankEkkoDirectory();
    }
  }
}

InitCommand.description = `Initialize ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To deploy a new ekko infratructure enter 'y'. 
...
Initializes ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To deploy a new ekko infratructure enter 'y'.
`;

module.exports = InitCommand;
