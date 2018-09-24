

const HELP_TEXT = '<b>Eu sunt Domnul 🎩 Lichidare</b>\n' +
  "\n" +
  "<b>Pentru preturi live:</b>\n" +
  "/price [BASE] [QUOTE]\n" +
  "<b>Lista de exchange-uri care le support:</b>\n" +
  "/providers - see the list of supported exchanges\n" +
  "<b>Daca esti baiat bun, iti pot verifica si balanta pe Ehtereum.</b>\n" +
  "/eth \n" +
  "<b>Mai multe comenzii soon. Eu Domnul🎩 Lichidare va stau la dispozitie! </b>\n" +
  "/help - see the list of commands\n";
 

const handler = (msg, reply) => {
  reply.html(HELP_TEXT);
};

module.exports = handler;
