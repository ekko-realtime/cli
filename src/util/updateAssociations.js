const ora = require("ora");
const spinner = ora();
const axios = require("axios").default;
const fs = require("fs");
const { generateAssociationsJWT } = require("./generateJWT");
const EkkoFunction = require("./ekkoFunction");
const { EKKO_ENVIRONMENT_PATH } = require("./ekkoConfig");
const s3 = require("./s3.js");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const ASSOCIATIONS = "associations.json";
const S3_BUCKET = process.env.S3_BUCKET;

const updateAssociations = () => {
  if (EkkoFunction.validDirectory()) {
    updateS3();
    updateServer();
  } else {
    spinner.fail("Command can't be run outside of ekko_functions directory.");
  }
};

const updateS3 = async () => {
  spinner.start("Updating associations.json on AWS S3...");
  var uploadParams = {
    Bucket: S3_BUCKET,
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
    }
  });
};

const updateServer = () => {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  let associations = fs.readFileSync("associations.json", "utf8");
  assocations = JSON.parse(associations);
  const token = generateAssociationsJWT(associations);

  spinner.start("Updating associations.json on server...");
  axios
    .put(`${API_ENDPOINT}/associations`, { token: token })
    .then(function (response) {
      // handle success
      spinner.succeed("Associations updated on server");
    })
    .catch(function (error) {
      // handle error
      spinner.fail(`Failed to update associations.json on server ${error}`);
    });
};

module.exports = updateAssociations;
