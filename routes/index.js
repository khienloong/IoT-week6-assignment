var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'default title', body: 'default body' });
});

router.post('/', (req, res, next) =>{
  var conn = mysql.createConnection({
    host      : 'logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com',
    user      : 'logo2',
    password  : 'logologo',
    port      : '3306'
  });

  conn.connect((err)=>{
    if(err) throw err;
    var sql = 'INSERT INTO page(title, body) VALUES('+req.body.title+','+req.body.body+')';
    conn.query(sql, (err, result)=>{
      if(err) throw err;
      console.log("1 record inserted");
    });
  });

  sql = 'SELECT * FROM page WHERE id = ( SELECT MAX(id) FROM page )';
  conn.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    var postTitle = result.title;
    var postBody = result.body;
  });
  
  res.render('index', { title: postTitle, body: postBody});
});

module.exports = router;