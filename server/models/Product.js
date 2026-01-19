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
        size: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }],
    image: {
        type: String,
        required: true
    },
    isBestseller: {
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
