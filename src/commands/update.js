const { Command } = require("@oclif/command");
const updateAssociations = require("../util/updateAssociations.js");
const EkkoFunction = require("../util/ekkoFunction.js");

class UpdateCommand extends Command {
  static args = [
    {
      name: "fileName",
      required: true,
      description:
        "associations.json or the name of the ekko function that you would like to update.",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(UpdateCommand);

    if (args.fileName === "associations.json") {
      updateAssociations();
    } else {
      EkkoFunction.update(args.fileName);
    }
  }
}

UpdateCommand.description = `Update associations.json or a deployed AWS Lambda function
...
This command takes a required argument, either 'associations.json' or the name of a function that has already been deployed to AWS Lambda.

If the argument passed in is 'associations.json', this command will upload an updated version of the file to S3, and will update the server to propagate the new association rules.

If the argument passed in is a valid deployed AWS Lambda function, this command will update that Lambda with any changes that have been made in the directory of the ekko function.
`;

module.exports = UpdateCommand;
