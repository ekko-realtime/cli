const loadingBar = require("../util/loadingBar.js");
const doSomething = require("../util/doSomething.js");
const childProcess = require("child_process");
const repo = "https://github.com/ekko-live/ekko-init.git";
const { cli } = require("cli-ux");

const test = async () => {
  // let message = loadingBar("Starting something");
  // await doSomething();
  // clearInterval(message);
  // try {
  // } catch (error) {}
  // cli.action.start("starting a process");
  // await doSomething();
  // // setTimeout(() => {}, 3000);
  // cli.action.stop(); // shows 'starting a process... done'
};

module.exports = test;
