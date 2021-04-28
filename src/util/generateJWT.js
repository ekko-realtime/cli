const ora = require("ora");
const spinner = ora({ color: "yellow", spinner: "dots" });
const { EKKO_ENVIRONMENT_PATH } = require("./fileUtil");
require("dotenv").config({ path: EKKO_ENVIRONMENT_PATH });
const SECRET = process.env.SECRET;
var jwt = require("jsonwebtoken");

// console.log("SECRET:", SECRET);

let adminToken = {
  admin: true,
};

let userToken = {
  admin: false,
};

const generateJWT = (appName) => {
  // console.log("GENERATING");
  // console.log("App Name:", appName);
  spinner.start("Signing JSON Webtokens");
  userToken.appName = appName;
  adminToken.appName = appName;

  userToken = jwt.sign(userToken, SECRET);
  spinner.succeed(`User JsonWebToken successfully created: ${userToken}`);
  adminToken = jwt.sign(adminToken, SECRET);
  spinner.succeed(`Admin JsonWebToken successfully created ${adminToken}`);
};

const verifyJWT = (appName) => {
  const USER = jwt.verify(userToken, SECRET);
  const ADMIN = jwt.verify(adminToken, SECRET);

  console.log("Decoded user token:", USER);
  console.log("Decoded admin token:", ADMIN);
};

module.exports = { generateJWT, verifyJWT };
