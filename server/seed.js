import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Announcement from './models/Announcement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // Clear existing data
        await Product.deleteMany({});
        await Announcement.deleteMany({});
        console.log('Existing data cleared. Database is now empty.');

        // No new data insertion - Admin will add products dynamically
        console.log('Skipping seed data insertion as per user request.');

        console.log('Seeding complete.');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
