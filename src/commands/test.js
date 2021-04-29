const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { updateAWSCredentials } = require("../util/fileUtil.js");

class TestCommand extends Command {
  async run() {
    console.log("testing");
  }
}

TestCommand.description = `Tesing purposes
...
Testing purposes
`;

module.exports = TestCommand;
