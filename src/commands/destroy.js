const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction.js");

class DestroyCommand extends Command {
  static args = [
    {
      name: "functionName",
      required: true,
      description: "Name of the AWS Lambda that you would like to tear down",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(DestroyCommand);
    EkkoFunction.destroy(args.functionName);
  }
}

DestroyCommand.description = `Tear down a deployed AWS Lambda
...
Tears down a deployed AWS Lambda.

Pass in the name of the Ekko function and this command will tear down its associated AWS Lambda.
`;

module.exports = DestroyCommand;
