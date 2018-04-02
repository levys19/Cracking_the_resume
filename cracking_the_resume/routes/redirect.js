var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')


var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, '../Resumes')
    },
    filename: function(req, file, db){
        db(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

var upload = multer({storage:storage}).single('resume');


router.post('/', function(req, res, next) {
    res.render('redirect', { title: 'Redirect page', user:req.user });
    upload(req, res, function(err) {
        if(err){
            console.log("file could not be uploaded");
        }
        else{
            //req.file.filename is the filename of the uploaded file
            console.log(req.file.filename);
            console.log("file upload successful");

            //creating resume record
            var resumeRecord = new Resume({
                resumeName: req.file.filename
                upvoteCount: 0, //intializing upvote count to 0 
                downvoteCount: 0 //initializing downvote count to 0 
            });

            //saving resume record to the database
            resumeRecord.save(function(err, resume){
                if(err){
                    console.log("Error: Resume could not be saved")
                }
                else{
                    console.log("Resume was saved");
                    console.log(resume);
                }
            });
            //encrypting the password
            var password = req.body.password
            var ePassword = User.hashPassword(password)

            //creating a user record
            var userRecord = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Email: req.body.email,
                UserName: req.body.userName,
                Password: ePassword,
                Major: req.body.major,
                Seeking: req.body.seeking,
                Resume: resumeRecord._id
            });

            //saving user record to the database
            userRecord.save(function(err, user){
                if(err){
                    console.log("Error: User could not be saved")
                }
                else{
                    console.log("User was saved");
                    console.log(user);
                }
            });
        }
    });
});

// const host = req.host;
// const filePath = req.protocol + '://' + host + '/' + req.file.path;
// console.log("this is the file path " + filePath );

module.exports = router;
