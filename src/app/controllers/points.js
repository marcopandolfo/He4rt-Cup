/* eslint-disable camelcase */
module.exports = (app) => {
  const connection = app.infra.connectionFactory();
  const pointsDao = new app.Dao.PointsDAO(connection);

  app.post('/points', async (req, res) => {
    const { game_id, team } = req.body;

    // TODO: validate
    await pointsDao.incrementPoints(team, game_id);
    const points = await pointsDao.getPoints(game_id);

    points.game_id = game_id;
    return res.status(200).json(points);
  });

  app.get('/points/:gameId', (req, res) => {
    const { gameId } = req.params;

    // TODO: validate

    pointsDao
      .getPoints(gameId)
      .then(points => res.status(200).json(points))
      .catch(err => res.status(400).json(err));
  });
};
