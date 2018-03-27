var mongoose = require("mongoose");

//RESUME schema
var resumeSchema = new mongoose.Schema({
    resumeName: String, //NEED TO FIND TYPE OF PDF FILE
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