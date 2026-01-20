import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

console.log('--- Cloudinary Config Debug ---');
console.log('Cloud Name:', cloudName);
console.log('API Key:', apiKey ? (apiKey.slice(0, 4) + '****') : 'MISSING');
console.log('API Secret:', apiSecret ? (apiSecret.slice(0, 4) + '****') : 'MISSING');
console.log('-------------------------------');

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

export default cloudinary;
