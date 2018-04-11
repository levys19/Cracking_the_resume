var mongoose = require("mongoose");

//COMMENTS schema
var commentSchema = new mongoose.Schema({
    Resume:[
        //Object Reference
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume"
        }
    ],
    username: String,
    content: String,
    created: {type: Date, default: Date.now}
});

//exporting module
module.exports = mongoose.model("Comment", commentSchema);