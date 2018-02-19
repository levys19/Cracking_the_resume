var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// gets the signup page
router.get('/signup', function(req, res, next) {
  res.render('formpage', { title: 'Express' });
});
module.exports = router;
