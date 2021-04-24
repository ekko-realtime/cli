const fs = require("fs");
const associations = require("./associationsTemplate.js");
// const path = require("path");

const duplicatePath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

const createFile = (path, content) => {
  fs.writeFileSync(path, content, (err) => {
    console.log("File was written");
    if (err) throw err;
  });
};

const createEkkoFunctionsDirectory = () => {
  const functionTemplateContent =
    "exports.handler = async (event) => {\nconst response = {\nstatusCode: 200,\nbody: JSON.stringify('Hello from ekko generated Lambda!'),\n};\nreturn response;\n};";

  fs.mkdirSync("./ekko_functions", (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("ekko_functions directory created successfully!");
  });

  fs.writeFileSync(
    "./ekko_functions/ekkoFunctionTemplate.js",
    functionTemplateContent,
    (err) => {
      console.log("ekkoFunctionTemplate was written");
      if (err) throw err;
    }
  );

  fs.writeFileSync(
    "./ekko_functions/associations.json",
    associations,
    (err) => {
      console.log("associations.json was written");
      if (err) throw err;
    }
  );
};

module.exports = {
  duplicatePath,
  createFile,
  createEkkoFunctionsDirectory,
};
