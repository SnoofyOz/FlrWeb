const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: Number,
    nsx: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'nsx'
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    descripton: {
        type: String,
        required: true,
        
    },
        price: {
            type: Number,
            required: true,       
        },
        image:{
            type: String,
            
        },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })
productSchema.virtual('published', {
    ref: 'product',
    localField: '_id',
    foreignField: 'category'
}),
// Định nghĩa hàm để lấy danh sách sản phẩm từ MongoDB
productSchema.statics.getProducts = async function() {
    try {
        const products = await this.find(); // 'this' ở đây sẽ là model Product
        return products;
    } catch (error) {
        throw error;
    }
};
module.exports = new mongoose.model('product', productSchema)