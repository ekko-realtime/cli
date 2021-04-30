const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const axios = require("axios").default;
const fs = require("fs");
const { generateAssociationsJWT } = require("./generateJWT");
const { EKKO_ENVIRONMENT_PATH } = require("./fileUtil");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });

const updateServer = () => {
  const API_ENDPOINT = process.env.API_ENDPOINT;
  `${API_ENDPOINT}/associations`;
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

module.exports = updateServer;
