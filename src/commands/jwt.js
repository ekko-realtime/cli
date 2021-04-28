const { Command } = require("@oclif/command");
const { generateJWT, verifyJWT } = require("../util/generateJWT");

class CreateCommand extends Command {
  static args = [
    {
      name: "appName",
      required: true,
      description:
        "Name of ekko realtime application that you would like to create JWTs for",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(CreateCommand);
    generateJWT(args.appName);
    verifyJWT(args.appName);
  }
}

CreateCommand.description = `Generate JsonWebTokens for an ekko realtime application
Generate JsonWebTokens for an ekko realtime application
`;

module.exports = CreateCommand;
