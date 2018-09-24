const Botgram = require("botgram");
const config = require("./config");
const Telegraf = require('telegraf')
if (!config.botToken) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Telegraf(config.botToken);
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.pretul((ctx) => ctx.reply('./commands/price'))
bot.command("pretul", require("./commands/price"));
bot.command("exchanges", require("./commands/providers"));
bot.command("eth", require("./commands/eth"));
bot.command("help", "start", require("./commands/help"));
bot.startPolling()