var mongoose = require("mongoose");

//RESUME schema
var resumeSchema = new mongoose.Schema({
    resumeName: String, //NEED TO FIND TYPE OF PDF FILE
    comments:[
        //Object Reference
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    upvotes: Number, //SOME KIND OF QUERY ?
    downvotes: Number //SOME KIND OF QUERY???
});

// //RESUME schema
// var resumeSchema = new mongoose.Schema({
//     resumeName: String, //NEED TO FIND TYPE OF PDF FILE
//     comments:[
//         //Object Reference
//         {
//             userName: String,
//             content: String, 
//             created: {type: Date, default: Date.now}
//         }
//     ],
//     upvotes: Number, //SOME KIND OF QUERY ?
//     downvotes: Number //SOME KIND OF QUERY???
// });




//exporting module
module.exports = mongoose.model("Resume", resumeSchema);