/* eslint-disable camelcase */
const Game = require('../models/game');

module.exports = (app) => {
  const getGameDao = () => {
    const connection = app.infra.connectionFactory();
    return new app.Dao.GameDAO(connection);
  };


  // POST: Create new Game
  app.post('/game/create', (req, res) => {
    req.body.state = 'waiting';
    // TODO: validate

    const game = new Game(req.body);
    getGameDao()
      .create(game)
      .then(() => res.status(201).json(game))
      .catch(err => res.status(400).json(err));
  });

  // PUT: Att Description
  app.put('/game/description', (req, res) => {
    const { game_id, description } = req.body;

    // TOOD: validate
    getGameDao()
      .updateDescription(description, game_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });

  app.post('/game/updatePlayer', (req, res) => {
    const {
      game_id,
      team, lang,
      player,
    } = req.body;

    // TOOD: validate

    getGameDao()
      .updatePlayer(game_id, team, lang, player)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });

  app.post('/game/updateState', (req, res) => {
    const { game_id, state } = req.body;

    // TOOD: validate
    getGameDao()
      .updateState(game_id, state)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));

  });
};
