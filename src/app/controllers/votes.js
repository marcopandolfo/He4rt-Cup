/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
module.exports = (app) => {
  const getVotesDao = () => {
    const connection = app.infra.connectionFactory();
    return new app.Dao.VotesDAO(connection);
  };

  // POST
  app.post('/votes', async (req, res) => {
    const { nick, team, amount, game_id } = req.body;

    // TODO: validate
    await getVotesDao().incrementVotes(team, game_id);
    getVotesDao().savePlayerVote(game_id, nick, amount, team);
    const votes = await getVotesDao().getVotes(game_id);
    votes.game_id = game_id;

    return res.status(201).json(votes);
  });

  // GET
  app.get('/votes/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const votes = await getVotesDao().getVotes(gameId);

    return res.status(200).json(votes);
  });

  // GET
  app.get('/votes/players/:gameId', (req, res) => {
    const { gameId } = req.params;

    getVotesDao()
      .getPlayersVotes(gameId)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json(err));
  });
};