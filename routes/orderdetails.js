var express = require('express');
var router = express.Router();
var orderdetails = require('../schemas/orderdetails')


router.get('/:id', async function (req, res, next) {
    try {
      var orders = await orderdetails.findById(req.params.id).exec();
      res.status(200).send(orders);
    } catch (error) {
      res.status(404).send(error);
    }
  });


router.post('/add', async function (req, res, next) {
    try {
      let newOrders = new orderdetails({
        order: req.body.order,
        product: req.body.product,
        quantity: req.body.quantity,     
      });
      await newOrders.save();
      res.status(200).send(newOrders);
    } catch (error) {
      res.status(404).send(error);
    }
  });
  router.put('/:id', async function (req, res, next) {
    try {
      var orders = await orderdetails.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true
        }).exec();
      res.status(200).send(orders);
    } catch (error) {
      res.status(404).send(error);
    }
  });
  router.delete('/:id', async function (req, res, next) {
    try {
      var orders = await orderdetails.findByIdAndUpdate(req.params.id, {
        isDeleted: true
      },
        {
          new: true
        }).exec();
      res.status(200).send(orders);
    } catch (error) {
      res.status(404).send(error);
    }
  });


 

module.exports = router;
