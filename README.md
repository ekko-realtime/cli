ekko-cli
========

A command-line tool for ekko, the realtime serverless platform.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ekko-cli.svg)](https://npmjs.org/package/ekko-cli)
[![Downloads/week](https://img.shields.io/npm/dw/ekko-cli.svg)](https://npmjs.org/package/ekko-cli)
[![License](https://img.shields.io/npm/l/ekko-cli.svg)](https://github.com/ekko-live/ekko-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ekko-realtime-cli
$ ekko COMMAND
running command...
$ ekko (-v|--version|version)
ekko-realtime-cli/0.0.21 darwin-x64 node-v14.15.0
$ ekko --help [COMMAND]
USAGE
  $ ekko COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ekko config`](#ekko-config)
* [`ekko create FUNCTIONNAME`](#ekko-create-functionname)
* [`ekko deploy FUNCTIONNAME`](#ekko-deploy-functionname)
* [`ekko destroy FUNCTIONNAME`](#ekko-destroy-functionname)
* [`ekko help [COMMAND]`](#ekko-help-command)
* [`ekko init`](#ekko-init)
* [`ekko jwt APPNAME`](#ekko-jwt-appname)
* [`ekko status`](#ekko-status)
* [`ekko teardown`](#ekko-teardown)
* [`ekko update FILENAME`](#ekko-update-filename)

## `ekko config`

Update ekko-cli to use new AWS credentials

```
USAGE
  $ ekko config

DESCRIPTION
  ...
  If you change or receive new AWS credentials, or if you want to deploy the infrastructure or functions to a different 
  AWS region, you can run this command to input the updated values.

  You will need:

  - your AWS access key
  - your AWS secret key
  - your AWS region
```

_See code: [src/commands/config.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/config.js)_

## `ekko create FUNCTIONNAME`

Create a local ekko function

```
USAGE
  $ ekko create FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of new ekko function.

DESCRIPTION
  ...
  Pass in the name of the function you want to create as an argument to this command. It will create:
  - a folder in the ekko_functions directory and
  - a skeleton JavaScript template file (inside the folder it creates) that you can use to get started writing your 
  Lambda function code.
```

_See code: [src/commands/create.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/create.js)_

## `ekko deploy FUNCTIONNAME`

Deploy an ekko function to AWS Lambda

```
USAGE
  $ ekko deploy FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of Function you would like to deploy.

DESCRIPTION
  ...
  Pass in the name of a folder where your lambda function code is stored. (This should be inside an 'ekko_functions' 
  folder; one is created for you by default when you run 'ekko init' and deploy infrastructure).

  This command will compress the contents of the folder and upload them to AWS Lambda. To use the deployed lambda in 
  your realtime app, add it to one or more channels in associations.json.
```

_See code: [src/commands/deploy.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/deploy.js)_

## `ekko destroy FUNCTIONNAME`

Delete an ekko function locally and from AWS Lambda

```
USAGE
  $ ekko destroy FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of the ekko function that you would like to destroy

DESCRIPTION
  ...
  Deletes an ekko function folder and tears down the associated AWS Lambda

  Pass in the name of the function and this command will:
  - remove the function from AWS Lambda
  - delete the (local) directory where that function's code was stored
```

_See code: [src/commands/destroy.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/destroy.js)_

## `ekko help [COMMAND]`

display help for ekko

```
USAGE
  $ ekko help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `ekko init`

Initialize files and deploy ekko infrastructure.

```
USAGE
  $ ekko init

DESCRIPTION
  ...
  The 'init' command sets up everything you'll need to get going with ekko.

  You should run the command from the working directory in which you want to initialise an 'ekko' project folder.

  To join an existing ekko infrastructure, enter 'n' at the first prompt. This does the following:

  - prompts you for the credentials required to join an existing ekko infrastructure:
  	- AWS credentials
  	- ekko server API Endpoint
  	- S3 Bucket Name
  	- JWT Secret
  	- Lambda Role ARN 

  - creates an empty ekko folder in your current working directory where you can clone your organization's realtime 
  application repositories and ekko_functions repository

  To deploy a new ekko infratructure enter 'y'. This does the following:

  - obtains and handles credentials (your AWS access key and secret key)
  - installs all needed dependencies, the AWS CDK tool (if you don't already have it)
  - runs the 'cdk bootstrap' command to spin up necessary intermediary infrastructure for the deployment
  - deploys a full working ekko server to AWS
  - creates an 'ekko' folder in the current working directory which includes a skeleton folder structure
  - writes the necessary server endpoint addresses and secrets to ~/.ekko/.env
```

_See code: [src/commands/init.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/init.js)_

## `ekko jwt APPNAME`

Generate JSON Web Tokens for an ekko application

```
USAGE
  $ ekko jwt APPNAME

ARGUMENTS
  APPNAME  Name of ekko realtime application that you would like to create JWTs for

DESCRIPTION
  ...
  Generate the JSON Web Tokens (JWTs) for your ekko application.

  This command takes a required argument: the name of the app for which you want to generate JSON Web Tokens.

  It will print the following:

  - the API endpoint of your ekko infrastructure
  	- your server and client code need this to connect to your ekko infrastructure
  	- this is the same value that init outputs for a new deployment and is the same value for all applications
  - user JWT to be used in your client side code
  - admin JWT to be used in your server side code
```

_See code: [src/commands/jwt.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/jwt.js)_

## `ekko status`

List your ekko functions and their deployment status

```
USAGE
  $ ekko status

DESCRIPTION
  ...
  Lists the function folders that exist in your ekko_functions directory. If a function has been deployed to AWS Lambda 
  using the ekko-cli, it is listed as (deployed). 

  Please note:
  	- A function listed as (deployed) is not necesarily syncronized with its AWS Lambda version.
  	- It is the responsiblity of the developer to update Lambdas by running the update command when they make changes to a 
  local ekko function.
```

_See code: [src/commands/status.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/status.js)_

## `ekko teardown`

Tear down your ekko infrastructure on AWS

```
USAGE
  $ ekko teardown

DESCRIPTION
  ...
  Removes all server and shared resources infrastructure from AWS and deletes your global ~/.ekko config directory. This 
  command does not delete you ekko project directory. 

  It is recommended to remove your cloud infrastructure if you are not actively developing your application. Remember 
  that AWS charges you for the time your infrastructure is up and running.
```

_See code: [src/commands/teardown.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/teardown.js)_

## `ekko update FILENAME`

Update associations.json or a deployed AWS Lambda function

```
USAGE
  $ ekko update FILENAME

ARGUMENTS
  FILENAME  associations.json or the name of the ekko function that you would like to update.

DESCRIPTION
  ...
  This command takes a required argument, either 'associations.json' or the name of a function that has already been 
  deployed to AWS Lambda.

  If the argument passed in is 'associations.json', this command will upload an updated version of the file to S3, and 
  will update the server to propagate the new association rules.

  If the argument passed in is a valid deployed AWS Lambda function, this command will update that Lambda with any 
  changes that have been made in the directory of the ekko function.
```

_See code: [src/commands/update.js](https://github.com/ekko-live/cli/blob/v0.0.21/src/commands/update.js)_
<!-- commandsstop -->
