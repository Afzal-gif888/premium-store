import mongoose from 'mongoose';
import Product from './models/Product.js';
import Announcement from './models/Announcement.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function checkPersistence() {
    try {
        console.log('--- Database Persistence Audit ---');
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected successfully!');

        const productCount = await Product.countDocuments();
        const announcementCount = await Announcement.countDocuments();

        console.log(`\nAudit Results:`);
        console.log(`- Total Products: ${productCount}`);
        console.log(`- Total Announcements: ${announcementCount}`);

        if (productCount > 0) {
            console.log('\nRecent Products:');
            const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
            recentProducts.forEach(p => {
                console.log(`  [${p._id}] Name: ${p.name}, Price: ${p.price}, Image URL: ${p.image.substring(0, 50)}...`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Audit Failed:', error);
        process.exit(1);
    }
}

checkPersistence();
