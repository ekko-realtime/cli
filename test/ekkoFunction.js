const { test } = require("tap");
const fs = require("fs");
const EkkoFunction = require("../src/util/ekkoFunction.js");

test("function is created", async (t) => {
  fs.writeFile(".ekko_functions.txt", "", function (err) {
    if (err) throw err;
  });
  EkkoFunction.create("tapTestFunction");
  t.ok(fs.existsSync("index.js"), "index.js exists");
  process.chdir("..");
  t.ok(fs.existsSync("tapTestFunction"), "function directory exists");

  EkkoFunction.deleteLocalDirectory("tapTestFunction");
  fs.unlink(".ekko_functions.txt", (err) => {
    if (err) {
      console.error(err);
    }
  });
  t.end();
});

test("ekko create function can not run outside of ekko_functions directory", async ({
  throws,
}) => {
  throws(
    () => EkkoFunction.create("tapTestFunction"),
    Error("Command can't be run outside of ekko_functions directory.")
  );
});
