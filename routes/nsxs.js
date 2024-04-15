var express = require('express');
var router = express.Router();
var nsxModel = require('../schemas/nsx')

router.get('/', async function (req, res, next) {
  var nsxs = await nsxModel.find({})
  .populate('published').exec();
  res.status(200).send(nsxs);
});

router.post('/', async function (req, res, next) {
  try {
    let newNsx = new nsxModel({
      name: req.body.name,
    });
    await newNsx.save();
    res.status(200).send(newNsx);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
