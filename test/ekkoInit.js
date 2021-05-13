const tap = require("tap");
const os = require("os");
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const fs = require("fs");

tap.test(".ekko/.env exists and has values", (t) => {
  t.ok(fs.existsSync(EKKO_GLOBAL_DIRECTORY));
  t.ok(process.env.SECRET);
  t.ok(process.env.API_ENDPOINT);
  t.ok(process.env.S3_BUCKET);
  t.ok(process.env.AWS_ACCESS_KEY_ID);
  t.ok(process.env.AWS_SECRET_KEY);
  t.ok(process.env.AWS_REGION);
  t.ok(process.env.LAMBDA_ROLE_ARN);
  t.end();
});
