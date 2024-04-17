const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    totalPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true })

orderSchema.virtual('published', {
    ref: 'user',
    localField: '_id',
    foreignField: 'order'
})

orderSchema.virtual('published', {
    ref: 'product',
    localField: '_id',
    foreignField: 'order'
})
 
module.exports = new mongoose.model('order', orderSchema)