import config from "../config";

const { APP_ID, GUILD_ID, BOT_TOKEN } = config;
const { STK_GLOBAL } = process.env;

export const url = STK_GLOBAL
  ? `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`
  : `https://discord.com/api/v10/applications/${APP_ID}/commands`;

export const headers = {
  Authorization: `Bot ${BOT_TOKEN}`,
  "Content-Type": "application/json",
};
