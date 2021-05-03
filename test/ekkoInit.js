const tap = require("tap");
const os = require("os");
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const fs = require("fs");

tap.ok(fs.existsSync(EKKO_GLOBAL_DIRECTORY));
tap.ok(process.env.SECRET);
tap.ok(process.env.API_ENDPOINT);
tap.ok(process.env.S3_BUCKET);
tap.ok(process.env.AWS_ACCESS_KEY_ID);
tap.ok(process.env.AWS_SECRET_KEY);
tap.ok(process.env.AWS_REGION);
tap.ok(process.env.LAMBDA_ROLE_ARN);
