var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//retrieving User and Resume schema from the database
var User = require('../Models/user')
var Resume = require('../Models/resume')
var logIn = require("../logIn");
// const host = req.host; 
// const filePath = req.protocol + '://' + host + '/' + req.file.path; 
// console.log("this is the file path " + filePath );

module.exports = router;

var User = require('../Models/user');

//Get the split page by rendering the split ejs file
//Restrict users to the ResumeViewing Page
router.get('/', logIn.isLoggedIn, function(req, res, next) {
    res.render('split.ejs', { title: 'Split page', user:req.user });
});


module.exports = router;
