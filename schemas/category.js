const mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

categorySchema.virtual('published', {
    ref: 'product',
    localField: '_id',
    foreignField: 'category'
})
categorySchema.statics.getcategory = async function() {
    try {
        const categories = await this.find(); 
        return categories;
    } catch (error) {
        throw error;
    }
};
categorySchema.set('toObject', { virtuals: true })
categorySchema.set('toJSON', { virtuals: true })
module.exports = new mongoose.model('category', categorySchema)