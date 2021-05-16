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
...
Pass in the name of the function you want to create as an argument to this command. It will create:

- a folder in the ekko_functions directory and
- a skeleton JavaScript template file (inside the folder it creates) that you can use to get started writing your Lambda function code
`;

module.exports = CreateCommand;
