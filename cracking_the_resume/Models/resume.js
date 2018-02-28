var mongoose = require("mongoose");
//connecting to the database
mongoose.connect("mongodb://localhost/Cracking_the_Resume");

//RESUME schema
var resumeSchema = new mongoose.Schema({
    resumePDF: String, //NEED TO FIND TYPE OF PDF FILE
    comments:[
        //Object Reference
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ],
    upvotes: Number, //SOME KIND OF QUERY ?
    downvotes: Number //SOME KIND OF QUERY???
});

//exporting module
module.exports = mongoose.model("Resume", resumeSchema);