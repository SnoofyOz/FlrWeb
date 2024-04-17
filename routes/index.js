var express = require('express');
var router = express.Router();


//router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/nsxs',require('./nsxs'));
router.use('/shop',require('./shop'));
router.use('/',require('./home'));
router.use('/auth',require('./auth'));


module.exports = router;