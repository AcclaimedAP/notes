var express = require('express');
var router = express.Router();
var db = require('../databaseFunctions');
const mysql = require('mysql');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

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
  con.query(sql, async function (err, result) {
    if (err) throw err;
    console.log(result);

    if (result.length < 1) {
      console.log("failed login");
      res.status(401).send({ loginSuccessful: false, id: null });
    } else if (result[0].password == user.password) {
        const uuid = uuidv4();
        sql = `INSERT INTO sessions (sessionKey,userID) VALUES (${mysql.escape(uuid)}, ${mysql.escape(result[0].userID)})`;
  
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`new session ${result.insertId} for userId ${result.userID} with key ${uuid}`);
          
          res.status(200).send({ loginSuccessful: true, sessionKey: uuid });
          
    });
      
    } else {
      res.status(401).send({ loginSuccessful: false, id: null });
    }
  })

});

router.post('/logout', function (req, res) {
  var sql = `UPDATE sessions SET active = false WHERE sessionKey = ${mysql.escape(req.body.sessionKey)}`;
  
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({ loggedOut: true });
    });
});


router.get('/all', async function (req, res) {
  sql = `SELECT * FROM users`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
      
});

module.exports = router;
