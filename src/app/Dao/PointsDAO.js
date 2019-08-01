/* eslint-disable no-underscore-dangle */
function PointsDAO(connection) {
  this._connection = connection;
}

PointsDAO.prototype.incrementPoints = function incrementPoints(team, gameId) {
  return new Promise((resolve, reject) => {
    const aux = `${team}_points`;
    this._connection.query(`UPDATE game SET ${aux} = ${aux} + 1  WHERE game_id = ?`, [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

PointsDAO.prototype.getPoints = function getPoints(gameId) {
  console.log(gameId);

  return new Promise((resolve, reject) => {
    this._connection.query('SELECT blue_points, red_points FROM game WHERE game_id = ?', [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result[0]);
    });
  });
};

// eslint-disable-next-line func-names
module.exports = function () {
  return PointsDAO;
};
