import { fetchGuild } from "../common";
import { CommandHandler } from "../runner";
import { Config } from "sst/node/config";
import { StaticSite } from "sst/node/site";

export const info: CommandHandler = async (ctx) => {
  const lastWord = await ctx.getLastWord();

  return {
    mutations: [
      fetchGuild(ctx.shiritori.guildId).then(async (guild) => {
        if (
          guild.name !== ctx.shiritori.guildName ||
          guild.icon !== ctx.shiritori.guildIcon
        ) {
          await ctx.model.entities.ShiritoriEntity.update({
            shiritoriId: ctx.shiritori.shiritoriId,
          })
            .set({
              guildName: guild.name,
              guildIcon: guild.icon,
            })
            .go();
        }
      }),

      ctx.followUp({
        // content: "Info",
        embeds: [
          {
            title: ctx.replyI8l.infoTitle(),
            // description: "Shiritori Information",
            fields: [
              {
                name: ctx.replyI8l.infoWord(),
                value: `${lastWord?.word || ""}/${lastWord?.reading || ""}`,
              },
              {
                name: ctx.replyI8l.infoLength(),
                value: ctx.shiritori.length,
              },
              {
                name: ctx.replyI8l.infoLeaderboard(),
                value: ctx.replyI8l.infoLeaderboardValue(
                  ctx.shiritori.leaderboard
                ),
              },
            ],
          },
          {
            title: ctx.replyI8l.infoLink(),
            url:
              Config.STAGE === "prod"
                ? `${StaticSite.site.url}`
                : "http://localhost:5173/",
          },
        ],
      }),
    ],
  };
};
