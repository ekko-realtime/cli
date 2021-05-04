const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const EkkoInit = require("../util/ekkoInit.js");

class InitCommand extends Command {
  async run() {
    console.log(
      "This will create a new ekko directory in your current working directory."
    );
    console.log("");
    let response = await cli.prompt(
      "Do you want to deploy a new ekko infrastructure (y/n)?"
    );
    response = response.toLowerCase();

    if (response === "y") {
      await EkkoInit.newDeployment();
    } else if (response === "n") {
      await EkkoInit.existingDeployment();
    }
  }
}

InitCommand.description = `Initialize files and deploy ekko infrastructure.
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

- creates an empty ekko folder in your current working directory where you can clone your organization's realtime application repositories and ekko_functions repository

To deploy a new ekko infratructure enter 'y'. This does the following:

- obtains and handles credentials (your AWS access key and secret key)
- installs all needed dependencies, the AWS CDK tool (if you don't already have it)
- runs the 'cdk bootstrap' command to spin up necessary intermediary infrastructure for the deployment
- deploys a full working ekko server to AWS
- creates an 'ekko' folder in the current working directory which includes a skeleton folder structure
- writes the necessary server endpoint addresses and secrets to ~/.ekko/.env
`;

module.exports = InitCommand;
