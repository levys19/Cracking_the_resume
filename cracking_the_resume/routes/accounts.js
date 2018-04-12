var express = require('express');;
var router = express.Router();

var mongoose = require('mongoose'); 

//Retreiving the COMMENT SCHEMA 
var Comment = require('../Models/comments');
//Retrieving the RESUME SCHEMA 
var Resume = require("../Models/resume"); 
//Retrieving the USER SCHEMA 
var User = require('../Models/user');
//Retrieving the logIn middleware
var logIn = require("../logIn");


//DISPLAYING CURRENT RESUME & COMMENTS
//used logIn to display the log in
router.get('/', logIn.isLoggedIn, function(req, res, next) {
  //current user's resume's ID 
  var id = req.user.Resume; 

  //finding current resume 
  Resume.findById(id).populate("comments").exec(function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved"); 
    }
    else{
      console.log("Resume was retrieved from get request"); 
      console.log(resumeRecord); 
      //rendering account.ejs 
   
      res.render('account.ejs', {resumeRecord: resumeRecord}); 
    }
  })
});


//STORING NEW COMMENTS 
router.post('/', logIn.isLoggedIn, function(req, res, next){
  //current user's resume's ID 
  var id = req.user.Resume; 

// //updating the resume 
//   Resume.update({_id: id}, {$push: {comments: [{userName: req.user.UserName, content: req.body.Message }]}}, function(err,  resume){
//       if(!err){
//         console.log("update function")
//         console.log(resume); 
//       }
//     });

  //Retrieve the current resume: 
  Resume.findById(id).populate("comments").exec(function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved");
    } //end if 
    else{
      console.log("this is the current resume"); 
      console.log(resumeRecord);
      // creating a new comment record 
      var commentRecord = new Comment({
        Resume: resumeRecord._id, //current resume id 
        username: req.user.UserName, //current user id 
        content: req.body.Message, //comment content 
      });
      //saving user record to the database
      commentRecord.save(function(err, comment){
        if(err){
          console.log("Error: comment could not be saved")
        }
        else{
          console.log("Comment was saved"); 
          //updating resume's comment array with new comment 
          resumeRecord.comments.push(comment);
          //saving the updated version 
          resumeRecord.save(); 
          console.log(commentRecord)
          //redirecting to the accounts page 
          res.redirect('/accounts');
        }
      }); 
    } 
  }); 
});  

module.exports = router;
