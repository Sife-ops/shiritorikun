import { CommandHandler } from "../runner";
import { compareSync } from "bcryptjs";
import { gooJisho, normalizeKana } from "../common";

export const shiritori: CommandHandler = async (ctx) => {
  const lastWord = await ctx.getLastWord();
  if (lastWord) {
    if (compareSync(ctx.member.getId(), lastWord.memberHash)) {
      return {
        mutations: [
          ctx.followUp({
            content: `❌ ${ctx.i8l.notYourTurn()}`,
          }),
        ],
      };
    }
  }

  const word = ctx.options.getOptionValue("word") as string;
  const reading_ = ctx.options.getOptionValue("reading") as string | undefined;

  const baseUrl = "https://dictionary.goo.ne.jp/word";
  let url = `${baseUrl}/${word}/`;
  let reading = await gooJisho(url);
  if (!reading && reading_) {
    url = `${baseUrl}/${word}_%28${reading_}%29/`;
    reading = await gooJisho(url);
  }

  if (reading) {
    if (lastWord) {
      const atama = normalizeKana(reading[0]);
      const shiri = normalizeKana(
        lastWord.reading[lastWord.reading.length - 1]
      );

      if (shiri !== "ん" && shiri !== atama) {
        return {
          mutations: [
            ctx.followUp({
              content: `❌ ${ctx.i8l.shiritoriBad(word)}`,
            }),
          ],
        };
      }

      const oldWord = await ctx.model.entities.WordEntity.query
        .shiritori_word({
          shiritoriId: ctx.shiritori.shiritoriId,
          word,
          reading,
        })
        .go({ order: "desc" })
        .then((result) => result.data[0]);

      if (oldWord) {
        if (ctx.shiritori.difficulty === "hardcore") {
          return {
            mutations: [
              ctx.followUp({
                content: `❌ ${ctx.i8l.alreadyUsed(word)}`,
              }),
            ],
          };
        }

        const since = ctx.shiritori.length - oldWord.shiritoriIndex;
        if (since < ctx.shiritori.cooldown) {
          return {
            mutations: [
              ctx.followUp({
                content: `❌ ${ctx.i8l.cooldown(
                  word,
                  reading,
                  ctx.shiritori.cooldown - since
                )}`,
              }),
            ],
          };
        }
      }
    }

    return {
      mutations: [
        ctx.model.entities.WordEntity.create({
          shiritoriId: ctx.shiritori.shiritoriId,
          shiritoriIndex: ctx.shiritori.length,
          memberHash: ctx.member.getIdHash(),
          word,
          reading,
        }).go(),

        ctx.model.entities.ShiritoriEntity.update({
          shiritoriId: ctx.shiritori.shiritoriId,
        })
          // .add({ score: 1 })
          .set({ length: ctx.shiritori.length + 1 })
          .go(),

        ctx.followUp({
          content: `⭕ ${ctx.i8l.shiritoriGet(
            normalizeKana(reading[reading.length - 1])
          )}\n(${url})`,
        }),
      ],
    };
  }

  return {
    mutations: [
      ctx.followUp({
        content: `❌ ${ctx.i8l.shiritoriNotFound(word)}`,
      }),
    ],
  };
};
