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
    if (err) throw err;
    console.log(result.length);
    if (result.length > 0) {
      res.status(400).send({success: false, user: user.username})
    } else {
    sql = `INSERT INTO users (username, password) VALUES (${mysql.escape(user.username)}, ${mysql.escape(user.password)})`;
  
    con.query(sql, function (err) {
      if (err) throw err;
      console.log("Added " + user.username);
      res.status(200).send({success: true, user: user.username});
    });
    };
  });
  
});

router.post('/login', async function (req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  sql = `SELECT * FROM users WHERE username = ${mysql.escape(req.body.username)}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);

    if (result.length < 1) {
      console.log("failed login");
      res.status(401).send({ loginSuccessful: false, id: null });
    } else if (result[0].password == user.password) {
      res.status(200).send({ loginSuccessful: true, id: result[0].userID });
    } else {
      res.status(401).send({ loginSuccessful: false, id: null });
    }
  })

});

router.get('/all', async function (req, res) {
  sql = `SELECT * FROM users`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
      
});

module.exports = router;
