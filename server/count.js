//Count products in MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function count() {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Product.countDocuments();
    console.log(`Total products in MongoDB: ${count}`);

    const products = await Product.find({}).select('name image').limit(5);
    console.log('\nFirst 5 products:');
    products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} - Image: ${p.image ? 'YES' : 'NO'}`);
    });

    process.exit(0);
}

count();
