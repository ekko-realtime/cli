const { duplicatePath, createFile } = require("./fileUtil");
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });

const content =
  "exports.handler = async (event) => {\nconst response = {\nstatusCode: 200,\nbody: JSON.stringify('Hello from ekko generated Lambda!'),\n};\nreturn response;\n};";

const createFunction = (functionName) => {
  spinner.start();
  const path = functionName + ".js";

  if (duplicatePath(path)) {
    spinner.fail(
      `${args.functionName} already exists. Please specify a new name.`
    );
  } else {
    createFile(path, content);
    spinner.succeed(`Created ekko function '${path}'`);
  }
};

module.exports = createFunction;
