var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('account', { title: 'accounts page' });
});

module.exports = router;