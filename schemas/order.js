const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true })

orderSchema.virtual('published', {
    ref: 'order',
    localField: '_id',
    foreignField: 'order'
})

orderSchema.virtual('published', {
    ref: 'order',
    localField: '_id',
    foreignField: 'product'
})
orderSchema.set('toObject', { virtuals: true })
orderSchema.set('toJSON', { virtuals: true })
module.exports = new mongoose.model('order', orderSchema)