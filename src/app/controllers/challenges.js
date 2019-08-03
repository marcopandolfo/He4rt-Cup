/* eslint-disable camelcase */
module.exports = (app) => {
  const connection = app.infra.connectionFactory();
  const challengesDao = new app.Dao.ChallengesDAO(connection);

  app.post('/challenges/title', (req, res) => {
    const { challenge_title, game_id } = req.body;

    challengesDao
      .setTitle(game_id, challenge_title)
      .then(() => res.status(200).send())
      .catch(err => res.status(400).json(err));
  });
};
