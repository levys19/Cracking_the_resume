var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var User = require('../Models/user');

//Get the split page by rendering the split ejs file
router.get('/', function(req, res, next) {
    res.render('split', { title: 'Split page' });
});


module.exports = router;
