const Game = require('../models/game');

module.exports = (app) => {
  const getGameDao = () => {
    const connection = app.infra.connectionFactory();
    return new app.Dao.GameDAO(connection);
  };


  app.post('/game/create', (req, res) => {
    req.body.state = 'waiting';
    // TODO: validate

    const game = new Game(req.body);
    getGameDao()
      .create(game)
      .then(() => res.status(201).json(game))
      .catch(err => res.status(400).json(err));
  });
};
