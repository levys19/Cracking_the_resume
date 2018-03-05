var mongoose = require("mongoose");
var User = require("./Models/user");

var userData = [
	{
		firstName: "John",
	    lastName: "Doe",
	    Email: "jdoe@gmail.com",
	    UserName: 'jdoe',
	    Password: 'Test1',
	    Year: "Junior",
	    Major: "Computer Science",
	    Seeking:"Internship"
	},
	{
		firstName: "Jane",
	    lastName: "Smith",
	    Email: "janeSmith@gmail.com",
	    UserName: 'jSmithy',
	    Password: 'Test2',
	    Year: "Freshman",
	    Major: "Computer Engineering",
	    Seeking:"Internship"
	}, 	
	{
		firstName: "Martha",
	    lastName: "Horton",
	    Email: "mhorton@gmail.com",
	    UserName: 'MartyTon',
	    Password: 'Test3',
	    Year: "Senior",
	    Major: "Computer Science",
	    Seeking:"Full-Time"
	},
]


function seedDB(){
	//removing all user data
	User.remove({}, function(err){
		if(err){
			console.log("There was an error");
			console.log(err)
		}
		console.log("all user data have been removed"); 
			//adding a few users
		userData.forEach(function(seed){
			User.create(seed, function(err, data){
				if(err){
					console.log("There was an error");
					console.log(err); 
				}
				else{
					console.log("Added a new user!");
				}
			});
		});
	});
}

module.exports = seedDB; 