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
Removes all server and shared resources infrastructure from AWS and deletes your global ~/.ekko config directory.
This command does not delete you ekko project directory. 

It is recommended to remove your cloud infrastructure if you are not actively developing your application.
Remember that AWS charges you for the time your infrastructure is up and running.
`;

module.exports = TeardownCommand;
