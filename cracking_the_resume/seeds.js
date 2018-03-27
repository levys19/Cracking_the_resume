var mongoose = require("mongoose");
var User = require("./Models/user");
var Resume = require("./Models/resume"); 

//sample user data 
var userData = [
    {
        firstName: "John",
        lastName: "Doe",
        Email: "jdoe@gmail.com",
        UserName: 'jdoe',
        Password: User.hashPassword('Test1'),
        Year: "Junior",
        Major: "Computer Science",
        Seeking:"Internship"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        Email: "janeSmith@gmail.com",
        UserName: 'jSmithy',
        Password: User.hashPassword('Test2'),
        Year: "Freshman",
        Major: "Computer Engineering",
        Seeking:"Internship"
    },
    {
        firstName: "Martha",
        lastName: "Horton",
        Email: "mhorton@gmail.com",
        UserName: 'MartyTon',
        Password: User.hashPassword('Test3'),
        Year: "Senior",
        Major: "Computer Science",
        Seeking:"Full-Time"
    },
]


//sample resume data 
var resumeData = [
	{
		resumeName: "r1.pdf"
	}, 
	{
		resumeName: "r2.pdf"
	},
	{
		resumeName: "r3.pdf"
	},
]


function seedDB(){
	//removing all user data from current database 
	User.remove({}, function(err){
		if(err){
			console.log("There was an error");
			console.log(err)
		}
		console.log("all user data have been removed"); 
	}); 

	//removing all resume data from current database
	Resume.remove({}, function(err){
		if(err){
			console.log("There was an error"); 
			console.log(err); 
		}
		console.log("All resume data have been removed"); 
	});

	 
		//creating resume records 
	resumeData.forEach(function(seed){
		//creating resume record 
		var resumeRecord = new Resume(seed)

		resumeRecord.save(function(err, resume){
			if(err){
				console.log("There was an error in saving the resume"); 
			}
			else{
				console.log("Sucessfully created resume record"); 
				console.log(resume);  
			}
		});
	}); 

	// userData.forEach(function(seed){
	// 	User.create(seed, function(err, data){
	// 		if(err){
	// 			console.log("There was an error");
	// 			console.log(err); 
	// 		}
	// 		else{
	// 			console.log("Added a new user!");
	// 		}

	// 	});
	// });

}
Resume.find({}, function(err, resume){
		if(err){
			console.log("no resumes in the database");
		}
		console.log("this is the resume ids"); 
		console.log(resume._id); 
	})




module.exports = seedDB; 