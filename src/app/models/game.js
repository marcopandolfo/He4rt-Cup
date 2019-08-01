class Game {
  constructor(body) {
    this.state = body.state;
    this.description = body.description;
    this.blueVotes = '';
    this.redVotes = '';

    // Players
    this.playerCSSRed = body.player_css_red;
    this.playerCSSBlue = body.player_css_blue;

    this.playerHTMLRed = body.player_html_red;
    this.playerHTMLBlue = body.player_html_blue;

    this.playerJSRed = body.player_js_red;
    this.playerJSBlue = body.player_js_blue;
  }
}

module.exports = Game;
