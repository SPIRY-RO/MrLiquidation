const Botgram = require("botgram");
const config = require("./config");
if (!config.botToken) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Botgram(config.botToken);
bot.command("salut", (msg, reply) =>reply.text("Salut, ce faci?"));
bot.command("pretul", require("./commands/price"));
bot.command("exchanges", require("./commands/providers"));
bot.command("eth", require("./commands/eth"));
bot.command("help", "start", require("./commands/help"));
bot.command("time", function (msg, reply, next) {
  reply.text("The current time is: " + Date());
});
