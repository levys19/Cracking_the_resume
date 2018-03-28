var express = require('express');;
var router = express.Router();

var mongoose = require('mongoose'); 

//Retreiving the comment schema 
var Comment = require('../Models/comments');
var Resume = require("../Models/resume"); 
var User = require('../Models/user'); 



router.get('/', function(req, res, next) {
  console.log("this is the current user"); 
  console.log(req.user); 
  console.log("this is req.user.resume"); 
  console.log(req.user.Resume)
  var id = req.user.Resume; 
  Resume.findById(id, function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved");
    }
    else{
      console.log("Resume was retrieved from get request"); 
      console.log(resumeRecord); 
      res.render('account.ejs', {resumeRecord: resumeRecord}); 
    }
  });   
});

router.post('/', function(req, res, next){
  //res.render('account', { title: 'accounts page', user:req.user });
  console.log("this is from the post request")
  console.log(req.body.Message); 

  //creating comment record
  commentRecord = new Comment({
    Resume: req.user.Resume, 
    User: req.user._id, 
    content: req.body.Message 
  }); 
  //saving the comment record onto the database 
  commentRecord.save(function(err, comment){
    if(err){
      console.log("comment record could not be created"); 
    }
    else{
      console.log("comment record was created"); 
      console.log(comment)
      console.log(comment.Resume); 
      //updates resume's comment array with new comments 
      var commentID = comment.Resume; 
      Resume.update({_id: commentID}, {$push: {comments: [comment._id]}}, function(err,  resume){
        if(!err){
          console.log("update function")
          console.log(resume); 
        }
      });
    }
  });
  var id = req.user.Resume; 
  console.log("this is req.user.resume"); 
  console.log(req.user.Resume)



  Resume.findById({id}).populate('comments').exec(function(err, resume){
    if(!err){
      console.log("this is the find one")
    console.log(resume); 
    }
    
  })

  //retreiving the current resume on accounts page 
  Resume.findById(id, function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved");
    }
    else{

      console.log("Resume was retrieved from get request"); 
      console.log(resumeRecord); 
      console.log("this is the comment array from later function"); 
      console.log(resumeRecord.comments); 

      var commentArray = {
        "comments": []
      }; 
      var commentID = resumeRecord.comments; 
      console.log("outside")
      //console.log(commentID[0]);
      console.log("push manually");
      //commentArray.push(commentID[0]); 

      var counter = 0; 
      for(var i = 0; i < commentID.length; i++){
        Comment.findById(commentID[i], function(err, commentRecord){
          console.log("there was an error");
          console.log(commentID[i]) 
          if(!err){
            console.log("this is the item being pushed"); 
           // console.log(commentRecord.content); 
            //commentArray.push(commentRecord); 
            commentArray.comments.push(commentRecord);
            console.log("comment array inside for loop"); 
            console.log(commentArray);  
          }
        });

        console.log("this is i"); 
        console.log(i); 
      }
      // commentID.forEach(function(comment){
      //   Comment.findById(comment, function(err, commentRecord){
      //     if(!err){
      //       commentArray.push(commentRecord); 
      //     }
      //   });
      // });

      console.log("this is the comment array")
      console.log(commentArray);

      res.render('account.ejs', {resumeRecord: resumeRecord}, {commentArray: commentArray})
      // Comment.find({}, function(err, comment){
      //   if(!err){
      //     res.render('account.ejs', {resumeRecord: resumeRecord}) //{comment: comment});
      //   }
      // })
    }
  }); 
}); 

        //res.render('account.ejs', {resumeRecord: resumeRecord}); 


module.exports = router;
