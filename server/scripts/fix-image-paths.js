import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function migrateImages() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db;

        console.log('--- STARTING IMAGE PATH MIGRATION ---');

        // 1. Fix Products
        const products = await db.collection('products').find({}).toArray();
        let productCount = 0;

        for (const p of products) {
            if (p.image && p.image.includes('http://localhost:5001/uploads/')) {
                const relativePath = p.image.replace(/http:\/\/localhost:\d+\//, '/');
                await db.collection('products').updateOne(
                    { _id: p._id },
                    { $set: { image: relativePath } }
                );
                console.log(`Updated Product: ${p.name} -> ${relativePath}`);
                productCount++;
            }
        }

        // 2. Fix Announcements
        const announcements = await db.collection('announcements').find({}).toArray();
        let announcementCount = 0;

        for (const a of announcements) {
            if (a.image && a.image.includes('http://localhost:5001/uploads/')) {
                const relativePath = a.image.replace(/http:\/\/localhost:\d+\//, '/');
                await db.collection('announcements').updateOne(
                    { _id: a._id },
                    { $set: { image: relativePath } }
                );
                console.log(`Updated Announcement: ${a.title} -> ${relativePath}`);
                announcementCount++;
            }
        }

        console.log(`\nMigration complete. Updated ${productCount} products and ${announcementCount} announcements.`);

        await mongoose.connection.close();
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrateImages();
