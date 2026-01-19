// Test script to verify Cloudinary + MongoDB workflow
// Run this from server directory: node test-workflow.js

import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim()
});

async function test() {
    try {
        console.log('1. Testing Cloudinary connection...');
        const ping = await cloudinary.api.ping();
        console.log('✓ Cloudinary OK:', ping);

        console.log('\n2. Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ MongoDB Connected');

        console.log('\n3. Creating test product...');
        const testProduct = new Product({
            name: 'Test Product',
            category: 'Test',
            price: 99.99,
            image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
            sizes: [
                { size: 'US 7', stock: 5 },
                { size: 'US 8', stock: 10 }
            ]
        });

        const saved = await testProduct.save();
        console.log('✓ Product Saved:', saved._id);

        console.log('\n4. Fetching products...');
        const products = await Product.find({});
        console.log('✓ Total products in DB:', products.length);

        console.log('\n5. Fetching test product...');
        const fetched = await Product.findById(saved._id);
        console.log('✓ Product retrieved:', {
            name: fetched.name,
            image: fetched.image,
            sizesCount: fetched.sizes.length
        });

        console.log('\n✅ ALL TESTS PASSED - System is working!');
        process.exit(0);
    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
        console.error(error);
        process.exit(1);
    }
}

test();
