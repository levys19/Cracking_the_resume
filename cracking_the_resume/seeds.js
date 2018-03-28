var mongoose = require("mongoose");
var User = require("./Models/user");
var Resume = require("./Models/resume");
var Comments = require("./Models/comments"); 

//sample user data 
var userData = [
	//interns
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
        firstName: "Jody",
        lastName: "Fanny",
        Email: "jFanny@gmail.com",
        UserName: 'jFanny',
        Password: User.hashPassword('Test3'),
        Year: "Freshman",
        Major: "Computer Engineering",
        Seeking:"Internship"
    },
    {
        firstName: "Amy",
        lastName: "Lee",
        Email: "AmyLee@gmail.com",
        UserName: 'ALee',
        Password: User.hashPassword('Test4'),
        Year: "Freshman",
        Major: "Computer Engineering",
        Seeking:"Internship"
    },
    //fulltimes 
    {
        firstName: "Martha",
        lastName: "Horton",
        Email: "mhorton@gmail.com",
        UserName: 'MartyTon',
        Password: User.hashPassword('Test5'),
        Year: "Senior",
        Major: "Computer Science",
        Seeking:"Full-Time"
    },
    {
        firstName: "Cady",
        lastName: "Huron",
        Email: "cHuron@gmail.com",
        UserName: 'cady',
        Password: User.hashPassword('Test6'),
        Year: "Senior",
        Major: "Computer Science",
        Seeking:"Full-Time"
    },
    {
        firstName: "Glen",
        lastName: "Coco",
        Email: "coco@gmail.com",
        UserName: 'GlenCoco',
        Password: User.hashPassword('Test7'),
        Year: "Senior",
        Major: "Computer Science",
        Seeking:"Full-Time"
    },
    {
        firstName: "Regina",
        lastName: "George",
        Email: "regina@gmail.com",
        UserName: 'QueenBee',
        Password: User.hashPassword('Test8'),
        Year: "Senior",
        Major: "Computer Science",
        Seeking:"Full-Time"
    },
]

//sample resume data
var resumeData = [
	{
		resumeName: "r2.jpg"
	},
	{
		resumeName: "r3.png"
	},
	{
		resumeName: "r4.jpg"
	},
	{
		resumeName: "r5.jpg"
	},
	{
		resumeName: "r6.jpg"
	},
	{
		resumeName: "r7.jpg"
	},
	{
		resumeName: "r8.jpg"
	},
	{
		resumeName: "r9.jpg"
	},
]


function seedDB(){

	//deleting the User collection 
	User.collection.drop(); 

	//deleting the Resume collection 
	Resume.collection.drop();

    //deleting the comments collection
    //Comments.collection.drop(); 

	//Adding sample user data
	userData.forEach(function(seed){
		User.create(seed, function(err, data){
			if(err){
				console.log("There was an error in creating sample users");
				console.log(err);
			}
			else{
				console.log("Added a new user!");
			}

		});
	});


	//Adding sample resume data 
	resumeData.forEach(function(seed){
		Resume.create(seed, function(err, data){
			if(err){
				console.log("There was an error in creating sample resumes"); 
			}
			else{
				console.log("Added a new resume!"); 
			}
		});		
	});



	//adding resumes object to each user: 

}

module.exports = seedDB; 