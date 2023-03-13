import { builder } from "../../builder";
import { ShiritoriType } from "../shiritori";

builder.queryFields((t) => ({
  ranking: t.field({
    type: [ShiritoriType],
    resolve: (_, __, ctx) =>
      ctx.model.entities.ShiritoriEntity.query
        .length_({})
        .go({ order: "asc", limit: 100 })
        .then((result) => result.data)
        .then((guilds) => guilds.filter((guild) => guild.leaderboard)),
  }),
}));
