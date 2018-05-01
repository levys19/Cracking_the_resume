var express = require('express');
var router = express.Router();
var User = require('../Models/user');
var logIn = require("../logIn");
var AWS = require("aws-sdk")
var Resume = require('../Models/resume')
var fs = require("fs")

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

    });

});

AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
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

router.post('/updateResume', function(req, res, next) {
    //res.render('settings.ejs', {title: 'Settings page', user: req.user});

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
                resumeName: "https://s3.amazonaws.com/crackingtheresume/" + fileName,
                commentCount:0
            });


            Resume.remove( {_id:req.user.Resume}, function(err) {
                if(!err) {
                    console.log("deleted Resume")
                    console.log("Updated User after delteting the Resume")
                    console.log(req.user)

                }

                else{
                    console.log("Resume not deleted")
                }
            });



            //saving resume record to the database
            resumeRecord.save(function(err, resume){
                if(err){
                    console.log("Error: Resume could not be saved")
                }
                else{
                    console.log("Resume was saved");
                    console.log(resume);
                    User.update({'UserName': req.user.UserName}, {$set: {Resume:resumeRecord._id}},function(err, user) {
                        if(err) {
                            console.log("Couldn't update entry")
                        }
                        else {
                            console.log("Updated Resume, printing user from update")
                            var pdfImage = new PDFImage("./Resumes/temp.pdf")
                            pdfImage.convertPage(0).then(function (imagePath) {
                                // 0-th page (first page) of the slide.pdf is available as slide-0.png
                                fs.existsSync("temp-0.png"); // => true
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
                        }

                    });
                }
            });

        }

        res.redirect('/settings');
    });
    //converted the image, can't find the path


});


module.exports = router;