const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction.js");

class StatusCommand extends Command {
  async run() {
    await EkkoFunction.listFunctionsStatus();
  }
}

StatusCommand.description = `List your ekko functions and their deployment status
Lists your ekko functions and their deployment status
`;

module.exports = StatusCommand;
