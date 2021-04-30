const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const { updateAWSCredentials } = require("../util/fileUtil.js");
const EkkoFunction = require("../util/ekkoFunction.js");
// const zipFile = require("../util/test.js");

class TestCommand extends Command {
  async run() {
    // await EkkoFunction.listFunctionsStatus();
    console.log("hello");
  }
}

TestCommand.description = `Tesing purposes
...
Testing purposes
`;

module.exports = TestCommand;
