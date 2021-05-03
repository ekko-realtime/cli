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
ekko-realtime-cli/0.0.17 darwin-x64 node-v14.15.0
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
* [`ekko test`](#ekko-test)
* [`ekko update FILENAME`](#ekko-update-filename)

## `ekko config`

Update ekko-cli to use new AWS credentials

```
USAGE
  $ ekko config

DESCRIPTION
  ...
  Updates ekko-cli to use new AWS credentials
```

_See code: [src/commands/config.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/config.js)_

## `ekko create FUNCTIONNAME`

Create a local ekko function

```
USAGE
  $ ekko create FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of new ekko function.

DESCRIPTION
  Creates a local ekko function
```

_See code: [src/commands/create.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/create.js)_

## `ekko deploy FUNCTIONNAME`

Deploy an ekko function to AWS Lambda

```
USAGE
  $ ekko deploy FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of Function you would like to deploy.

DESCRIPTION
  ...
  Deploys an ekko function to AWS Lambda
```

_See code: [src/commands/deploy.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/deploy.js)_

## `ekko destroy FUNCTIONNAME`

Delete an ekko function and tear down the associated Lambda

```
USAGE
  $ ekko destroy FUNCTIONNAME

ARGUMENTS
  FUNCTIONNAME  Name of the ekko function that you would like to destroy

DESCRIPTION
  Deletes an ekko function and tears down the associated Lambda
```

_See code: [src/commands/destroy.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/destroy.js)_

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

Initialize ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To deploy a new ekko infratructure enter 'y'. 

```
USAGE
  $ ekko init

DESCRIPTION
  ...
  Initializes ekko resources in your current working directory. To join an existing ekko infrastructure, enter 'n'. To 
  deploy a new ekko infratructure enter 'y'.
```

_See code: [src/commands/init.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/init.js)_

## `ekko jwt APPNAME`

Generate JsonWebTokens for an ekko realtime application

```
USAGE
  $ ekko jwt APPNAME

ARGUMENTS
  APPNAME  Name of ekko realtime application that you would like to create JWTs for

DESCRIPTION
  Generate JsonWebTokens for an ekko realtime application
```

_See code: [src/commands/jwt.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/jwt.js)_

## `ekko status`

List your ekko functions and their deployment status

```
USAGE
  $ ekko status

DESCRIPTION
  Lists your ekko functions and their deployment status
```

_See code: [src/commands/status.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/status.js)_

## `ekko teardown`

Tear down your ekko infrastructure on AWS

```
USAGE
  $ ekko teardown

DESCRIPTION
  ...
  Tears down your ekko infrastructure on AWS
```

_See code: [src/commands/teardown.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/teardown.js)_

## `ekko test`

Tesing purposes

```
USAGE
  $ ekko test

DESCRIPTION
  ...
  Testing purposes
```

_See code: [src/commands/test.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/test.js)_

## `ekko update FILENAME`

Update associations.json or an AWS lambda associated with the local ekko function

```
USAGE
  $ ekko update FILENAME

ARGUMENTS
  FILENAME  associations.json or the name of the ekko function that you would like to update.

DESCRIPTION
  Update associations.json or an AWS lambda associated with the local ekko function
```

_See code: [src/commands/update.js](https://github.com/ekko-live/cli/blob/v0.0.17/src/commands/update.js)_
<!-- commandsstop -->
