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
        console.log(rows);
        console.log(rows["title"]);
        /* postTitle = rows['title'];
      postBody = rows['body']; */
        res.render("index", { title: rows["title"], body: rows["body"] });
      } else
        res.render("index", { title: "default title", body: "default body" });
    });
  });
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

    sql = "SELECT * FROM page";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      rows = JSON.parse(JSON.stringify(result[result.length - 1]));
      console.log(rows);
      console.log(rows["title"]);
      /* postTitle = rows['title'];
    postBody = rows['body']; */
      res.render("index", { title: rows["title"], body: rows["body"] });
    });
  });
});

module.exports = router;
