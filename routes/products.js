var express = require('express');
var router = express.Router();
var productModel = require('../schemas/product')
var nsxModel = require('../schemas/nsx');
const nsx = require('../schemas/nsx');



router.get('/', async (req, res, next) => {
    try {
        let limit = parseInt(req.query.limit) || 5;
        let page = parseInt(req.query.page) || 1;
        let queries = {};

        const exclude = ["sort", "page", "limit"];
        const stringFilter = ["name", "nsx"];
        const numberFilter = ["year"];

        // Xử lý các tham số query để tạo các điều kiện truy vấn
        for (const [key, value] of Object.entries(req.query)) {
            if (!exclude.includes(key)) {
                if (stringFilter.includes(key)) {
                    queries[key] = new RegExp(value.replace(',', '|'), 'i');
                } else if (numberFilter.includes(key)) {
                    let string = JSON.stringify(value);
                    let index = string.search(new RegExp('lte|gte|lt|gt', 'i'));
                    if (index < 0) {
                        queries[key] = value;
                    } else {
                        queries[key] = JSON.parse(string.slice(0, index) + "$" + string.slice(2, string.length));
                    }
                }
            }
        }

        // Thêm điều kiện để lọc các bản ghi chưa bị xóa
        queries.isDeleted = false;

        // Thực hiện truy vấn để lấy danh sách sản phẩm
        const products = await productModel
            .find(queries)
            .populate({ path: 'nsx', select: "_id name" })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.status(200).send(products);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi lấy danh sách sản phẩm.');
    }
});



router.get('/:id', async function (req, res, next) {
  try {
    var product = await productModel.findById(req.params.id).exec();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/add_product', async function (req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,     
      year: req.body.year,
      category: req.body.category,
      nsx: req.body.nsx,
      descripton: req.body.descripton,
      image: req.body.image,
      price: req.body.price
    });
    await newProduct.save();
    res.status(200).send(newProduct);
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
