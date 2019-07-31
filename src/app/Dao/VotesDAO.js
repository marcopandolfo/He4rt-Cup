/* eslint-disable no-underscore-dangle */
function VotesDAO(connection) {
  this._connection = connection;
}

VotesDAO.prototype.incrementVotes = function incrementVote(team, gameId) {
  return new Promise((resolve, reject) => {
    const aux = `${team}_votes`;
    this._connection.query(`UPDATE game SET ${aux} = ${aux} + 1  WHERE game_id = ?`, [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

VotesDAO.prototype.getVotes = function getVotes(gameId) {
  return new Promise((resolve, reject) => {
    this._connection.query('SELECT red_votes, blue_votes from game WHERE game_id = ?', [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result[0]);
    });
  });
};

VotesDAO.prototype.savePlayerVote = function savePlayerVote(gameId, nick, amount, team) {
  return new Promise((resolve, reject) => {
    this._connection.query('INSERT INTO votes (game_id, nick, amount, team) VALUES (?, ?, ?, ?)', [gameId, nick, amount, team], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

// eslint-disable-next-line func-names
module.exports = function () {
  return VotesDAO;
};
