const childProcess = require("child_process");
const repo = "https://github.com/ekko-live/ekko-init.git";

const doSomething = async () => {
  // console.log("HI");
  // childProcess.execSync(`git clone -q '${repo}' SMEKKO`);
  // console.log("hello");
  setTimeout(() => {
    // console.log("3 seconds");
  }, 3000);

  return "message";
};

module.exports = doSomething;
