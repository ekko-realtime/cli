const { Command } = require("@oclif/command");
const destroyFunction = require("../../util/destroyFunction.js");

class DestroyCommand extends Command {
  static args = [
    {
      name: "function", // name of arg to show in help and reference with args[name]
      required: true, // make the arg required with `required: true`
      description:
        "Delete an ekko function and tear down the associated Lambda.", // help description
      hidden: false, // hide this arg from help
      // parse: (input) => "output", // instead of the user input, return a different value
      // default: "world", // default value if no arg input
      // options: ["a", "b"], // only allow input to be from a discrete set
    },
    {
      name: "functionName",
      required: true,
      description: "Name of the ekko function that you would like to destroy.",
      hidden: false,
      // default: "myEkkoFunction",
    },
  ];
  async run() {
    const { args } = this.parse(DestroyCommand);

    destroyFunction(args.functionName);
    // console.log(`Deleting ${args.functionName} and tearing down Lambda.`);
  }
}

DestroyCommand.description = `Delete an ekko function and tear down the associated Lambda.
Delete an ekko function and tear down the associated Lambda.
`;

module.exports = DestroyCommand;
