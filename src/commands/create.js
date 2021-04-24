const { Command } = require("@oclif/command");
const createFunction = require("../../util/createFunction");

class CreateCommand extends Command {
  static args = [
    // {
    //   name: "function", // name of arg to show in help and reference with args[name]
    //   required: true, // make the arg required with `required: true`
    //   description: "Create a new ekko function.", // help description
    //   hidden: false, // hide this arg from help
    //   // parse: (input) => "output", // instead of the user input, return a different value
    //   // default: "world", // default value if no arg input
    //   // options: ["a", "b"], // only allow input to be from a discrete set
    // },
    {
      name: "functionName",
      required: true,
      description: "Name of new ekko function.",
      hidden: false,
      default: "myEkkoFunction",
    },
  ];
  async run() {
    const { args } = this.parse(CreateCommand);
    createFunction(args.functionName);
  }
}

CreateCommand.description = `Create a local ekko function.
Creates a local ekko function.
`;

module.exports = CreateCommand;
