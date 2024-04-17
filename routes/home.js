var express = require('express');
var router = express.Router();

var path = require('path');
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../view/home.html'));
});
router.get('/shop', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/categories.html'));
  });
  router.get('/admin', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/admin.html'));
  });
  router.get('/QLSP', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/QLSP.html'));
  });
  router.get('/QLTL', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/QLTL.html'));
  });
  router.get('/QLND', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/QLND.html'));
  });
  router.get('/QLDH', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/QLDH.html'));
  });
  router.get('/QLSP/add_product', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/add_product.html'));
  });
  router.get('/QLDH/edit', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../view/edit_product.html'));
  });
module.exports = router;