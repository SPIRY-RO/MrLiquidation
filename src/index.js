const Botgram = require("botgram");
const config = require("./config");
const Telegraf = require('telegraf')

if (!config.botToken) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Telegraf(config.botToken);

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))
