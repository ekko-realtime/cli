const childProcess = require("child_process");

const zipFile = (filename) => {
  const path = process.cwd() + "/" + filename + ".js";

  console.log("PATH", path);

  try {
    // childProcess.execSync(`zip ${filename}.zip ./lambdas/${filename}.js`);
    childProcess.execSync(`zip ${filename}.zip ${path}`);
  } catch (error) {
    console.error(`Error zipping file ${filename}`, error);
  }
  console.log("zipped");
};

module.exports = {
  zipFile,
};
