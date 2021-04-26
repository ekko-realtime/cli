const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const FileUtil = require("../../util/fileUtil.js");

class ConfigCommand extends Command {
  async run() {
    const AWS_ACCESS_KEY_ID = await cli.prompt(
      "Please enter your AWS ACCESS KEY ID"
    );
    const AWS_SECRET_KEY = await cli.prompt("Please enter your AWS SECRET Key");
    const AWS_REGION = await cli.prompt("Please enter your AWS REGION");
    const CONTENT = `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\nAWS_SECRET_KEY=${AWS_SECRET_KEY}\nAWS_REGION=${AWS_REGION}`;

    FileUtil.saveAWSCredentials(CONTENT);
  }
}

ConfigCommand.description = `Configure ekko-cli with AWS credentials
...
Configures ekko-cli with AWS credentials
`;

module.exports = ConfigCommand;
