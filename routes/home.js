var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../view/home.html'));
});

module.exports = router;

