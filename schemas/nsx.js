const mongoose = require('mongoose');

var nsxSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

nsxSchema.virtual('published', {
    ref: 'product',
    localField: '_id',
    foreignField: 'nsx'
})

nsxSchema.set('toObject', { virtuals: true })
nsxSchema.set('toJSON', { virtuals: true })
module.exports = new mongoose.model('nsx', nsxSchema)