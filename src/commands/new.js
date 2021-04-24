const { Command } = require("@oclif/command");
const FileUtil = require("../../util/fileUtil.js");

class NewCommand extends Command {
  async run() {
    // create ekko_functions directory
    // create sample function in ./ekko_functions
    // create associations.json in ./ekko_functions
    if (FileUtil.duplicatePath("./ekko_functions")) {
      this.log("This directory already contains an ekko_functions directory!");
    } else {
      FileUtil.createEkkoFunctionsDirectory();
      this.log("ekko_functions directory created!");
    }
    // this.log("creating new ekko_functions directory");
  }
}

NewCommand.description = `Creates a an ekko_functions directory.
Creates a an ekko_functions directory.
`;

module.exports = NewCommand;
