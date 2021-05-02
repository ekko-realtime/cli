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

UpdateCommand.description = `Update associations.json or an AWS lambda associated with the local ekko function
Update associations.json or an AWS lambda associated with the local ekko function
`;

module.exports = UpdateCommand;
