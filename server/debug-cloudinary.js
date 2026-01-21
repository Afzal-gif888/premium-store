import cloudinary from './config/cloudinary.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('--- Deep Cloudinary Test ---');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');

async function runTest() {
    try {
        console.log('Pinging Cloudinary API...');
        const ping = await cloudinary.api.ping();
        console.log('Ping Success:', ping);

        console.log('Attempting sample upload...');
        const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
            folder: 'test_execution',
            resource_type: 'image'
        });
        console.log('Upload Success! URL:', result.secure_url);
    } catch (error) {
        console.error('Test Failed!');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.http_code) console.error('HTTP Code:', error.http_code);
        console.error('Full Error:', JSON.stringify(error, null, 2));
    }
}

runTest();
