const { Command } = require("@oclif/command");
const ekkoDeploy = require("../util/ekkoDeploy.js");
const Deploy = require("../util/deploy.js");
const DEPLOY_REPO = "https://github.com/ekko-live/deploy.git";
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const {
  createEkkoGlobalDirectory,
  updateAWSCredentials,
  EKKO_GLOBAL_DIRECTORY,
} = require("../util/fileUtil.js");

class TempCommand extends Command {
  async run() {
    ekkoDeploy();
  }
}

TempCommand.description = `Deploy ekko
...
Deploys ekko
`;

module.exports = TempCommand;
