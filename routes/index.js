var express = require('express');
var router = express.Router();


router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/nsxs',require('./nsxs'));
router.use('/categorys',require('./categorys'));
router.use('/',require('./home'));
router.use('/auth',require('./auth'));
//router.use('/admin',require('./admin'));
 
router.use('/order',require('./order'));
router.use('/orderdetails',require('./orderdetails'));
module.exports = router;