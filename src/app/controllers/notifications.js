const sendWhisper = require('../../twitchService/commands/sendWhisper');

module.exports = (app) => {
  app.post('/notifications/push-notifications', (req, res) => {
    const { nick, code } = req.body;

    if (!nick || !code) return res.status(400).send({ errors: ['Invalid format'] });

    sendWhisper(nick, `Seu código de verificação do Discord é ${code}`);

    return res.status(200).json({
      msg: 'Whisper sent',
      nick,
      code,
    });
  });
};
