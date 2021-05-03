const childProcess = require("child_process");
const repo = "https://github.com/ekko-live/ekko-init.git";

const doSomething = async () => {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });

  return myPromise;
};

module.exports = doSomething;
