var express = require('express');
var router = express.Router();
const fs = require('fs'); 

var mongoose = require('mongoose'); 
var Resume = require('../Models/resume'); 

router.get('/', function(req, res, next) {
	Resume.find({}, function(err, records){
		if(!err){
			console.log("these are the records"); 
			console.log(records)
			res.render("resumeViewing.ejs",{records, records}); 
		}
	});
});  




router.post('/', function(req, res, next){

  var id = req.user.Resume; 
   
  console.log("image file")
  console.log(req.body.resumeName);
  console.log("comment message")
  console.log(req.body.Message);

  var filename = req.body.resumeName; 

  //updating the resume with the comments 
  Resume.update({resumeName: filename}, {$push: {comments: [{userName: req.user.UserName, content: req.body.Message }]}}, function(err,  resume){
      if(!err){
        console.log("update function")
        console.log(resume); 
      }
    });

  // //Retrieve the current resume: 
  // Resume.findById(id, function(err, resumeRecord){
  //   if(err){
  //     console.log("Resume could not be retrieved");
  //   }
  //   else{
  //     console.log("this is the current resume"); 
  //     console.log(resumeRecord);
  //     res.render('account.ejs', {resumeRecord: resumeRecord})
  //     // res.redirect('accounts.js'); 
  //     // res.send({resumeRecord:resumeRecord});

  //   }
  // }); 
  	Resume.find({}, function(err, records){
		if(!err){
			console.log("these are the records"); 
			console.log(records)
			if(records.resumeName == filename){
				console.log("this is the resume you're looking for")
				console.log(records)
			}
			res.render("resumeViewing.ejs",{records, records}); 
		}
	});

}); 



	// //iterating through the file names: 
	// for(var i = 0; i < file.length; i++){
	// 	var fileName = file[i];
	// 	console.log("this is the filename inside for loop"); 
	// 	console.log(fileName); 
	// 	while(fileName != '.DS_Store'){
	// 		Resume.findOne({resumeName: fileName}, function(err, resumeRecord){
	// 			if(!err){
	// 				console.log("this is the corresponding resume file"); 
	// 				console.log(resumeRecord.resumeName); 
	// 			}
	// 		})
	// 	}
	// }
  

// router.post('/', function(req, res, next){
// 	// var id = req.user.Resume; 
//  //  	var file = [];
//  //  	fs.readdir("../Resumes", function(err, files){
//  //  		file.push(files); 
//  //  	}); 
	
// 	// //iterating through the file names: 
// 	// for(var i = 0; i < file.length; i++){
// 	// 	var fileName = file[i];
// 	// 	while(fileName != '.DS_Store'){
// 	// 		Resume.findOne({resumeName: fileName}, function(err, resumeRecord){
// 	// 			if(!err){
// 	// 				console.log("this is the corresponding resume file"); 
// 	// 				console.log(resumeRecord); 
// 	// 			}
// 	// 		})
// 	// 	}
// 	// }

	




//   //updating the resume with the comments 
//   Resume.update({_id: id}, {$push: {comments: [{userName: req.user.UserName, content: req.body.Message }]}}, function(err,  resume){
//       if(!err){
//         console.log("update function")
//         console.log(resume); 
//       }
//     });

//   //Retrieve the current resume: 
//   Resume.findById(id, function(err, resumeRecord){
//     if(err){
//       console.log("Resume could not be retrieved");
//     }
//     else{
//       console.log("this is the current resume"); 
//       console.log(resumeRecord);
//       res.render('account.ejs', {resumeRecord: resumeRecord})

//       // res.send({resumeRecord:resumeRecord});
//       // res.redirect('accounts.js');

//     }
//   }); 
// }); 

module.exports = router;
