const { Command } = require("@oclif/command");
const { createEkkoFunctionsDirectory } = require("../../util/fileUtil");

class NewCommand extends Command {
  async run() {
    // create ekko_functions directory
    // create sample function in ./ekko_functions
    // create associations.json in ./ekko_functions
    createEkkoFunctionsDirectory();

    // this.log("creating new ekko_functions directory");
  }
}

NewCommand.description = `Create a an ekko_functions directory
Creates a an ekko_functions directory
`;

module.exports = NewCommand;
