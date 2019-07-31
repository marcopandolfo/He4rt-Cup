/* eslint-disable object-curly-newline */
module.exports = (app) => {
  const getVotesDao = () => {
    const connection = app.infra.connectionFactory();
    return new app.Dao.VotesDAO(connection);
  };

  app.post('/votes', async (req, res) => {
    const { nick, team, amount, gameId } = req.body;

    // TODO: validate
    getVotesDao().incrementVotes(team, gameId);
    getVotesDao().savePlayerVote(gameId, nick, amount, team);
    const votes = await getVotesDao().getVotes(gameId);

    return res.status(201).json(votes);
  });

  app.get('/votes/:gameId', async (req, res) => {
    const { gameId } = req.body.params;
    const votes = await getVotesDao().getVotes(gameId);

    return res.status(200).json(votes);
  });
};
