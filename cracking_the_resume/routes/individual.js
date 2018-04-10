var express = require('express');;
var router = express.Router();

var mongoose = require('mongoose'); 

//Retreiving the COMMENT SCHEMA 
var Comment = require('../Models/comments');
//Retrieving the RESUME SCHEMA 
var Resume = require("../Models/resume"); 
//Retrieving the USER SCHEMA 
var User = require('../Models/user'); 


//DISPLAYING CURRENT RESUME & COMMENTS 
router.get('/:id', function(req, res, next) {
  //current user's resume's ID 
  //var id = req.user.Resume; 
  console.log("this is the id"); 
  console.log(req.params.id) 

  //finding current resume 
  Resume.findById(req.params.id).populate("comments").exec(function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved"); 
    }
    else{
      console.log("Resume was retrieved from get request"); 
      console.log(resumeRecord); 
      //rendering account.ejs 
      console.log("this is the resume name"); 
      console.log(resumeRecord.resumeName); 
      res.render('individual.ejs', {resumeRecord: resumeRecord}); 
    }
  });  
});


//STORING NEW COMMENTS 
router.post('/:id', function(req, res, next){
  //current user's resume's ID 
  // var id = req.user.Resume; 
  var id = req.params.id; 

  console.log("this is the current resume id")
  console.log(id); 

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
        Resume: id, //current resume id 
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
          console.log("this is the resume id before redirect")
          console.log(resumeRecord._id); 
          res.redirect("/individual/" + resumeRecord._id);
        }
      }); 
    } 
  }); 
}); 

//UPDATING THE LIKE BUTTON
router.put('/:id/upvote', function(req, res){
  Resume.update({_id: req.params.id}, {$addToSet:{upvotes:req.user._id}}, function(err, resume){
    if(!err){
      Resume.findById(req.user.Resume, function(err, resumeRecord){
        if(!err){
          resumeRecord.upvoteCount = resumeRecord.upvoteCount + 1; 
          resumeRecord.save(); 
        }
      });
      console.log("RESUME HAS BEEN UPDATED WITH UPVOTE!")
      console.log(resume); 
    }
  });  
  res.sendStatus(204); 
});

//UPDATING THE DISLIKE BUTTON
router.put('/:id/downvote', function(req, res){
  Resume.update({_id: req.params.id}, {$addToSet:{downvotes:req.user._id}}, function(err, resume){
    if(!err){
      Resume.findById(req.user.Resume, function(err, resumeRecord){
        if(!err){
          resumeRecord.downvoteCount = resumeRecord.downvoteCount + 1; 
          resumeRecord.save(); 
        }
      });  
      console.log("RESUME HAS BEEN UPDATED WITH DOWNVOTE!") 
      console.log(resume); 
    }
  });  
  res.sendStatus(204); 
});


module.exports = router;