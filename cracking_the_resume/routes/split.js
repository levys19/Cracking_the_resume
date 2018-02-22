var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('split', { title: 'Split page' });
});

module.exports = router;