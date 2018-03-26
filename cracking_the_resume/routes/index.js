var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage.ejs', { title: 'home page' });
});
module.exports = router;
