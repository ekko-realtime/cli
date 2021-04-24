const { ServerlessApplicationRepository } = require("aws-sdk");
const AWS = require("aws-sdk");
const iam = new AWS.IAM();
const ROLE_NAME = "lambda_basic_execution";

const createLambdaRole = async () => {
  let newRole;

  const rolePolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  };

  const createRoleParams = {
    RoleName: ROLE_NAME,
    AssumeRolePolicyDocument: JSON.stringify(rolePolicy),
  };

  try {
    newRole = await iam.createRole(createRoleParams).promise();
    console.log("created new role: ", newRole);
  } catch (error) {
    console.error("Error creating lambda role: ", error);
  }

  return newRole;
};

const getExistingRole = async () => {
  let lambdaRoleData;

  const params = {
    RoleName: ROLE_NAME,
  };

  try {
    lambdaRoleData = await iam.getRole(params).promise();
    // console.log("lambda role exists response: ", lambdaRoleData);
  } catch (error) {
    console.error("Error checking lambda role exists", error);
  }
  return lambdaRoleData;
};

const attachPolicy = async () => {
  let policy;

  const attachPolicyParams = {
    PolicyArn:
      "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    RoleName: ROLE_NAME,
  };

  try {
    policy = await iam.attachRolePolicy(attachPolicyParams).promise();
  } catch (error) {
    console.error("error attaching policy: ", error);
  }
  return policy;
};

const getLambdaRole = async () => {
  let existingRole = await getExistingRole();

  if (!existingRole) {
    existingRole = await createLambdaRole();
    console.log("check1: ", existingRole);
    let policy = await attachPolicy();
    await new Promise((resolve) => setTimeout(resolve, 10000));
    // console.log("check2: ",existingRole);
  }

  return existingRole;
};

module.exports = getLambdaRole;
