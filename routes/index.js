var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });
  conn.connect((err) => {
    if (err) throw err;
    sql = "SELECT * FROM page";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result != "") {
        rows = JSON.parse(JSON.stringify(result[result.length - 1]));
        
        res.send( 
          rows.map(row =>
            `${row['id']}: ${row['title']} ${row['body']}\r\n`
            )

        );
      } else
        res.send("There are no records in DB :( \r\n");
    });
  });
});

router.get("/:id", function (req, res, next) {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });

  const id = req.params.id;

  if (!isNaN(id) && Number.isInteger(id)) {
    conn.connect((err) => {
      if (err) throw err;
      sql = "SELECT * FROM page WHERE id = " + id;
      var rows;
      conn.query(sql, (err, result) => {
        if (err) throw err;
      
        if (result != "") {
          rows = JSON.parse(JSON.stringify(result[result.length - 1]));
          
          /* postTitle = rows['title'];
        postBody = rows['body']; */
          res.send(id + ": " + rows["title"] + " " + rows["body"] );
        } else
          res.send("There's currently no data :(\r\n");
      });
    });
  }
});

router.get("/delete-all", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });

  conn.connect((err) => {
    if (err) throw err;
    sql = "DELETE FROM page";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send("All records have been deleted...\r\n");
    });
  });
});

router.get("/delete/:id", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });

  const id = req.params.id;

  if (!isNaN(id) && Number.isInteger(id)) {
    conn.connect((err) => {
      if (err) throw err;
      sql = "DELETE FROM page WHERE id =" + id;
      var rows;
      conn.query(sql, (err, result) => {
        if (err) res.send("There is no record with that value\r\n");
        res.send("Record " + id + " has been deleted.\r\n");
      });
    });
  } else res.send("The record value entered must be an integer :( \r\n");
});

router.post("/", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });

  conn.connect((err) => {
    if (err) throw err;
    var sql =
      'INSERT INTO page(title, body) VALUES("' +
      req.body.title +
      '","' +
      req.body.body +
      '")';
    conn.query(sql, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted");
    });

    sql = "SELECT * FROM page WEHERE title = " + req.body.title + " AND body = " + req.body.body;
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
     
      rows = JSON.parse(JSON.stringify(result[result.length - 1]));
    
      res.send("Success! Record inserted for id: " + rows['id'] + "\r\n");
    });
  });
});

module.exports = router;
