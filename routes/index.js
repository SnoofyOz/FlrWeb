var express = require('express');
var router = express.Router();


router.get('/home', (req, res) => {
    res.json('Nhat Home?')
})
router.get('/user', (req, res) => {
    res.json('Flr user')
})

router.get('/product', (req, res) => {
    res.json('Nhat Ok?')
})

router.get('/cart', (req, res) => {
    res.json('Nhat Cart?')
})


module.exports = router;