const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction.js");
class DeployCommand extends Command {
  static args = [
    {
      name: "functionName",
      required: true,
      description: "Name of Function you would like to deploy.",
      hidden: false,
    },
  ];

  async run() {
    const { args } = this.parse(DeployCommand);
    EkkoFunction.deploy(args.functionName);
  }
}

DeployCommand.description = `Deploy an ekko function to AWS Lambda
...
Pass in the name of a folder where your lambda function code is stored. 
(This should be inside an 'ekko_functions' folder; one is created for you by default when you run 'ekko init' and deploy infrastructure).

This command will compress the contents of the folder and upload them to AWS Lambda. 
To use the deployed lambda in your realtime app, add it to one or more channels in associations.json. 
`;

module.exports = DeployCommand;
