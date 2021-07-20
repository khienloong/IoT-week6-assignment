var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'default title', body: 'default body' });
});

router.post('/', (req, res, next) =>{
  console.log(req.body.title);
  console.log(req.body.body);
  res.render('index', { title: 'got it', body: 'aww yeah'});
});

module.exports = router;