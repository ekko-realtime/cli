const AWS = require("aws-sdk");
const { EKKO_ENVIRONMENT_PATH } = require("./ekkoConfig");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const apiVersion = "latest";
const region = process.env.AWS_REGION;
const lambda = new AWS.Lambda({ apiVersion, region });

module.exports = lambda;
