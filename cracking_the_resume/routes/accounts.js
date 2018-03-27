var express = require('express');;
var router = express.Router();

var mongoose = require('mongoose'); 

//Retreiving the comment schema 
var Comment = require('../Models/comments');
var Resume = require("../Models/resume"); 


router.get('/', function(req, res, next) {
    res.render('account.ejs', { title: 'accounts page', user:req.user });
    // console.log(req.user); 
    // console.log(req.user.Resume); 
    // console.log(req.user.Resume._id);
    // Resume.find({_id: req.user.Resume}, function(err, resumeRecord){
    //   if(err){
    //     console.log("resume could not be retrieved");
    //   }
    //   else{
    //     console.log("resume was retrieved"); 
    //     console.log(resumeRecord);
    //   }
    // })
});

router.post('/', function(req, res, next){
  res.render('account', { title: 'accounts page', user:req.user });
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
      console.log(comment); 
    }
  });
   
})


module.exports = router;
