const childProcess = require("child_process");

const zipFile = (filename) => {
  const path = process.cwd() + "/" + filename + ".js";

  try {
    console.log(`Zipping ${filename}`);
    childProcess.execSync(`zip ${filename}.zip ${path}`);
    console.log(`${filename} Zipped`);
  } catch (error) {
    console.error(`Error zipping file ${filename}`, error.message);
  }
};

module.exports = zipFile;
