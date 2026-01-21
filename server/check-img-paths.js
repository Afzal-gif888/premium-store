import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function checkImages() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db;
        const products = await db.collection('products').find({}).toArray();

        console.log('--- PRODUCT IMAGE AUDIT ---');
        products.forEach(p => {
            console.log(`Product: ${p.name}`);
            console.log(`Image URL: ${p.image}`);
            console.log('---------------------------');
        });

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

checkImages();
