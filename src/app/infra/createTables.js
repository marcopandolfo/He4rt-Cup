const createTables = (connection) => {
  connection.query(`
  CREATE TABLE IF NOT EXISTS game (
    game_id INT(48) NOT NULL auto_increment,
    state VARCHAR(48) NOT NULL,
    player_css_red VARCHAR(256) NOT NULL,
    player_css_blue VARCHAR(256) NOT NULL,
    player_html_red VARCHAR(256) NOT NULL,
    player_html_blue VARCHAR(256) NOT NULL,
    player_js_red VARCHAR(256) NOT NULL,
    player_js_blue VARCHAR(256) NOT NULL,
    description VARCHAR(428) NOT NULL,
    blue_votes int(48) DEFAULT 0,
    red_votes int(48) DEFAULT 0,
    blue_points INT(48) DEFAULT 0,
    red_points INT(48) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    timer TIME NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY( game_id )
  );

  CREATE TABLE IF NOT EXISTS votes (
    id int(10) NOT NULL auto_increment,
    game_id int(48) NOT NULL,
    nick VARCHAR(256) NOT NULL,
    amount DOUBLE NOT NULL,
    team VARCHAR(48) NOT NULL,
    PRIMARY KEY( id )
  );

  CREATE TABLE IF NOT EXISTS challenges (
    id int(10) NOT NULL auto_increment,
    game_id int(48) NOT NULL,
    challenge_title VARCHAR(256) DEFAULT 'none',
    challenge_1 VARCHAR(256) DEFAULT 'none',
    challenge_2 VARCHAR(256) DEFAULT 'none',
    challenge_3 VARCHAR(256) DEFAULT 'none',
    challenge_1_checked_red BOOL DEFAULT false,
    challenge_2_checked_red BOOL DEFAULT false,
    challenge_3_checked_red BOOL DEFAULT false,
    challenge_1_checked_blue BOOL DEFAULT false,
    challenge_2_checked_blue BOOL DEFAULT false,
    challenge_3_checked_blue BOOL DEFAULT false,
    PRIMARY KEY( id )
  );
  `, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Auto-create mysql tables OK');
  });
};

module.exports = () => createTables;
