var express = require("express");
var router = express.Router();
var mysql = require("mysql");


router.get("/delete/:id", (req, res, next) => {
   var conn = mysql.createConnection({
    host: "logo2.c8v6vdi8dcei.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "myDB",
  });

var id = req.params.id;
  id = parseInt(id);

  if (isNaN(id)) res.send("\r\nPlease enter an integer for the ID value.\r\n");
  else {
    conn.connect((err) => {
      if (err) throw err;
      sql = "DELETE FROM baji WHERE id ='" + id + "'";
      var rows;
      conn.query(sql, (err, result) => {
        if (err) res.send("\r\n There is no record with that value !\r\n");
        res.send("\r\n Record " + id + " has been deleted.\r\n");
      });
    });
  }
});



router.get("/delete", (req, res, next) => {
   var conn = mysql.createConnection({
    host: "logo2.c8v6vdi8dcei.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "myDB",
  });




  conn.connect((err) => {
    if (err) throw err;
    sql = "DELETE FROM baji";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send("\r\n All your record are belong to us !\r\n");
    });
  });
});

router.get("/:id", function (req, res, next) {
  var conn = mysql.createConnection({
    host: "logo2.c8v6vdi8dcei.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "myDB",
  });

var id = req.params.id;
id = parseInt(id);
console.log(id);

if (isNaN(id)) res.send("\r\nPlease enter an integer for the ID value.\r\n");
else {
    conn.connect((err) => {
      if (err) throw err;
      sql = "SELECT * FROM baji WHERE id = '" + id + "'";
      var rows;
      conn.query(sql, (err, result) => {
        if (err) throw err;

        if (result != "") {
          rows = JSON.parse(JSON.stringify(result[result.length - 1]));

          /* postTitle = rows['title'];
      postBody = rows['author']; */
          res.send(
            "\r\n" + id + ": " + rows["title"] + " " + rows["author"] + "\r\n"
          );
        } else res.send("\r\n Can't find this ID in our database. So sorry ! \r\n");
      });
    });
  }
});




router.get("/", function (req, res, next) {
   var conn = mysql.createConnection({
    host: "logo2.c8v6vdi8dcei.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "myDB",
  });

conn.connect((err) => {
    if (err) throw err;
    sql = "SELECT * FROM baji";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;

      if (result != "") {
        rows = JSON.parse(JSON.stringify(result[result.length - 1]));

        res.send(
          "\r\nThe latest entry in the database is as follows:\r\n" +
            rows["id"] +
            ": " +
            rows["title"] +
            " " +
            rows["author"] +
            "\r\n"
        );
      } else res.send("\r\nThere are no data--yes, data is a plural word--in the database.  \r\n");
    });
  });
});


router.post("/", (req, res, next) => {
   var conn = mysql.createConnection({
    host: "logo2.c8v6vdi8dcei.us-east-2.rds.amazonaws.com",
    user: "logo2",
    password: "logologo",
    database: "myDB",
  });

conn.connect((err)=>{
  if (err) throw err + "\r\n Nope!";
    var sql =
      'INSERT INTO baji(title, author) VALUES("' +
      req.body.title +
      '","' +
      req.body.author +
      '")';
    conn.query(sql, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted");
    });

    sql =
      "SELECT * FROM baji WHERE title = '" +
      req.body.title +
      "' AND author = '" +
      req.body.author +
      "'";
    var rows;
    conn.query(sql, (err, result) => {
      if (err) throw err;

      rows = JSON.parse(JSON.stringify(result[result.length - 1]));

      res.send("\r\n Record inserted for ID: " + rows["id"] + "\r\n");
    });
  });
});

module.exports = router;
