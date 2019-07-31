/* eslint-disable no-underscore-dangle */
function GameDAO(connection) {
  this._connection = connection;
}

GameDAO.prototype.create = function create(game) {
  return new Promise((resolve, reject) => {
    this._connection.query(`
    INSERT INTO game
    (game_id, state, player_css_blue, player_css_red, player_html_blue, player_html_red, player_js_blue, player_js_red, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [game.gameId, game.state, game.playerCSSBlue, game.playerCSSRed,
      game.playerHTMLBlue, game.playerHTMLRed, game.playerJSBlue,
      game.playerJSRed, game.description],
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

// eslint-disable-next-line func-names
module.exports = function () {
  return GameDAO;
};
