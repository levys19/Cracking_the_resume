var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'signup page' });
});

router.post('/', function(req,res, next) {
    var firstname = req.body.firstName;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var major = req.body.major;
    var city = req.body.city;
    var password = req.body.password;
    console.log(firstname);
});


module.exports = router;
