var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('resumeViewing.ejs', { title: 'Resume Viewing',user:req.user });
});

module.exports = router;
