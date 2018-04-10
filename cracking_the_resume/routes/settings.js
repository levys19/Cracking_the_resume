var express = require('express');
var router = express.Router();
var User = require('../Models/user');
var logIn = require("../logIn");

router.get('/', logIn.isLoggedIn, function(req, res, next) {
    res.render('settings.ejs', { title: 'Settings page'});
});

//Post Request to get the new Password from the User
router.post('/', function(req, res, next) {
    res.render('settings.ejs', {title: 'Settings page', user: req.user});
    //Here is the new password that the user inputted.
    console.log(req.body.newPassword)

    //Fill in your query and update new password here


});

module.exports = router;
