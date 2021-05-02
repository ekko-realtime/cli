const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction");

class CreateCommand extends Command {
  static args = [
    {
      name: "functionName",
      required: true,
      description: "Name of new ekko function.",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(CreateCommand);
    EkkoFunction.create(args.functionName);
  }
}

CreateCommand.description = `Create a local ekko function
Creates a local ekko function
`;

module.exports = CreateCommand;
