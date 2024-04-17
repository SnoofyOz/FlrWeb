var express = require('express');
var router = express.Router();
var categoryModel = require('../schemas/category')


router.get('/', async (req, res, next) => {
  try {
      const categories = await categoryModel.find({}, 'name'); // Chỉ lấy trường 'name' của danh mục
      res.status(200).send(categories);
  } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại sản phẩm:', error);
      res.status(500).send('Đã xảy ra lỗi khi lấy danh sách thể loại sản phẩm.');
  }
});




router.post('/', async function (req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
    });
    await newCategory.save();
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    var categories = await categoryModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      }).exec();
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete('/:id', async function (req, res, next) {
  try {
    var categories = await categoryModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    },
      {
        new: true
      }).exec();
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
