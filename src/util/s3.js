var AWS = require("aws-sdk");
const { EKKO_ENVIRONMENT_PATH } = require("./ekkoConfig");
const fs = require("fs");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const region = process.env.AWS_REGION;
const ora = require("ora");
const spinner = ora();
const ASSOCIATIONS = "associations.json";
const S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

AWS.config.update({ region: region });

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

module.exports = s3;
