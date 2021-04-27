const { Command } = require("@oclif/command");
const { createFunction } = require("../../util/fileUtil");

class CreateCommand extends Command {
  static args = [
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

CreateCommand.description = `Create a local ekko function
Creates a local ekko function
`;

module.exports = CreateCommand;
