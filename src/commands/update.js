const { Command } = require("@oclif/command");
const updateFunction = require("../../util/updateFunction.js");

class UpdateCommand extends Command {
  static args = [
    {
      name: "functionName",
      required: true,
      description: "Name of the ekko function that you would like to update.",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(UpdateCommand);

    updateFunction(args.functionName);
  }
}

UpdateCommand.description = `Update an AWS lambda associated with the local ekko function
Update the AWS lambda associated with the local ekko function
`;

module.exports = UpdateCommand;
