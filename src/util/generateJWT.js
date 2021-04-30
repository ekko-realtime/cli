const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const { EKKO_ENVIRONMENT_PATH } = require("./fileUtil");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const SECRET = process.env.SECRET;
var jwt = require("jsonwebtoken");

let adminToken = {
  admin: true,
};

let userToken = {
  admin: false,
};

const generateJWT = (appName) => {
  spinner.start("Signing JSON Webtokens");
  userToken.appName = appName;
  adminToken.appName = appName;

  spinner.succeed(
    `JsonWebTokens successfully created for application '${appName}'.`
  );
  console.log("");

  spinner.succeed(`Your ekko server endpoint:`);
  console.log(process.env.API_ENDPOINT);
  console.log("");

  userToken = jwt.sign(userToken, SECRET);
  spinner.succeed(`User JsonWebToken for your ekko client code:`);
  console.log(userToken);
  console.log("");
  adminToken = jwt.sign(adminToken, SECRET);
  spinner.succeed(`Admin JsonWebToken for your server code:`);
  console.log(adminToken);
  console.log("");
};

const generateAssociationsJWT = (associations) => {
  const token = jwt.sign(associations, SECRET);
  // const verified = jwt.verify(token, SECRET);
  // console.log("verified", verified);
  return token;
};

const verifyJWT = () => {
  const USER = jwt.verify(userToken, SECRET);
  const ADMIN = jwt.verify(adminToken, SECRET);

  console.log("Decoded user token:", USER);
  console.log("Decoded admin token:", ADMIN);
};

module.exports = { generateJWT, verifyJWT, generateAssociationsJWT };
