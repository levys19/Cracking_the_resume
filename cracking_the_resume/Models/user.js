var mongoose = require("mongoose");
var bcrypt = require('bcrypt');



//USER schema
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    Email: String,
    UserName: String,
    Password: String,
    Year: String,
    Major: String,
    Seeking:String,
    Resume:[
        //Object Reference
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume"
        }
    ],
    created: {type: Date, default: Date.now}
});

var user_Model = mongoose.model("User", userSchema);

//exporting module
module.exports = mongoose.model("User", userSchema);

//get the user by ID
module.exports.getUserById = function(id, callback){
    user_Model.findById(id, callback) };

//Call this function after creating the user in the database to hash the password
module.exports.hashPassword = function(password){
    var salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
};


//checking if the hash password matches the candidate password--given by the user
module.exports.checkValidPassword = function(candidatePassword, user) {
    console.log(user);
    console.log("Canditate Password I am passing in to checkValid Password" + candidatePassword);
    console.log("the password that is in the database" + user.Password);
    console.log(bcrypt.compareSync(candidatePassword, user.Password));
    if(user.Password != null) {
        return bcrypt.compareSync(candidatePassword, user.Password);
    } else {
        return false
    }
};
