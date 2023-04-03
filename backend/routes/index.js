var express = require('express');
var router = express.Router();
require('dotenv').config();
const mysql = require('mysql');

const DATABASE_NAME = 'notesdb'
const USERNAME_TABLE = 'users'

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`, function (err, result) {
    if (err) throw err;
      
    if(result.warningCount = 0) {
      console.log("Database created");
    } else {
      console.log("Database found");
    }
    con.changeUser({database : DATABASE_NAME}, function(err) {
      if (err) throw err;
      var sql = `CREATE TABLE IF NOT EXISTS ${USERNAME_TABLE} (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(32), password VARCHAR(32))`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
      })
    });
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
