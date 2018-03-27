var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var Resume = require('../Models/resume')

var id = mongoose.Types.ObjectId('5ab7fb8b4afddb71e1389d21')

router.get('/', function(req, res, next) {
	res.render('resumeTest', { title: 'Resume Test' }); 
}); 


module.exports = router;