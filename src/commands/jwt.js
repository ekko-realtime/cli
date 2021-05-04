const { Command } = require("@oclif/command");
const { generateJWT } = require("../util/generateJWT");

class JWTCommand extends Command {
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
    const { args } = this.parse(JWTCommand);
    generateJWT(args.appName);
  }
}

JWTCommand.description = `Generate JSON Web Tokens for an ekko application
...
Generate the JSON Web Tokens (JWTs) for your ekko application.

This command takes a required argument: the name of the app for which you want to generate JSON Web Tokens.

It will print the following:

- the API endpoint of your ekko infrastructure
  - your server and client code need this to connect to your ekko infrastructure
  - this is the same value that init outputs for a new deployment and is the same value for all applications
- user JWT to be used in your client side code
- admin JWT to be used in your server side code
`;

module.exports = JWTCommand;
