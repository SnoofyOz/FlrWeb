var express = require('express');
var app = express();
var router = require('./routes/index.js')



app.use('/', router);

//app.use('/', require('./routes/index'));

app.listen(5500, () => {
    console.log('Connected');
});

module.exports = router;

