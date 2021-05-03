const tap = require("tap");
const fs = require("fs");
const EkkoFunction = require("../src/util/ekkoFunction.js");

tap.beforeEach(() => {
  fs.writeFile(".ekko_functions.txt", "", function (err) {
    if (err) throw err;
    // console.log('File is created successfully.');
  });
  EkkoFunction.create("tapTestFunction");
});
tap.afterEach(() => {
  EkkoFunction.deleteLocalDirectory("tapTestFunction");
  fs.unlink(".ekko_functions.txt", (err) => {
    if (err) {
      console.error(err);
    }
  });
});

tap.test("function is created", (t) => {
  t.ok(fs.existsSync("index.js"));
  process.chdir("..");
  t.ok(fs.existsSync("tapTestFunction"));
  t.end();
});

// tap.test("function is deployed", (t) => {
//   process.chdir("..");
//   EkkoFunction.deploy("tapTestFunction");
//   t.end();
// });

/*
create temp dir
create a function directory in current directory
verify that it can only be created in ekko functions
deploy to lambda
check that status is function name (deployed)
destroy function
check that it no longer exists
teardown temp dir
*/
