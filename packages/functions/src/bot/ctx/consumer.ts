import { Member } from "./member";
import { Options } from "./options";
import { I8l } from "./i8l";
import { fetchDiscord, getLastWord } from "../common";
import { model as model_ } from "@shiritorikun/core/db";

import {
  ShiritoriEntityType,
  WordEntityType,
} from "@shiritorikun/core/db/entity";

export class ConsumerCtx {
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
      .then((result) => result.data[0]);

    return new ConsumerCtx({ interactionBody, shiritori });
  }

  getChannelId(): string {
    return this.interactionBody.channel_id;
  }

  private setShiritori() {
    return this.model.entities.ShiritoriEntity.update({
      shiritoriId: this.shiritori.shiritoriId,
    });
  }

  setShiritoriChannel() {
    return this.setShiritori().set({ channelId: this.getChannelId() }).go();
  }

  setShiritoriLanguage() {
    return this.setShiritori()
      .set({ language: this.options.getOptionValue("language") as "en" | "jp" })
      .go();
  }

  async getLastWord(): Promise<WordEntityType | undefined> {
    return getLastWord(this.shiritori.shiritoriId);
  }

  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, { body });
  }
}
