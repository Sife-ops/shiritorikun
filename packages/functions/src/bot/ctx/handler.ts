import { Member } from "./member";
import { Options } from "./options";
import { I8l } from "./i8l";
import { fetchDiscord, fetchGuild, getLastWord } from "../common";
import { model as model_ } from "@shiritorikun/core/db";

import {
  ShiritoriEntityType,
  WordEntityType,
} from "@shiritorikun/core/db/entity";

export class HandlerCtx {
  model = model_;
  interactionBody;
  options;
  member;
  shiritori;
  i8l;

  private constructor(c: {
    interactionBody: any;
    shiritori: ShiritoriEntityType;
  }) {
    this.interactionBody = c.interactionBody;
    this.options = new Options({ interactionBody: c.interactionBody });
    this.member = new Member({ interactionBody: c.interactionBody });
    this.shiritori = c.shiritori;
    this.i8l = new I8l({ shiritori: c.shiritori });
  }

  static async init({ interactionBody }: { interactionBody: any }) {
    const shiritori = await model_.entities.ShiritoriEntity.query
      .guild_({
        guildId: interactionBody.guild_id,
      })
      .go()
      .then((result) => result.data[0])
      .then(async (shiritori) => {
        if (!shiritori) {
          const { name, icon } = await fetchGuild(interactionBody.guild_id);

          return model_.entities.ShiritoriEntity.create({
            guildId: interactionBody.guild_id,
            guildIcon: typeof icon === "string" ? icon : undefined,
            guildName: name,
          })
            .go()
            .then((result) => result.data);
        }

        return shiritori;
      });

    return new HandlerCtx({ interactionBody, shiritori });
  }

  isMemberAuthorized(): boolean {
    const authorized = ["channel", "language", "leaderboard"];
    if (authorized.includes(this.options.getCommandName(0))) {
      return this.member.isAdmin();
    }
    return true;
  }

  async getLastWord(): Promise<WordEntityType | undefined> {
    return getLastWord(this.shiritori.shiritoriId);
  }
}
