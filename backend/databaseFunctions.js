require('dotenv').config();
const mysql = require('mysql');

const DATABASE_NAME = 'notesdb';
const USERNAME_TABLE = 'users';
const DOCUMENT_TABLE = 'documents';
const SESSION_TABLE = 'sessions'

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});
function startDatabase(){
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`, function (err, result) {
      if (err) throw err;
      
      if (result.warningCount = 0) {
        console.log("Database created");
      } else {
        console.log("Database found");
      }
      con.changeUser({ database: DATABASE_NAME }, function (err) {
        if (err) throw err;
        var sql = `CREATE TABLE IF NOT EXISTS ${USERNAME_TABLE} (userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(32) UNIQUE KEY, password VARCHAR(32))`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`Table ${USERNAME_TABLE} is running!`);
        });
        sql = `CREATE TABLE IF NOT EXISTS ${DOCUMENT_TABLE} 
        (
          documentID INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(128),
          description VARCHAR(255),
          content TEXT(65535),
          authorID INT NOT NULL DEFAULT '0'
        )`
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`Table ${DOCUMENT_TABLE} is running!`);
        });
        sql = `CREATE TABLE IF NOT EXISTS ${SESSION_TABLE} 
        (
          sessionID INT AUTO_INCREMENT PRIMARY KEY,
          sessionKey VARCHAR(128) NOT NULL,
          active BOOLEAN DEFAULT true,
          userID INT NOT NULL
        )`
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`Table ${SESSION_TABLE} is running!`);
        });
      });
    });
  });
}







module.exports = { startDatabase }