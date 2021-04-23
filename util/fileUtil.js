const fs = require("fs");

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

// const readFile = (path) => {
//   fs.readFile(path, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });
// };

module.exports = { duplicatePath, createFile };
