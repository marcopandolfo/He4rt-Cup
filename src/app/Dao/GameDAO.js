/* eslint-disable no-underscore-dangle */
function GameDAO(connection) {
  this._connection = connection;
}

GameDAO.prototype.create = function create(game) {
  return new Promise((resolve, reject) => {
    this._connection.query(`
    INSERT INTO game
    (state, player_css_blue, player_css_red, player_html_blue, player_html_red, player_js_blue, player_js_red, description, timer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [game.state, game.playerCSSBlue, game.playerCSSRed,
      game.playerHTMLBlue, game.playerHTMLRed, game.playerJSBlue,
      game.playerJSRed, game.description, game.timer],
    (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

GameDAO.prototype.updateDescription = function updateDescription(description, gameId) {
  return new Promise((resolve, reject) => {
    this._connection.query('UPDATE game SET description = ? WHERE game_id = ?', [description, gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

GameDAO.prototype.updatePlayer = function updatePlayer(gameId, team, lang, player) {
  return new Promise((resolve, reject) => {
    this._connection.query(`UPDATE game SET player_${lang}_${team} = ? WHERE game_id = ?`, [player, gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

GameDAO.prototype.updateState = function updateState(gameId, state) {
  return new Promise((resolve, reject) => {
    this._connection.query('UPDATE game SET state = ? WHERE game_id = ?', [state, gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

GameDAO.prototype.getGame = function getGame(gameId) {
  return new Promise((resolve, reject) => {
    this._connection.query('SELECT * FROM game WHERE game_id = ?', [gameId], (err, result) => {
      if (err) return reject(err);

      return resolve(result[0]);
    });
  });
};

// eslint-disable-next-line func-names
module.exports = function () {
  return GameDAO;
};
