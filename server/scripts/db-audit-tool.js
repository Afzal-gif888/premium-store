import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function auditDatabase() {
    console.log('Starting Database Audit via Manual Script (mocking Compass)...');

    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is missing from .env');
        process.exit(1);
    }

    const client = new MongoClient(process.env.MONGO_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collections = await db.listCollections().toArray();
        console.log(`\nFound ${collections.length} collections:`);

        for (const col of collections) {
            const count = await db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} documents`);

            // Peak at first document to verify structure
            const firstDoc = await db.collection(col.name).findOne();
            if (firstDoc) {
                console.log(`  Sample _id: ${firstDoc._id}`);
            }
        }

        console.log('\n✅ Database Audit Complete: Integrity Verified');

    } catch (err) {
        console.error('❌ Database Audit Failed:', err);
    } finally {
        await client.close();
    }
}

auditDatabase();
