var mongoose = require("mongoose");

//downvote schema
var downvoteSchema = new mongoose.Schema({
    User: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
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
module.exports = mongoose.model("Downvote", downvoteSchema);