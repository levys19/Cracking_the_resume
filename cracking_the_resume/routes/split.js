var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var User = require('../Models/user');


router.post('/', function(req, res, next) {
    res.render('split', { title: 'Split page' });

    var password = req.body.password
    var ePassword = User.hashPassword(password)

    //creating new user and store in database
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Email: req.body.email,
        UserName: req.body.userName,
        Password: ePassword,
        Major: req.body.major,
        Seeking: req.body.seeking,
    }, function(err, user){
        if(err){
            console.log("there was an error");
            console.log(err);
        }
        else{
            console.log("User has been created!");
            console.log(user);
        }
    });
});

// passport.use('local.signup', new local_strategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqtoCallbac: true
// }, function(req, email, password, done) {
//     User.findOne({'username':username}, function(err, user) {
//         if(err) {
//             return done(err);
//         }
//
//         if(user) {
//             return done(null, false);
//         }
//
//         var password = req.body.password;
//         var ePassword = User.hashPassword(password);
//
//         var newUser = new User();
//         newUser.firstName = req.body.firstName;
//         newUser.lastName = req.body.lastName;
//         newUser.Email = req.body.email;
//         newUser.UserName = req.body.userName;
//         newUser.Password = ePassword;
//         newUser.Major = req.body.major;
//         newUser.Seeking = req.body.seeking;
//
//         newUser.save(function(err) {
//             if(err) {
//                 return done(err);
//             }
//             return done(null, newUser);
//         })
//
//     })
// }));
//
// //from passport documentation
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
//
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });
//
//
// router.post('/', passport.authenticate('local.signup', {
//     successRedirect: '/split',
//     failureRedirect:'/',
//     failureflash:true
//
// }));




// router.post('/', function(req, res, next) {
//     var password = req.body.password
//     var ePassword = User.hashPassword(password)
//
//     //creating new user and store in database
//     var newUser = new User();
//     newUser.firstName = req.body.firstName;
//     newUser.lastName = req.body.lastName;
//     newUser.Email = req.body.email;
//     newUser.UserName = req.body.userName;
//     newUser.Password = ePassword;
//     newUser.Major = req.body.major;
//     newUser.Seeking = req.body.seeking,
//     function(err, user){
//         if(err){
//             console.log("there was an error");
//             console.log(err);
//         }
//         else{
//             console.log("User has been created!");
//             console.log(user);
//         }
//         return(null, newUser);
//     }
//     res.render('split', {user: newUser});
// });
//
//



module.exports = router;
