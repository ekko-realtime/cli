const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { updateAWSCredentials } = require("../util/fileUtil.js");

class ConfigCommand extends Command {
  async run() {
    updateAWSCredentials();
  }
}

ConfigCommand.description = `Configure ekko-cli with AWS credentials
...
Configures ekko-cli with AWS credentials
`;

module.exports = ConfigCommand;
