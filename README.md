# Ekko-cli

Ekko is a realtime serverless framework. Use the ekko-realtime-cli to initialize the Ekko framework and manage serverless functions for your realtime application.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ekko-cli.svg)](https://npmjs.org/package/ekko-cli)
[![Downloads/week](https://img.shields.io/npm/dw/ekko-cli.svg)](https://npmjs.org/package/ekko-cli)
[![License](https://img.shields.io/npm/l/ekko-cli.svg)](https://github.com/ekko-realtime/ekko-cli/blob/master/package.json)

<!-- toc -->
* [Ekko-cli](#ekko-cli)
* [Usage](#usage)
* [Getting Started](#getting-started)
* [FAQ](#faq)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g ekko-realtime-cli
$ ekko COMMAND
running command...
$ ekko (-v|--version|version)
ekko-realtime-cli/0.0.26 darwin-x64 node-v14.15.0
$ ekko --help [COMMAND]
USAGE
  $ ekko COMMAND
...
```
<!-- usagestop -->

# Getting Started

<!-- gettingstarted -->

### Prerequisites

- [an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?nc2=h_ct&src=default&tag=soumet-20)
- `npm` is [installed](https://www.npmjs.com/get-npm)
- the AWS CLI is [installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html?tag=soumet-20) and configured
- the AWS CDK command-line tool is [installed](https://docs.aws.amazon.com/cdk/latest/guide/cli.html?tag=soumet-20)

### Installation

- run `npm install -g ekko-realtime-cli` (to install [our npm package](https://www.npmjs.com/package/ekko-realtime-cli))
- type `ekko --help` to see the commands available to use

### First Time Usage

The `ekko` command is run by inputting commands after the initial `ekko` like: `ekko <command> <optional argument>`.

To read the help text for each command, type `ekko <command> --help`. This will output a short explanation of what the command does, which arguments it takes and how to use it.

- `cd` to the folder in which you would like to initialise your Ekko directory
- type `ekko init`:
- type `y` to deploy a new Ekko infrastructure which will:
  - setup your AWS credentials for Ekko
  - deploy Ekko infrastructure to AWS
  - create an Ekko skeleton folder and file framework for your project files in the current directory
- type `n` to join and existing Ekko infrastructure
  - you will be prompted for your organizations Ekko infrastructure information which can be found in ~/.ekko/.env on a machine where Ekko has been initialized:
    - SECRET
    - API_ENDPOINT
    - S3_BUCKET
    - LAMBDA_ROLE_ARN
  - you will then be prompted for your AWS credentials
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_KEY
    - AWS_REGION
  - this creates a an Ekko folder in your current directory containing an empty ekko_apps folder
  - clone your organization's Ekko application repositories in the ekko_apps folder
  - clone your organizations's ekko_functions repository in the Ekko folder
- once your Ekko folder is set up, `cd` into `ekko/ekko_functions` and type `ekko create <function name>` to create a folder and a template file for an AWS Lambda function.
- type `ekko deploy <function name>` to deploy any particular function that exists locally inside the `ekko_functions` folder.
- edit associations.json in the ekko_functions folder to associate a deployed ekko function with specific channels in your app
- type `ekko update associations.json` to update the Ekko server with your new associations

### Removing Ekko

To remove Ekko infrastructure from AWS, run `ekko teardown`. (This removes all server and shared resources infrastructure from AWS.)

To uninstall / remove the Ekko cli tool, run `npm uninstall ekko-cli-tool`. Then `cd` into `/usr/local/bin` and run `rm ekko` to delete the Ekko binary from your hard drive.

<!-- gettingstartedstop -->

# FAQ

<!-- faq -->

### I quit the `ekko init` command while it was in the middle of deploying infrastructure. Is there a way to tear down my infrastructure?

- To remove this infrastructure (that AWS will continue to set up even if you interrupt the Ekko cli command, visit the [AWS console](https://aws.amazon.com/console?tag=soumet-20), navigate to the CloudFormation section and you can individually delete the `ekko-server` stack and then the `shared-resources` stack. Note that the infrastructure deployment must be completed _before_ AWS will allow you to delete those stacks. AWS will also not allow you to delete `shared-resources` before `ekko-server` is deleted because there are dependencies.

### What infrastructure does Ekko spin up on my behalf?

- The main infrastructure we spin are as follows:
  - an S3 bucket to hold configuration files
  - an Elasticache / Redis cluster
  - an ECS cluster managed by the Fargate service for running the server containers

### Does Ekko apply tags to the infrastructure that gets spun up by the CLI?

- Everything deployed by `ekko` is tagged with the `service:ekko` key:value pair. This will allow you to monitor and access [CloudWatch](https://aws.amazon.com/cloudwatch?tag=soumet-20) graphs and information.

### Do I have to use the Ekko skeleton folder?

- It is recommended that you use the Ekko skeleton folder to organize your Ekko applications and ekko_functions.
- If you must, you can organize your Ekko applicaiton repositories however you'd like

### Do I have to use the ekko_functions folder?

- Yes. You can only run Ekko function commands from within this folder and all of your apps should share these functions.

### Can I have more than one ekko_functions repository?

- No. Ekko supports multiple apps but they should all use the same Ekko functions.

### Why am I getting this error?: `Command can't be run outside of ekko_functions directory.`

- Some Ekko commands require that your cwd is ekko_functions. This is verified by checking for an .ekko_functions.txt file in the cwd. If you are getting this error within your ekko_functions directory, make sure that .ekko_functions.txt exists and if it does not, create it.
<!-- faqstop -->

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

_See code: [src/commands/config.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/config.js)_

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

_See code: [src/commands/create.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/create.js)_

## `ekko deploy FUNCTIONNAME`

Deploy an ekko function to AWS Lambda

```
USAGE
  $ ekko deploy FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of Function you would like to deploy.

DESCRIPTION
  ...
  Pass in the name of a folder where your lambda function code is stored. 
  (This should be inside an 'ekko_functions' folder; one is created for you by default when you run 'ekko init' and 
  deploy infrastructure).

  This command will compress the contents of the folder and upload them to AWS Lambda. 
  To use the deployed lambda in your realtime app, add it to one or more channels in associations.json.
```

_See code: [src/commands/deploy.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/deploy.js)_

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

_See code: [src/commands/destroy.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/destroy.js)_

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

  - prompts you for the credentials required to join an existing ekko infrastructure. 
  - these credentials can be found in ~/.ekko/.env on a machine where ekko has been initialized:
     - SECRET
     - API_ENDPOINT
     - S3_BUCKET
     - LAMBDA_ROLE_ARN

  - prompts you for your AWS credentials
     - AWS_ACCESS_KEY_ID
     - AWS_SECRET_KEY
     - AWS_REGION

  - saves credentials to ~/.ekko/.env
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

_See code: [src/commands/init.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/init.js)_

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

_See code: [src/commands/jwt.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/jwt.js)_

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

_See code: [src/commands/status.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/status.js)_

## `ekko teardown`

Tear down your ekko infrastructure on AWS

```
USAGE
  $ ekko teardown

DESCRIPTION
  ...
  Removes all server and shared resources infrastructure from AWS and deletes your global ~/.ekko config directory.
  This command does not delete you ekko project directory. 

  It is recommended to remove your cloud infrastructure if you are not actively developing your application.
  Remember that AWS charges you for the time your infrastructure is up and running.
```

_See code: [src/commands/teardown.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/teardown.js)_

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

_See code: [src/commands/update.js](https://github.com/ekko-realtime/cli/blob/v0.0.26/src/commands/update.js)_
<!-- commandsstop -->
