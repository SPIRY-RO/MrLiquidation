const HELP_TEXT = "<b>Eu sunt Domnul Lichidare.\n" +
  "<b>Pentru preturi live:</b>\n"; +
  "/price [BASE] [QUOTE]\n" +
  "/providers - see the list of supported exchanges\n" +
  "/eth - ethereum web3 functions (advanced users only). Geth node provided by INFURA\n" +
  "/help - see the list of commands\n";
 

const handler = (msg, reply) => {
  reply.html(HELP_TEXT);
};

module.exports = handler;
