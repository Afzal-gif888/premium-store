import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

describe('Product API GET Endpoints', () => {
    jest.setTimeout(30000);

    beforeAll(async () => {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
        } else {
            // Fallback if env not loaded (e.g. CI), though we should error
            console.warn('Checking process.env.MONGO_URI... Not found?');
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('GET /api/products should return 200 and a list', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/announcements should return 200 and a list', async () => {
        const res = await request(app).get('/api/announcements');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
