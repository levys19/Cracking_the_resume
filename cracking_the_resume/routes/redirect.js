//MAKE SURE TO INSTALL IMAGE MAGICK
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AWS = require("aws-sdk")
var fs = require("fs")

//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')
//converting pdf to images

//my personal AWS access key, don't share it please -levy

AWS.config.update({ accessKeyId: 'AKIAIQVUQQ4AAXSVZTEA', secretAccessKey: '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' });
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './Resumes')
    },
    filename: function(req, file, db){
        db(null, file.fieldname + '-' + Date.now() + '.png')
    }
});



//for conversion
  var PDFImage = require("pdf-image").PDFImage;

//LOOK INTO CALLBACK HELL
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './Resumes')
    },
    filename: function(req, file, db){
//*** -levy Last night- changed the files from date to temp.png
        db(null, "temp.pdf")
    }
});

router.post('/', function(req, res, next) {
    res.render('redirect', { title: 'Redirect page', user:req.user });
    const fileName =  "public/" + Date.now() + '.png'

    var upload = multer({storage:storage}).single('resume');

    upload(req, res, function(err) {
        if(err){
            console.log("file could not be uploaded");
            console.log(err);
        }
        else{

            //req.file.filename is the filename of the uploaded file
            console.log(req.file.filename);
            console.log("file upload successful");

            //creating resume record
            var resumeRecord = new Resume({
                upvoteCount: 0, //intializing upvote count to 0 
                downvoteCount: 0, //initializing downvote count to 0 
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


        var pdfImage = new PDFImage("./Resumes/temp.pdf")
        pdfImage.convertPage(0).then(function (imagePath) {
           // 0-th page (first page) of the slide.pdf is available as slide-0.png
           fs.existsSync("temp-0.png") // => true
           fs.readFile('./Resumes/temp-0.png' , function (err, data) {
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

        },function(err){
           console.log(err);
        });



    });
    //converted the image, can't find the path




});

// const host = req.host;
// const filePath = req.protocol + '://' + host + '/' + req.file.path;
// console.log("this is the file path " + filePath );

module.exports = router;
