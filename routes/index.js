var express = require('express');
var router = express.Router();


//router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/nsxs',require('./nsxs'));
router.use('/home',require('./home'));


module.exports = router;