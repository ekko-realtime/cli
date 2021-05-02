var AWS = require("aws-sdk");
const { EKKO_ENVIRONMENT_PATH } = require("./ekkoConfig");
const fs = require("fs");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const region = process.env.AWS_REGION;
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const ASSOCIATIONS = "associations.json";
const S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

AWS.config.update({ region: region });

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

/*
const listObjects = async () => {
  var bucketParams = {
    Bucket: S3_BUCKET,
  };

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("ITEMS IN BUCKET:", data);
    }
  });
};

const listBuckets = async () => {
  spinner.start(`Updating associations.json...`);
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
      // spinner.fail(`ERROR GETTING BUCKETS: ${err}`);
    } else {
      console.log("Success", data.Buckets);
      // spinner.succeed("THESE ARE YOUR BUCKETS:", data.Buckets);
    }
  });
};

const getAssociations = async () => {
  var params = {
    Bucket: S3_BUCKET,
    Key: ASSOCIATIONS,
  };
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data.Body.toString("utf-8")); // successful response
  });
};
*/

module.exports = s3;
