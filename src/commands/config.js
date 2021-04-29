const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { updateAWSCredentials } = require("../util/fileUtil.js");

class ConfigCommand extends Command {
  async run() {
    updateAWSCredentials();
  }
}

ConfigCommand.description = `Update ekko-cli to use new AWS credentials
...
Updates ekko-cli to use new AWS credentials
`;

module.exports = ConfigCommand;
