/* eslint-disable func-names */
const mysql = require('mysql');


function createDBConnection() {
  return mysql.createConnection({
    multipleStatements: true,
    host: process.env.HOST,
    user: process.env.MB_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  });
}

module.exports = function () {
  return createDBConnection;
};
