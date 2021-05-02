const { Command, flags } = require("@oclif/command");
const { cli } = require("cli-ux");
const EkkoFunction = require("../util/ekkoFunction.js");
const loadingBar = require("../util/loadingBar.js");
const doSomething = require("../util/doSomething.js");
const test = require("../util/test.js");
const childProcess = require("child_process");
const repo = "https://github.com/ekko-live/ekko-init.git";
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

// const zipFile = require("../util/test.js");

class TestCommand extends Command {
  async run() {
    // cli.action.start("starting a process");
    // cli.action.start("starting a process", "initializing", { stdout: true });
    spinner.start("Here");
    await doSomething();
    spinner.succeed("Success!");

    //   try {
    //     // spinner.succeed("Done!");
    //     // cli.action.stop(); // shows 'starting a process... done'
    //   } catch (error) {}
    //   // setTimeout(() => {}, 3000);
    //   // cli.action.stop(); // shows 'starting a process... done'
  }
}

TestCommand.description = `Tesing purposes
...
Testing purposes
`;

module.exports = TestCommand;
