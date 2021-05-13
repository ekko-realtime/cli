const tap = require("tap");
var jwt = require("jsonwebtoken");
const { EKKO_ENVIRONMENT_PATH } = require("../src/util/ekkoConfig");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const SECRET = process.env.SECRET;

const { generateAssociationsJWT } = require("../src/util/generateJWT.js");

tap.test("valid jwt created", (t) => {
  const payload = { name: "one", functions: ["test"] };
  const token = generateAssociationsJWT({ payload });
  const verified = jwt.verify(token, SECRET);
  t.same(payload, verified.payload);
  t.end();
});
