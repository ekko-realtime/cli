const fs = require("fs");
const associations = require("./associationsTemplate.js");

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

const deleteLocalFile = (fileName) => {
  console.log(`Deleting ${fileName} from ekko_functions.`);
  fs.unlink(fileName + ".js", (err) => {
    if (err)
      console.log(`Error deleting ${filename} from ekko_functions:`, err);
    else {
      console.log(`Successfully deleted ${fileName} from ekko_functions.`);

      // Get the files in current diectory
      // after deletion
      // getFilesInDirectory();
    }
  });
};

// const getFilesInDirectory = () => {
//   console.log("\nFiles present in directory:");
//   let files = fs.readdirSync(__dirname);
//   files.forEach((file) => {
//     console.log(file);
//   });
// };

module.exports = {
  duplicatePath,
  createFile,
  createEkkoFunctionsDirectory,
  deleteLocalFile,
};
