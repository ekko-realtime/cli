const { Command } = require("@oclif/command");
const deployFunction = require("../util/deployFunction.js");
class DeployCommand extends Command {
  static args = [
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
    deployFunction(args.functionName);
  }
}

DeployCommand.description = `Deploy an ekko function to AWS Lambda
...
Deploys an ekko function to AWS Lambda
`;

module.exports = DeployCommand;
