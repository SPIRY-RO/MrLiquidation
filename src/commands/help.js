

const HELP_TEXT = '<b>Eu sunt Domnul 🎩 Lichidare</b>\n' +
  "\n" +
  "<b>💰Pentru preturi live:</b>\n" +
  "/pretul [BASE] [QUOTE]\n" +
  "<b>💹Lista de exchange-uri care le support:</b>\n" +
  "/exchanges \n" +
  "<b>☑Daca esti baiat bun, iti pot verifica si balanta pe Ethereum.</b>\n" +
  "/eth \n" +
  "<b>⏰Ba chiar iti pot spune cat e ceasul si in ce data suntem.</b>\n" +
  "/ceasul \n" +
  "<b>Mai multe comenzii soon.🛫 </b>\n" +
  "<b>Eu Domnul🎩 Lichidare va stau la dispozitie!</b>\n" +
  "/help - lista comenziilor mele\n";
 

const handler = (msg, reply) => {
  reply.html(HELP_TEXT);
};

module.exports = handler;
