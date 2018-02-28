var mongoose = require("mongoose");
//connecting to the database
mongoose.connect("mongodb://localhost/Cracking_the_Resume");

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
