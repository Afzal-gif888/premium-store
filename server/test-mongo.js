import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), override: true });

console.log('Testing MongoDB Connection...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not Set');

const testConnection = async () => {
    try {
        console.log('Attempting to connect...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Connected Successfully!');
        console.log('Host:', conn.connection.host);
        console.log('Database:', conn.connection.name);

        // Test a simple query
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name).join(', '));

        await mongoose.connection.close();
        console.log('Connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error:', error.message);
        console.error('Full Error:', error);
        process.exit(1);
    }
};

testConnection();
