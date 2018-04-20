//MAKE SURE TO INSTALL IMAGE MAGICK
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AWS = require("aws-sdk")
var fs = require("fs")
var nodemailer = require('nodemailer');

//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')
//converting pdf to images

//my personal AWS access key, don't share it please -levy

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

// My code begins bc!!!!!

                
        'use strict';
        const nodemailer = require('nodemailer');

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'crackingtheresume@gmail.com', // generated ethereal user
                    pass: 'CSE4429945' // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: 'crackingtheresume@gmail.com', // sender address
                to: String(req.body.email), // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });    
        

           /* var app = require('express')();
              var mailer = require('express-mailer');


              mailer.extend(app, {
                      from: 'crackingtheresume@gmail.com',
                      host: 'smtp.gmail.com', // hostname 
                      secureConnection: true, // use SSL 
                      port: 465, // port for secure SMTP 
                      transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
                      auth: {
                        user: 'crackingtheresume@gmail.com',
                        pass: '12#$TY12'
                      }
                });
 
            app.mailer.send('email', {
                from: 'crackingtheresume@gmail.com', // sender address
                to: String(req.body.email), // list of receivers // REQUIRED. This can be a comma delimited string just like a normal email to field.  
                subject: 'Test Email', // REQUIRED. 
                otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
              }, function (err) {
                if (err) {
                  // handle error 
                  console.log(err);
                  res.send('There was an error sending the email');
                  return;
                }
                res.send('Email Sent');
              });*/

   
/*
            var transporter = nodemailer.createTransport({
                 service: 'Gmail',
                 auth: {
                    user: 'crackingtheresume@gmail.com', // Your email id
                    pass: '12#$TY12' // Your password
                }
            });

             var mailOptions = {
                from: 'crackingtheresume@gmail.com', // sender address
                to: String(req.body.email), // list of receivers
                subject: 'Welcome to crackingtheresume', // Subject line
                text: 'Hello there! Welcome to Cracking the Resume' //, // plaintext body
                // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                res.json({yo: 'error'});
                }else{
                    console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
                };
            }); */


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
