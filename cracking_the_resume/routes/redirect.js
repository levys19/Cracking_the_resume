//MAKE SURE TO INSTALL IMAGE MAGICK
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AWS = require("aws-sdk")
var fs = require("fs")

//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')
//verify if a
var mmmagic = require('mmmagic');

//my personal AWS access key, don't share it please -levy

AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
var multer = require('multer');


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
    const fileName =  "public/" + Date.now() + '.png'

    var upload = multer({storage:storage}).single('resume');

    upload(req, res, function(err) {
        if(err){
            console.log("file could not be uploaded");
            console.log(err);
        }
        else{

            var pdfImage = new PDFImage("./Resumes/temp.pdf")
            var magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE);

            magic.detectFile("./Resumes/temp.pdf", function(err, result) {
              if (err) throw err;

              // image/jpeg
              if (result != "application/pdf"){
                //sends an error if it's not a pdf
                res.send("error bro")
              }
              else {
                //renders the correct page if the image is actually a pdf
                res.render('redirect', { title: 'Redirect page', user:req.user });
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
            });


        }






    });




});


module.exports = router;
