var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('faqhome.ejs', { title: 'FAQ page', user:req.user });
});

module.exports = router;

