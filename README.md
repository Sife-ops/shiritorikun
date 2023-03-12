<h1 align="center">
  <img src="document/image/stk.png" height="100" width="100" alt="Icon" />
  <br />
  しりとりくん
  <br />
</h1>

<!-- <div align="center">
  <a href="https://github.com/younesaassila/ttv-lol-pro/issues">
    <img
      alt="GitHub issues"
      src="https://img.shields.io/github/issues/younesaassila/ttv-lol-pro"
    />
  </a>
  <a href="https://github.com/younesaassila/ttv-lol-pro/stargazers">
    <img
      alt="GitHub stars"
      src="https://img.shields.io/github/stars/younesaassila/ttv-lol-pro"
    />
  </a>
  <a href="https://github.com/younesaassila/ttv-lol-pro/releases">
    <img
      alt="GitHub all releases"
      src="https://img.shields.io/github/downloads/younesaassila/ttv-lol-pro/total"
    />
  </a>
</div> -->

## Screenshot

<div align="center">
  <img src="document/image/stk_screenshot_00.png" />
</div>

## What it is

It's [shiritori](https://ja.wikipedia.org/wiki/%E3%81%97%E3%82%8A%E3%81%A8%E3%82%8A) for Discord.

## How to use

[Invite](https://discord.com/api/oauth2/authorize?client_id=1083706973813477448&permissions=2147502080&scope=bot%20applications.commands) しりとりくん to your server (link). Use the `/channel` command in a channel that you wish to use for playing. Use the `/shiritori` command to add words. Use `/language` to change the language (default is Japanese because shiritori is a Japanese game and playing Japanese games in English is cringe).

## How it works

しりとりくん implements a minimal webscraper for [goo辞書](https://dictionary.goo.ne.jp/) to look up words submitted by users. It doesn't collect or save any user info! Only the [hash](https://en.wikipedia.org/wiki/Hash_function) of a user's Discord ID is stored in the database for the purpose of game mechanics.

## Planned features

- Global server ranking/leaderboard (opt-in)
