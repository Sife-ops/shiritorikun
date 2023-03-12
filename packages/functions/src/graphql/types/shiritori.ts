import { ShiritoriEntityType } from "@shiritorikun/core/db/entity";
import { builder } from "../builder";

export const ShiritoriType =
  builder.objectRef<ShiritoriEntityType>("Shiritori");
ShiritoriType.implement({
  fields: (t) => ({
    shiritoriId: t.exposeID("shiritoriId"),
    guildId: t.exposeString("guildId"),
    guildName: t.exposeString("guildName"),
    guildIcon: t.exposeString("guildIcon"),
    length: t.exposeInt("length"),
  }),
});
