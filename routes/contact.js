var express = require('express');
var router = express.Router();

var path = require('path');
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../view/contact.html'));
});



module.exports = router;