var express = require('express');
var router = express.Router();
var db = require('../databaseFunctions');
const mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "notesdb"
});



router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', async function (req, res) {

  const user = {
    username: req.body.username,
    password: req.body.password
  }
  var sql = `SELECT * FROM users WHERE username = ${mysql.escape(user.username)}`;
  con.query(sql, function (err, result) {
    if (result.length > 0) {
      res.send({success: false, user: user.username})
    } else {
    sql = `INSERT INTO users (username, password) VALUES ('${mysql.escape(user.username)}', '${mysql.escape(user.password)}')`;
  
    con.query(sql, function (err) {
      if (err) throw err;
      console.log("Added " + user.username);
      res.send({success: true, user: user.username});
    });
    };
  });
  
});

router.get('/all', async function (req, res) {
    sql = `SELECT * FROM users`;
  con.query(sql, function (err,result) {
    if (err) throw err;
    res.send(result);
  });
      
})

module.exports = router;
