const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const { Command } = require("@oclif/command");
const { createFunction } = require("../util/fileUtil");
const { get } = require("../util/cdkOutputs");

const spinners = require("../util/spinner");

class SpinCommand extends Command {
  async run() {
    // spinners();

    get();
  }
}

SpinCommand.description = `Create a local ekko function
Creates a local ekko function
`;

module.exports = SpinCommand;
