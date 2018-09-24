const Botgram = require("botgram");
const config = require("./config");
if (!config.botToken) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Botgram(config.botToken);

bot.command("pretul", require("./commands/price"));
bot.command("exchanges", require("./commands/providers"));
bot.command("eth", require("./commands/eth"));
bot.command("help", "start", require("./commands/help"));
bot.command("ceasul", function ( reply ) {
  reply.text("Orologiu arata: " + Date());
});
