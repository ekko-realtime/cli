const { Command } = require("@oclif/command");
const FileUtil = require("../../util/fileUtil.js");

class CreateCommand extends Command {
  static args = [
    {
      name: "function", // name of arg to show in help and reference with args[name]
      required: true, // make the arg required with `required: true`
      description: "Create a new ekko function.", // help description
      hidden: false, // hide this arg from help
      // parse: (input) => "output", // instead of the user input, return a different value
      // default: "world", // default value if no arg input
      // options: ["a", "b"], // only allow input to be from a discrete set
    },
    {
      name: "functionName",
      required: false,
      description: "Name of new ekko function.",
      hidden: false,
      default: "myEkkoFunction",
    },
  ];
  async run() {
    const { args } = this.parse(CreateCommand);

    if (args.function === "function" && args.functionName) {
      const path = args.functionName + ".js";
      const content =
        "exports.handler = async (event) => {\nconst response = {\nstatusCode: 200,\nbody: JSON.stringify('Hello from ekko generated Lambda!'),\n};\nreturn response;\n};";
      if (FileUtil.duplicatePath(path)) {
        this.error(
          `${args.functionName} already exists. Please specify a new name.`
        );
      } else {
        FileUtil.createFile(path, content);
        this.log(` ekko function '${path}' successfully created!`);
      }
    }
  }
}

CreateCommand.description = `Creates a local ekko function.
Creates a local ekko function.
`;

module.exports = CreateCommand;
