const tap = require("tap");
const fs = require("fs");
const EkkoFunction = require("../src/util/ekkoFunction.js");

// tap.before(() => EkkoFunction.create("tapTestFunction"));
// tap.test
// tap.ok(fs.existsSync("tapTestFunction"));
// tap.teardown(() => EkkoFunction.deleteLocalDirectory("tapTestFunction"));

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
