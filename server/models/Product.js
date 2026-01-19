import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        default: 'Crocs'
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [{
        size: String,
        stock: Number
    }],
    image: {
        type: String
    },
    images: [String],
    isBestseller: { // Kept for frontend compatibility
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
