const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const teardown = require("../util/ekkoTeardown.js");

class TeardownCommand extends Command {
  async run() {
    let response = await cli.prompt(
      "Are you sure you want to tear down your ekko infrastructure on AWS? (y/n)"
    );

    response = response.toLowerCase();

    if (response === "y") {
      teardown();
    } else if (response === "n") {
      console.log("Teardown aborted");
    }
  }
}

TeardownCommand.description = `Tear down your ekko infrastructure on AWS
...
Tears down your ekko infrastructure on AWS
`;

module.exports = TeardownCommand;
