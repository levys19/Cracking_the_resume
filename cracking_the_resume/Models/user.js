var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');



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

//exporting module
module.exports = mongoose.model("User", userSchema);

//get the user by ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback); };

//Call this function after creating the user in the database to hash the password
module.exports.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//checking if the hash password matches the candidate password--given by the user
module.exports.checkValidPassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};
