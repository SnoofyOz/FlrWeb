var express = require('express');
var router = express.Router();


//router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/nsxs',require('./nsxs'));
router.use('/categories',require('./categories'));
router.use('/',require('./home'));
router.use('/auth',require('./auth'));
router.use('/contact',require('./contact'));
router.use('/orders',require('./orders'));
router.use('/quanli',require('./quanli'));


module.exports = router;