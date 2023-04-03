require('dotenv').config();
const mysql = require('mysql');

const DATABASE_NAME = 'notesdb';
const USERNAME_TABLE = 'users';
const DOCUMENT_TABLE = 'documents';
const DOCUMENT_OWNER_TABLE = 'user_documents'

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
        var sql = `CREATE TABLE IF NOT EXISTS ${USERNAME_TABLE} (userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(32), password VARCHAR(32))`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`Table ${USERNAME_TABLE} is running!`);
        });
        sql = `CREATE TABLE IF NOT EXISTS ${DOCUMENT_TABLE} (documentID INT AUTO_INCREMENT PRIMARY KEY, content TEXT(65535),userID INT, CONSTRAINT authorID FOREIGN KEY (userID) REFERENCES users(userID))`
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`Table ${DOCUMENT_TABLE} is running!`);
        });
        
      });
    });
  });
}







module.exports = { startDatabase }