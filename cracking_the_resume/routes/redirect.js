var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AWS = require("aws-sdk")
var fs = require("fs")

//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')
//my personal AWS access key, don't share it please -levy
AWS.config.update({ accessKeyId: '....', secretAccessKey: '...' });


AWS.config.update({ accessKeyId: 'AKIAJNGXZ6IAX7CSVWDQ', secretAccessKey: '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' });
var multer = require('multer');




  const fileName =  Date.now() + '.pdf'
  var storage = multer.diskStorage({
      destination: function(req,file, cb){
          cb(null, './Resumes')
      },
      filename: function(req, file, db){
  //*** -levy Last night- changed the files from date to temp.png
          db(null, "temp.pdf")
      }
  });

  var upload = multer({storage:storage}).single('resume');

router.post('/', function(req, res, next) {
    res.render('redirect', { title: 'Redirect page', user:req.user });
    var upload = multer({storage:storage}).single('resume');

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
                resumeName: "https://s3.amazonaws.com/crackingtheresume/" + fileName 
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
            console.log(req.body.firstName)
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
        fs.readFile('./Resumes/temp.pdf' , function (err, data) {
          if (err) { throw err; }
          var s3 = new AWS.S3();
          s3.putObject({
            Bucket: 'crackingtheresume',
            //change this to whatever you want to name each file please//look at above comment
            Key: fileName,
            Body: data,
            ACL: 'public-read'
          },function (resp) {
            console.log(arguments);
            console.log('Successfully uploaded package.');
          });

        });




    });
    // uploading file to s3
    //^^^^ make this into whatever you want to name your files in s3 **has to be a string

});

// const host = req.host;
// const filePath = req.protocol + '://' + host + '/' + req.file.path;
// console.log("this is the file path " + filePath );

module.exports = router;
