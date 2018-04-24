var express = require('express');
var router = express.Router();
var User = require('../Models/user');
var logIn = require("../logIn");

//Restrict users to the settings page with isLoggedIn
router.get('/', logIn.isLoggedIn, function(req, res, next) {
    res.render('settings.ejs', { title: 'Settings page'});
});

//Post Request to get the new Password from the User
router.post('/', function(req, res, next) {
    res.render('settings.ejs', {title: 'Settings page', user: req.user});
    console.log("Inside the post request")
    console.log(req.body.newPassword)

    new_pass = User.hashPassword(req.body.newPassword);
    console.log(new_pass)

    User.update({'UserName': req.user.UserName}, {$set: {Password:new_pass}},function(err, user) {
        if(err) {
            console.log("Couldn't update entry")
        }
        else {
            console.log("Updated Password, printing user from update")
            console.log(user)
        }

        return user;

    })

});
module.exports = router;
