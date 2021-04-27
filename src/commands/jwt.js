const { Command } = require("@oclif/command");
const { generateJWT, verifyJWT } = require("../../util/generateJWT");

class CreateCommand extends Command {
  static args = [
    {
      name: "appName",
      required: true,
      description: "Name of new ekko realtime application",
      hidden: false,
      default: "myEkkoApp",
    },
  ];
  async run() {
    const { args } = this.parse(CreateCommand);
    generateJWT(args.appName);
    verifyJWT(args.appName);
  }
}

CreateCommand.description = `Generate JSON Web Tokens for new ekko realtime application
Generate JSON Web Tokens for new ekko realtime application
`;

module.exports = CreateCommand;
