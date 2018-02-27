var express = require('express');
var router = express.Router();

// var User = require('../Models/user');

router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'signup page' });
});

// router.post('/', function(req, res, next) {
//     User.create(req.body.user.firstName);
//
//     console.log(firstName);
//
// });
//
// app.post("/blogs", function(req, res){
//     //create blog
//     req.body.blog.body = req.sanitize(req.body.blog.body);
//     Blog.create(req.body.blog, function(err, newBlog){
//         if(err){
//             //render new for again
//             res.render("new");
//         }
//         else{
//             //then redirect to the index
//             res.redirect("/blogs");
//         }
//
//     });
// });

module.exports = router;
