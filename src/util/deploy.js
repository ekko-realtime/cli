const DEPLOY_REPO = "https://github.com/ekko-live/deploy.git";
const childProcess = require("child_process");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const cloneRepo = () => {};

module.exports = { cloneRepo };
