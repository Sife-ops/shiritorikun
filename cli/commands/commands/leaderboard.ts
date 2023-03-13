export const leaderboard = {
  name: "leaderboard",
  description: "leaderboard opt-in status",
  type: 1,
  options: [
    {
      name: "status",
      description: "status",
      type: 3,
      required: true,
      choices: [
        {
          name: "True",
          value: "true",
        },
        {
          name: "False",
          value: "false",
        },
      ],
    },
  ],
};
