const { Command, flags } = require("@oclif/command");
const EkkoConfig = require("../util/ekkoConfig.js");

class ConfigCommand extends Command {
  async run() {
    EkkoConfig.updateAWSCredentials();
  }
}

ConfigCommand.description = `Update ekko-cli to use new AWS credentials
...
If you change or receive new AWS credentials, or if you want to deploy the infrastructure or functions to a different AWS region, you can run this command to input the updated values.

You will need:

- your AWS access key
- your AWS secret key
- your AWS region
`;

module.exports = ConfigCommand;
