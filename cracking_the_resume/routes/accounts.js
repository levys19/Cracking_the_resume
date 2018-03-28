var express = require('express');;
var router = express.Router();

var mongoose = require('mongoose'); 

//Retreiving the comment schema 
var Comment = require('../Models/comments');
var Resume = require("../Models/resume"); 
var User = require('../Models/user'); 



router.get('/', function(req, res, next) {
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
  var id = req.user.Resume; 

  //updating the resume with the comments 
  Resume.update({_id: id}, {$push: {comments: [{userName: req.user.UserName, content: req.body.Message }]}}, function(err,  resume){
      if(!err){
        console.log("update function")
        console.log(resume); 
      }
    });

  //Retrieve the current resume: 
  Resume.findById(id, function(err, resumeRecord){
    if(err){
      console.log("Resume could not be retrieved");
    }
    else{
      console.log("this is the current resume"); 
      console.log(resumeRecord);
      //res.render('account.ejs', {resumeRecord: resumeRecord})

      res.send({resumeRecord:resumeRecord});
      res.redirect('accounts.js');

    }
  }); 
}); 


module.exports = router;
