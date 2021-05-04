const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction.js");

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
    EkkoFunction.destroy(args.functionName);
  }
}

DestroyCommand.description = `Delete an ekko function locally and from AWS Lambda
...
Deletes an ekko function folder and tears down the associated AWS Lambda

Pass in the name of the function and this command will:

- remove the function from AWS Lambda
- delete the (local) directory where that function's code was stored
`;

module.exports = DestroyCommand;
