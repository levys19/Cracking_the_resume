var express = require('express');
var router = express.Router();
const fs = require('fs'); 

var mongoose = require('mongoose'); 
var Resume = require('../Models/resume');
var logIn = require("../logIn");

//Added the isLoggenIn functionality to restrict users for the resumeViewing Page
router.get('/', logIn.isLoggedIn, function(req, res, next) {
	//finding all resumes in the database
	Resume.find({}, function(err, resumeRecord){
		if(!err){
			console.log("these are the records"); 
			console.log(resumeRecord)
			res.render("resumeViewing.ejs",{resumeRecord, resumeRecord, user:req.user});
		}
	});
});  

// //DISPLAYING CURRENT RESUME & COMMENTS 
// router.get('/:tagId', function(req, res, next) {
//   console.log("this is the id");
//   console.log(req.params); 
//   console.log(req.body);  
//   console.log(req.params.tagId); 
//   var id = req.params.tagId;
//   //finding current resume 
//   Resume.findOne({resumeName: id}).populate("comments").exec(function(err, resumeRecord){
//     if(err){
//       console.log("Resume could not be retrieved"); 
//     }
//     else{
//       console.log("Resume was retrieved from get request"); 
//       console.log(resumeRecord); 
//       //rendering individual.ejs template  
//       res.render('individual.ejs', {resumeRecord: resumeRecord}); 

//     }
//   })
// });


module.exports = router;
