var express = require('express');
var router = express.Router();
const orderModel = require('../schemas/order');



router.get('/', async (req, res, next) => {
  try {
      const order = await orderModel.find({}); // Chỉ lấy trường 'name' của danh mục
      res.status(200).send(order);
  } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại sản phẩm:', error);
      res.status(500).send('Đã xảy ra lỗi khi lấy danh sách thể loại sản phẩm.');
  }
});
router.get('/:id', async function (req, res, next) {
    try {
      var order = await orderModel.findById(req.params.id).exec();
      res.status(200).send(order);
    } catch (error) {
      res.status(404).send(error);
    }
  });


router.post('/add', async function (req, res, next) {
    try {
      let newOrder = new orderModel({
        user: req.body.user,
        product: req.body.product,
        totalPrice: req.body.totalPrice,     
      });
      await newOrder.save();
      res.status(200).send(newOrder);
    } catch (error) {
      res.status(404).send(error);
    }
  });


  router.put('/:id', async function (req, res, next) {
    try {
      var product = await productModel.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true
        }).exec();
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send(error);
    }
  });
  router.delete('/:id', async function (req, res, next) {
    try {
      var product = await productModel.findByIdAndUpdate(req.params.id, {
        isDeleted: true
      },
        {
          new: true
        }).exec();
      res.status(200).send(product);
    } catch (error) {
      res.status(404).send(error);
    }
  });



module.exports = router;
