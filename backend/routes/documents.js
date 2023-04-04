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

router.post('/author/:id', async function (req, res) {

    var sql = `SELECT * FROM documents WHERE authorId = ${mysql.escape(req.params.id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});

router.post('/doc/:id', async function (req, res) {

    var sql = `SELECT * FROM documents WHERE documentID = ${mysql.escape(req.params.id)}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});

router.post('/new', async function (req, res) {
    doc = {
        authorId: req.body.authorId,
        content: req.body.content
    };
    sql = `INSERT INTO documents (authorID, content) VALUES (${mysql.escape(doc.authorId)}, ${mysql.escape(doc.content)})`;
  
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Created document with id ${result.insertId} for userId ${doc.authorId}`);
        res.send({ success: true, documentId: result.insertId });
    });

})


module.exports = router;
