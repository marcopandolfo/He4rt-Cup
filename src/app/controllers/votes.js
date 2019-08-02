/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
module.exports = (app) => {
  const connection = app.infra.connectionFactory();
  const votesDao = new app.Dao.VotesDAO(connection);

  // POST
  app.post('/votes', async (req, res) => {
    const { nick, team, amount, game_id } = req.body;

    // TODO: validate
    await votesDao.incrementVotes(team, game_id);
    votesDao.savePlayerVote(game_id, nick, amount, team);
    const votes = await votesDao.getVotes(game_id);
    votes.game_id = game_id;

    return res.status(201).json(votes);
  });

  // GET
  app.get('/votes/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const votes = await votesDao.getVotes(gameId);

    return res.status(200).json(votes);
  });

  // GET
  app.get('/votes/players/:gameId', (req, res) => {
    const { gameId } = req.params;

    votesDao
      .getPlayersVotes(gameId)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json(err));
  });
};
