var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('settings.ejs', { title: 'Settings page', user:req.user });
});

module.exports = router;
