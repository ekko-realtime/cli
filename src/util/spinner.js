const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const spinners = () => {
  spinner.start("Spinning");
  setTimeout(() => {
    spinner.succeed("success!");
    spinner.start("Spinning");
    setTimeout(() => {
      spinner.succeed("success!");
    }, 3000);
  }, 3000);
};

module.exports = spinners;
