// Check what's in the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        const products = await Product.find({});
        console.log(`Found ${products.length} products:\n`);

        products.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name}`);
            console.log(`   ID: ${p._id}`);
            console.log(`   Image: ${p.image || 'NULL/MISSING'}`);
            console.log(`   Category: ${p.category}`);
            console.log(`   Price: $${p.price}`);
            console.log(`   Sizes: ${JSON.stringify(p.sizes)}`);
            console.log('');
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkDB();
