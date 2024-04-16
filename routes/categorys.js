var express = require('express');
var router = express.Router();
var categoryModel = require('../schemas/category')

router.get('/', async function (req, res, next) {
  var categorys = await categoryModel.find({})
  .populate('published').exec();
  res.status(200).send(categorys);
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

module.exports = router;
