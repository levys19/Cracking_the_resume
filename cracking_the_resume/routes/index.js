var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var passport = require('passport');
var local_strategy = require('passport-local').Strategy;
var User = require('../Models/user');

//in ejs
//<!-- <h2> <%=user.UserName%></h2> -->


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('homepage.ejs', { title: 'home page',UsernameError:req.flash('UsernameError'), PasswordError:req.flash('PasswordError')});
});

//Create a local strategy using passport every time a user needs to log in to page
passport.use('local.login',new local_strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password,done) {

    //Find the user in the database
    User.findOne({'UserName': username}, function(err, user) {

        if(err) {
            throw err;
            return done(err);
        }
        //if User does not exists return done
        if(!user) {
            req.flash('UsernameError', 'Username is not found');
            //if username does not exist
            //req.flash('loginError', 'User Name is not Found');
            return done(null, false);
        }

        if(!User.checkValidPassword(req.body.password, user)){
            req.flash('PasswordError', 'Password is invalid');
            return done(null, false);
        }
        //if everything is okay return the user.
        return done(null, user);

    })

}));

//from passport documentation
passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/',
    passport.authenticate('local.login',
        {successRedirect: 'split',
        failureRedirect: '/',
        failureFlash: true}
    ));

//Only go the split page if you have access granted.
router.get('/split', isLoggedIn, function(req, res, next) {
    res.render('split', { title: 'Split page', user: req.user});

});


//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//Passport supports this function which allows only the users to log in
function isLoggedIn(req,res, next) {
    if(req.isAuthenticated()) {
        //if user is logged in go to the next route
        return next();
    }
    res.redirect('/');
}

module.exports = router;
