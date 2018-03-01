var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.render('split', { title: 'Split page' });
    console.log(req.body)
    console.log(req.body.firstName)
    console.log(req.body.lastName)

});

module.exports = router;
