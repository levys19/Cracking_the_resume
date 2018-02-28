var mongoose = require("mongoose");
//connecting to the database
mongoose.connect("mongodb://localhost/Cracking_the_Resume");

//COMMENTS schema
var commentSchema = new mongoose.Schema({
    Resume:[
        //Object Reference
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume"
        }
    ],
    User: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    content: String,
    created: {type: Date, default: Date.now}
});

//exporting module
module.exports = mongoose.model("Comment", commentSchema);