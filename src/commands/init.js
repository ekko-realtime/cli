const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const {
  updateAWSCredentials,
  createBlankEkkoDirectory,
} = require("../util/fileUtil.js");
const EkkoInit = require("../util/ekkoInit.js");

class InitCommand extends Command {
  async run() {
    console.log(
      "This command will create a new ekko directory in your current working directory."
    );
    console.log("");
    let response = await cli.prompt(
      "Do you want to deploy a new ekko infrastructure (y/n)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      EkkoInit.newDeployment();
    } else if (response === "n") {
      EkkoInit.existingDeployment();
    }

    console.log("");
    console.log(
      "you can now create, deploy, update, and destroy ekko functions from within the newly created ekko_functions directory"
    );
    console.log("");
  }
}

InitCommand.description = `Initialize ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To deploy a new ekko infratructure enter 'y'. 
...
Initializes ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To deploy a new ekko infratructure enter 'y'.
`;

module.exports = InitCommand;
