const associations = {
  applications: {
    app_1: {
      channels: [
        { channelName: "channel_1", functionNames: ["capitalize"] },
        { channelName: "channel_2", functionNames: ["reverse"] },
        { channelName: "channel_3", functionNames: ["emphasize"] },
        {
          channelName: "channel_4",
          functionNames: ["capitalize", "reverse", "emphasize"],
        },
      ],
    },
  },
};

const json = JSON.stringify(associations);

module.exports = json;
