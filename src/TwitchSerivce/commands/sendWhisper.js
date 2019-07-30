const client = require('../index');

module.exports = (nick, msg) => {
  client.whisper(nick, msg)
    .catch(() => {
      console.log(`Não foi possivel enviar whipser para o usuario ${nick}`);
    });
};
