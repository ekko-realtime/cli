const { Command, flags } = require("@oclif/command");
const EkkoConfig = require("../util/ekkoConfig.js");

class ConfigCommand extends Command {
  async run() {
    EkkoConfig.updateAWSCredentials();
  }
}

ConfigCommand.description = `Update ekko-cli to use new AWS credentials
...
Updates ekko-cli to use new AWS credentials
`;

module.exports = ConfigCommand;
