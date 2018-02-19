var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('formpage', { title: 'signup page' });
});
module.exports = router;
