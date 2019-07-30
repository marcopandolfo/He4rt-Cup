const tmi = require('tmi.js');

const client = new tmi.Client({
  options: {
    debug: JSON.parse(process.env.npm_config_argv).original[1] === 'dev',
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'he4rtdevs',
    password: process.env.TWITCH_TOKEN,
  },
});

client.on('connected', () => {
  console.log('> Twitch Connected');
});
client.connect();

module.exports = client;
