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

NewCommand.description = `Create an ekko_functions directory containing associations.json
Creates an ekko_functions directory containing associations.json
`;

module.exports = NewCommand;
