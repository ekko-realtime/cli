const { Command } = require("@oclif/command");
const ekkoDeploy = require("../util/ekkoDeploy.js");

class TempCommand extends Command {
  async run() {
    ekkoDeploy();
  }
}

TempCommand.description = `Deploy ekko
...
Deploys ekko
`;

module.exports = TempCommand;
