/* eslint-disable camelcase */
const Game = require('../models/game');

module.exports = (app) => {
  const connection = app.infra.connectionFactory();
  const gameDao = new app.Dao.GameDAO(connection);
  const challengesDao = new app.Dao.ChallengesDAO(connection);


  // POST: Create new Game
  app.post('/game/create', (req, res) => {
    req.body.state = 'waiting';
    // TODO: validate

    const game = new Game(req.body);
    gameDao
      .create(game)
      .then((result) => {
        challengesDao.create(result.insertId);
        return res.status(201).json({ game_id: result.insertId });
      })
      .catch(err => res.status(400).json(err));
  });

  // PUT: Att Description
  app.put('/game/description', (req, res) => {
    const { game_id, description } = req.body;

    // TOOD: validate
    gameDao
      .updateDescription(description, game_id)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });

  app.put('/game/updatePlayer', (req, res) => {
    const {
      game_id,
      team, lang,
      player,
    } = req.body;

    // TOOD: validate

    gameDao
      .updatePlayer(game_id, team, lang, player)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });

  // GET
  app.get('/game/:gameId', (req, res) => {
    const { gameId } = req.params;

    gameDao
      .getGame(gameId)
      .then((game) => {
        console.log('[GET GAME]');
        return res.status(200).json(game);
      })
      .catch(err => res.status(400).json(err));
  });

  app.put('/game/updateState', (req, res) => {
    const { game_id, state } = req.body;

    // TOOD: validate
    gameDao
      .updateState(game_id, state)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });
};
