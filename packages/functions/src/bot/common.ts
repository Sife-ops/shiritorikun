import * as cheerio from "cheerio";
import fetch, { RequestInit, Response } from "node-fetch";
import { Config } from "sst/node/config";
import { WordEntityType } from "@shiritorikun/core/db/entity";
import { model } from "@shiritorikun/core/db";

const apiUrl = "https://discord.com/api/v10"; // todo: move to constants

export const fetchDiscord = async (
  e: string,
  i: RequestInit
): Promise<Response> => {
  // todo: zod
  return fetch(`${apiUrl}${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Config.BOT_TOKEN}`,
    },
    ...i,
    body: JSON.stringify(i.body),
  });
};

export const fetchGuild = async (guildId: string): Promise<any> => {
  return fetchDiscord(`/guilds/${guildId}`, {
    method: "GET",
  }).then((result) => result.json() as any);
};

export const ephemeralResponse = (content: string) => {
  return {
    type: 4,
    data: {
      flags: 64,
      content,
    },
  };
};

export const getLastWord = async (
  shiritoriId: string
): Promise<WordEntityType | undefined> => {
  return model.entities.WordEntity.query
    .shiritori_recent({ shiritoriId })
    .go({ order: "desc", limit: 1 })
    .then((result) => result.data[0]);
};

export const gooJisho = async (url: string) => {
  return fetch(url, { method: "GET" })
    .then((e) => e.text())
    .then((e) => cheerio.load(e))
    .then((e) => e(".yomi").text());
};

export const normalizeKana = (kana: string) => {
  switch (kana) {
    case "ア":
      return "あ";
    case "イ":
      return "い";
    case "ウ":
      return "う";
    case "エ":
      return "え";
    case "オ":
      return "お";
    case "カ":
      return "か";
    case "キ":
      return "き";
    case "ク":
      return "く";
    case "ケ":
      return "け";
    case "コ":
      return "こ";
    case "サ":
      return "さ";
    case "シ":
      return "し";
    case "ス":
      return "す";
    case "セ":
      return "せ";
    case "ソ":
      return "そ";
    case "タ":
      return "た";
    case "チ":
      return "ち";
    case "ツ":
      return "つ";
    case "テ":
      return "て";
    case "ト":
      return "と";
    case "ナ":
      return "な";
    case "ニ":
      return "に";
    case "ヌ":
      return "ぬ";
    case "ネ":
      return "ね";
    case "ノ":
      return "の";
    case "ハ":
      return "は";
    case "ヒ":
      return "ひ";
    case "フ":
      return "ふ";
    case "ヘ":
      return "へ";
    case "ホ":
      return "ほ";
    case "マ":
      return "ま";
    case "ミ":
      return "み";
    case "ム":
      return "む";
    case "メ":
      return "め";
    case "モ":
      return "も";
    case "ヤ":
      return "や";
    case "ユ":
      return "ゆ";
    case "ヨ":
      return "よ";
    case "ラ":
      return "ら";
    case "リ":
      return "り";
    case "ル":
      return "る";
    case "レ":
      return "れ";
    case "ロ":
      return "ろ";
    case "ワ":
      return "わ";
    case "ヲ":
      return "を";
    case "ン":
      return "ん";

    case "ガ":
      return "が";
    case "ギ":
      return "ぎ";
    case "グ":
      return "ぐ";
    case "ゲ":
      return "げ";
    case "ゴ":
      return "ご";
    case "ザ":
      return "ざ";
    case "ジ":
      return "じ";
    case "ズ":
      return "ず";
    case "ゼ":
      return "ぜ";
    case "ゾ":
      return "ぞ";
    case "ダ":
      return "だ";
    case "ヂ":
      return "ぢ";
    case "ヅ":
      return "づ";
    case "デ":
      return "で";
    case "ド":
      return "ど";
    case "バ":
      return "ば";
    case "ビ":
      return "び";
    case "ブ":
      return "ぶ";
    case "ベ":
      return "べ";
    case "ボ":
      return "ぼ";
    case "パ":
      return "ぱ";
    case "ピ":
      return "ぴ";
    case "プ":
      return "ぷ";
    case "ペ":
      return "ぺ";
    case "ポ":
      return "ぽ";

    case "ぁ":
    case "ァ":
      return "あ";
    case "ぃ":
    case "ィ":
      return "い";
    case "ぅ":
    case "ゥ":
      return "う";
    case "ぇ":
    case "ェ":
      return "え";
    case "ぉ":
    case "ォ":
      return "お";

    case "ゃ":
    case "ャ":
      return "や";
    case "ゅ":
    case "ュ":
      return "ゆ";
    case "ょ":
    case "ョ":
      return "よ";

    default:
      return kana;
  }
};
