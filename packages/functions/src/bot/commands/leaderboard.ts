import { CommandHandler } from "../runner";

export const leaderboard: CommandHandler = async (ctx) => {
  const status = ctx.options.getOptionValue("status") as string;

  return {
    mutations: [
      ctx.model.entities.ShiritoriEntity.update({
        shiritoriId: ctx.shiritori.shiritoriId,
      })
        .set({ leaderboard: status === "true" ? true : false })
        .go(),

      ctx.followUp({
        content: ctx.i8l.leaderboardStatus(status),
      }),
    ],
  };
};
