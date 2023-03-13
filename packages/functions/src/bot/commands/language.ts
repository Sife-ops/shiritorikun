import { CommandHandler } from "../runner";

export const language: CommandHandler = async (ctx) => {
  return {
    mutations: [
      ctx.setShiritoriLanguage(),

      ctx.followUp({
        content: ctx.i8l.language(
          ctx.options.getOptionValue("language") as "en" | "jp"
        ),
      }),
    ],
  };
};
