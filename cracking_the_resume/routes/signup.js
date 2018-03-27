var express = require('express');
var router = express.Router();

var User = require('../Models/user');


router.get('/', function(req, res, next) {
  res.render('signUp.ejs', { title: 'signup page', user:req.user});
});


module.exports = router;