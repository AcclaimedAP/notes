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


router.get('/all', async function (req, res) {
  sql = `SELECT * FROM documents`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
      
});

router.post('/author', async function (req, res) {
  var sql = `SELECT * FROM sessions WHERE sessionKey = ${mysql.escape(req.body.sessionKey)}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result[0].active == 1) {
    
      var sql = `SELECT * FROM documents WHERE authorId = ${mysql.escape(result[0].userID)}`;
      con.query(sql, function (err, results) {
        if (err) throw err;
        res.status(200).send(results);
      });
    } else {
      res.status(401).send({});
    }
  });
  
});

router.post('/doc/:id', async function (req, res) {
    console.log(req.params.id);
    var sql = `SELECT * FROM documents WHERE documentID = ${mysql.escape(req.params.id)}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
        res.send(result);
    })
});

router.post('/edit', async function (req, res) {
  
  doc = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content
  };
  console.log(doc);
    sql = `UPDATE documents SET title = ${mysql.escape(doc.title)}, description = ${mysql.escape(doc.description)}, content = ${mysql.escape(doc.content)} WHERE documentID = ${mysql.escape(doc.id)}`;
  
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Updated document with id ${result.insertId}`);
        res.send({ success: true, documentId: result.insertId });
    });

})

router.post('/new', async function (req, res) {
    var sql = `SELECT * FROM sessions WHERE sessionKey = ${mysql.escape(req.body.sessionKey)}`;
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result[0].active == 1) {
      doc = {
        authorId: result[0].userID,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
      };
      sql = `INSERT INTO documents (authorID, title, description, content) VALUES (${mysql.escape(doc.authorId)},${mysql.escape(doc.title)},${mysql.escape(doc.description)}, ${mysql.escape(doc.content)})`;
  
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Created document with id ${result.insertId} for userId ${doc.authorId}`);
        res.send({ success: true, documentId: result.insertId });
      });
    }
  });
})


module.exports = router;
