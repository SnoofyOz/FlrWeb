const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true })

orderSchema.virtual('published', {
    ref: 'order',
    localField: '_id',
    foreignField: 'orderdetails'
})

orderSchema.virtual('published', {
    ref: 'product',
    localField: '_id',
    foreignField: 'orderdetails'
})
 
module.exports = new mongoose.model('orderdetails', orderSchema)