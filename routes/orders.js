var express = require('express');
var router = express.Router();
var orderModel = require('../schemas/order')

router.get('/', async function (req, res, next) {
  var orders = await orderModel.find({})
  .populate('published').exec();
  res.status(200).send(orders);
});

router.post('/', async function (req, res, next) {
  try {
    let newOrder = new orderModel({
      user: req.body.name,
      product: req.body.product
    });
    await newOrder.save();
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
