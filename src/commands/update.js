const { Command } = require("@oclif/command");
const updateFunction = require("../util/updateFunction.js");
const { updateAssociations } = require("../util/s3.js");
const { listObjects } = require("../util/s3.js");
const { listBuckets } = require("../util/s3.js");
const { getAssociations } = require("../util/s3.js");

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
      // console.log("updating associations.json");
      // updateAssociations();
      // listObjects();
      // listBuckets();
      getAssociations();
    } else {
      updateFunction(args.fileName);
    }
  }
}

UpdateCommand.description = `Update associations.json or an AWS lambda associated with the local ekko function
Update associations.json or an AWS lambda associated with the local ekko function
`;

module.exports = UpdateCommand;
