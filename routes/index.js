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
 
      if (result != "") {
        rows = JSON.parse(JSON.stringify(result[result.length - 1]));

        res.send("\r\nThe latest entry in the DB is:\r\n" +rows["id"] + ": " + rows["title"] + " " + rows["body"]+"\r\n");
      } else res.send("\r\nThere are no records in DB :( \r\n");
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

  var id = req.params.id;

  console.log("id: " + id);

  if (!isNaN(id) && Number.isInteger(id)) {
    conn.connect((err) => {
      if (err) throw err;
      sql = "SELECT * FROM page WHERE id = '" + id + "'";
      var rows;
      conn.query(sql, (err, result) => {
        if (err) throw err;

        if (result != "") {
          rows = JSON.parse(JSON.stringify(result[result.length - 1]));

          /* postTitle = rows['title'];
        postBody = rows['body']; */
          res.send("\r\n" + id + ": " + rows["title"] + " " + rows["body"]);
        } else res.send("\r\n There's currently no data :(\r\n");
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
      res.send("\r\n All records have been deleted...\r\n");
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

  var id = req.params.id;

  if (!isNaN(id) && Number.isInteger(id)) {
    conn.connect((err) => {
      if (err) throw err;
      sql = "DELETE FROM page WHERE id ='" + id +"'";
      var rows;
      conn.query(sql, (err, result) => {
        if (err) res.send("\r\n There is no record with that value\r\n");
        res.send("\r\n Record " + id + " has been deleted.\r\n");
      });
    });
  } else res.send("\r\n The record value entered must be an integer :( \r\n");
});

router.post("/", (req, res, next) => {
  var conn = mysql.createConnection({
    host: "logo2.cym4s4x6gfpj.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "mydb",
  });

  conn.connect((err) => {
    if (err) throw err + "\r\n awwww crap";
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

    sql =
      "SELECT * FROM page WHERE title = '" +
      req.body.title +
      "' AND body = '" +
      req.body.body + "'";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;

      rows = JSON.parse(JSON.stringify(result[result.length - 1]));

      res.send("\r\n Success! Record inserted for id: " + rows["id"] + "\r\n");
    });
  });
});

module.exports = router;
