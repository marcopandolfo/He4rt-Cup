const createTables = (connection) => {
  connection.query(`
  CREATE TABLE IF NOT EXISTS game (
    id int(10) NOT NULL auto_increment,
    blue_votes int(48) NOT NULL,
    red_votes int(48) NOT NULL,
    PRIMARY KEY( id )
  );
  CREATE TABLE IF NOT EXISTS votes (
    id int(10) NOT NULL auto_increment,
    game_id int(48) NOT NULL,
    nick VARCHAR(256) NOT NULL,
    amount DOUBLE NOT NULL,
    team VARCHAR(48) NOT NULL,
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
