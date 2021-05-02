const startLoadingBar = (message) => {
  process.stdout.write(`\n${message}`);
  return setInterval(() => {
    process.stdout.write(".");
  }, 30);
};

module.exports = startLoadingBar;
