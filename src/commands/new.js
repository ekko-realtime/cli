const { Command } = require("@oclif/command");
const { createEkkoFunctionsDirectory } = require("../../util/fileUtil");

class NewCommand extends Command {
  async run() {
    createEkkoFunctionsDirectory();
  }
}

NewCommand.description = `Create an ekko_functions directory containing associations.json
Creates an ekko_functions directory containing associations.json
`;

module.exports = NewCommand;
