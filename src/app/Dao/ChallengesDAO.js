/* eslint-disable no-underscore-dangle */
function challengeDAO(connection) {
  this._connection = connection;
}

challengeDAO.prototype.create = function create(gameId) {
  return new Promise((resolve, reject) => {
    this._connection.query('INSERT INTO challenges (game_id) VALUES (?)', [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

challengeDAO.prototype.setTitle = function setTitle(gameId, title) {
  return new Promise((resolve, reject) => {
    this._connection.query('UPDATE challenges SET challenge_title = ? WHERE game_id = ?', [title, gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

// eslint-disable-next-line func-names
module.exports = function () {
  return challengeDAO;
};
