var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 


var User = require('../Models/user')

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

module.exports = router;