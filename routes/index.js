var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'default title', body: 'default body' });
});

router.post('/', (req, res, next) =>{
  res.render('index', { title: req.title, body: req.body});
});

module.exports = router;