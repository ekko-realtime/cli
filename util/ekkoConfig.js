const os = require("os");
const fs = require("fs");

const globalDirectory = os.homedir() + "/.ekko";
// const AWS_CREDENTIALS = globalDirectory + "/config.json";

const createGlobalDirectory = () => {
  if (!fs.existsSync(globalDirectory)) {
    fs.mkdirSync(globalDirectory);
  }
};

module.exports = { globalDirectory, createGlobalDirectory };
