// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
const { EKKO_ENVIRONMENT_PATH } = require("./fileUtil");
const fs = require("fs");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const region = process.env.AWS_REGION;
const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const ASSOCIATIONS = "./associations.json";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
// Set the region

AWS.config.update({ region: region });

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const updateAssociations = async () => {
  spinner.start("Updating associations.json on AWS S3...");
  var uploadParams = {
    Bucket: "cf-templates-yzwm21thtzcu-us-east-1",
    Key: ASSOCIATIONS,
    Body: "",
  };

  var fileStream = fs.createReadStream(ASSOCIATIONS);

  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      spinner.fail(`Error uploading associations.json to AWS S3: ${err}`);
    }
    if (data) {
      spinner.succeed(
        `Successfully uploaded a new version of associations.json on AWS S3`
      );
      const dataLocation = data.Location;
    }
  });
};

const listObjects = async () => {
  var bucketParams = {
    Bucket: "cf-templates-yzwm21thtzcu-us-east-1",
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
  // spinner.start(`Updating associations.json...`);
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
    Bucket: "cf-templates-yzwm21thtzcu-us-east-1",
    Key: ASSOCIATIONS,
  };
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data.Body.toString("utf-8")); // successful response
    /*
     data = {
      AcceptRanges: "bytes", 
      ContentLength: 3191, 
      ContentType: "image/jpeg", 
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      LastModified: <Date Representation>, 
      Metadata: {
      }, 
      TagCount: 2, 
      VersionId: "null"
     }
     */
  });
};

module.exports = {
  updateAssociations,
  listObjects,
  listBuckets,
  getAssociations,
};
