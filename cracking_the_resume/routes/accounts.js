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
      //console.log(comment); 
    }
  });
    console.log("this is req.user.resume"); 
    console.log(req.user.Resume)
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
   
})


module.exports = router;
