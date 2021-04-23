const { Command } = require("@oclif/command");
const deployFunction = require("../../util/deployLambda.js");
class DeployCommand extends Command {
  static args = [
    {
      name: "function", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "Deploy function.", // help description
      hidden: false, // hide this arg from help
      // parse: (input) => "output", // instead of the user input, return a different value
      // default: "world", // default value if no arg input
      // options: ["a", "b"], // only allow input to be from a discrete set
    },
    {
      name: "functionName",
      required: false,
      description: "Name of Function you would like to deploy.",
      hidden: false,
      // default: "myEkkoFunction",
    },
  ];

  async run() {
    const { args } = this.parse(DeployCommand);

    if (args.function && args.functionName) {
      deployFunction(args.functionName);
    }
  }
}

DeployCommand.description = `Deploys an ekko function to AWS Lambda.
...
Deploys an ekko function to AWS Lambda.
`;

// DeployCommand.flags = {
//   name: flags.string({char: 'n', description: 'name to print'}),
// }

module.exports = DeployCommand;
