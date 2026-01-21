import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';
import Settings from '../models/Settings.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function uploadLogo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[DB] Connected for logo upload');

        const logoPath = path.join(__dirname, '../../public/assets/images/logo.jpg');

        console.log('[UPLOAD] Uploading logo to Cloudinary...');
        const result = await cloudinary.uploader.upload(logoPath, {
            folder: 'premium_store_branding',
            public_id: 'store_logo',
            overwrite: true,
            resource_type: 'image'
        });

        console.log('[DB] Saving logo URL to Settings...');
        await Settings.findOneAndUpdate(
            { key: 'store_logo' },
            {
                key: 'store_logo',
                value: result.secure_url,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        console.log('[SUCCESS] Logo migrated to database/Cloudinary:', result.secure_url);

        await mongoose.connection.close();
    } catch (err) {
        console.error('[ERROR] Logo migration failed:', err);
    }
}

uploadLogo();
