const { Command } = require("@oclif/command");
const destroyFunction = require("../../util/destroyFunction.js");

class DestroyCommand extends Command {
  static args = [
    {
      name: "functionName",
      required: true,
      description: "Name of the ekko function that you would like to destroy",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(DestroyCommand);

    destroyFunction(args.functionName);
  }
}

DestroyCommand.description = `Delete an ekko function and tear down the associated Lambda
Deletes an ekko function and tears down the associated Lambda
`;

module.exports = DestroyCommand;
