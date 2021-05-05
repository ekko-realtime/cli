const { Command } = require("@oclif/command");
const EkkoFunction = require("../util/ekkoFunction.js");

class StatusCommand extends Command {
  async run() {
    await EkkoFunction.listFunctionsStatus();
  }
}

StatusCommand.description = `List your ekko functions and their deployment status
...
Lists the function folders that exist in your ekko_functions directory. If a function has been deployed to AWS Lambda using the ekko-cli, it is listed as (deployed). 

Please note:

- A function listed as (deployed) is not necesarily syncronized with its AWS Lambda version.
- It is the responsiblity of the developer to update Lambdas by running the update command when they make changes to a local ekko function.
`;

module.exports = StatusCommand;
