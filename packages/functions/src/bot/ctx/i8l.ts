import { ShiritoriEntityType } from "@shiritorikun/core/db/entity";

export class I8l {
  shiritori;

  constructor(c: { shiritori: ShiritoriEntityType }) {
    this.shiritori = c.shiritori;
  }

  private isJp(): boolean {
    return this.shiritori.language === "jp";
  }

  unauthorized(name: string, id: string): string {
    return this.isJp()
      ? `</${name}:${id}>は管理者のみ使う事が出来ます。`
      : `You must be an administrator to use </${name}:${id}>.`;
  }

  channelNotSet(): string {
    return this.isJp()
      ? "このチャンネルでしりとりくんを使ってね！ `/channel` で始まるよ！"
      : "Use `/channel` to use this channel for しりとりくん.";
  }

  wrongChannel(channel: string): string {
    return this.isJp()
      ? `<#${channel}>のみにてしりとり遊ぶ事が出来ます。`
      : `You can only play shiritori in <#${channel}>.`;
  }

  notYourTurn(): string {
    return this.isJp()
      ? "次の人の発言のあとに、つづけてね！"
      : "You must wait until the next round.";
  }

  alreadyUsed(word: string): string {
    return this.isJp()
      ? `「${word}」はもう使うことが出来ません。`
      : `「${word}」 has already been used.`;
  }

  cooldown(word: string, reading: string, n: number): string {
    return this.isJp()
      ? `「${word}/${reading}」を使う場合は、${n}回待ってね。`
      : `「${word}/${reading}」 is in cooldown for the next ${n} turns.`;
  }

  language(language: "en" | "jp"): string {
    return language === "jp"
      ? "言語を日本語に設定しました。"
      : "Language has been set to English.";
  }

  leaderboardStatus(status: string): string {
    return this.isJp()
      ? `ランキング参加状況を\`${status}\`に設定しました。`
      : `Leaderboard opt-in status set to \`${status}\`.`;
  }

  channel(channelId: string): string {
    return this.isJp()
      ? `チャンネルを<#${channelId}>に設定しました。`
      : `Channel has been set to <#${channelId}>.`;
  }

  shiritoriBad(word: string): string {
    return this.isJp()
      ? `「${word}」はしりとりではありません!`
      : `「${word}」 is not a shiritori!`;
  }

  shiritoriGet(shiri: string): string {
    const isNWord = shiri === "ん" || shiri === "ン";
    const jp = isNWord
      ? "何でも宜しゅう御座います"
      : `「${shiri}」から初まります`;
    const en = isNWord ? "can use any letter" : `must use「${shiri}」`;

    return this.isJp()
      ? `しりとりゲット! 次の言葉は${jp}。`
      : `Shiritori get! The next word ${en} as the first sound.`;
  }

  shiritoriNotFound(word: string): string {
    return this.isJp()
      ? `「${word}」は辞書に見付かりませんでした!`
      : `「${word}」 could not be found in the dictionary!`;
  }

  infoTitle() {
    return this.isJp() ? "詳細情報" : "Info";
  }

  infoWord() {
    return this.isJp() ? "最新のしりとり" : "Current word";
  }

  infoLength() {
    return this.isJp() ? "しりとりの長さ" : "Shiritori length";
  }

  infoLeaderboard() {
    return this.isJp() ? "ランキング" : "Leaderboard";
  }

  infoLeaderboardValue(b: boolean) {
    return this.isJp() ? (b ? "参加" : "不参加") : b ? "Visible" : "Hidden";
  }

  infoLink() {
    return this.isJp() ? "ランキングURL" : "Leaderboard URL";
  }
}
