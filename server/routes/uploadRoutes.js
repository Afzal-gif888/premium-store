import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

router.post('/', (req, res, next) => {
    console.log('--- Multer Middleware Start ---');
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer/Upload Middleware Error:', err);
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: `Multer error: ${err.message}`, code: err.code });
            }
            return res.status(500).json({ success: false, message: err.message });
        }
        console.log('Multer successfully parsed file');
        next();
    });
}, async (req, res) => {
    console.log('--- Post-Middleware Controller Start ---');
    try {
        if (!req.file) {
            console.log('Upload Error: No file in request after multer');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        console.log('File received:', req.file.originalname, 'Size:', req.file.size);

        // Stage 1: Attempt Cloudinary with Timeout
        try {
            console.log('Attempting Cloudinary Upload...');
            const streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject(new Error('Cloudinary Upload Timeout (10s)'));
                    }, 10000);

                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'premium_store_products',
                            resource_type: 'auto',
                            timeout: 10000
                        },
                        (error, result) => {
                            clearTimeout(timeoutId);
                            if (error) {
                                console.error('Cloudinary Callback Error:', error);
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    stream.on('error', (err) => {
                        clearTimeout(timeoutId);
                        console.error('Cloudinary Stream Error:', err);
                        reject(err);
                    });

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            const result = await streamUpload(req);
            console.log('Cloudinary Success!');
            return res.status(200).json({
                success: true,
                url: result.secure_url,
                public_id: result.public_id,
                provider: 'cloudinary'
            });

        } catch (cloudinaryError) {
            console.error('Cloudinary Failed, Switching to Local Fallback:', cloudinaryError.message);

            // Stage 2: Local Storage Fallback
            const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
            const filePath = path.join(uploadsDir, filename);

            console.log('Writing file locally to:', filePath);
            await fs.writeFile(filePath, req.file.buffer);

            const apiBase = `${req.protocol}://${req.get('host')}`;
            const localUrl = `${apiBase}/uploads/${filename}`;

            console.log('Local Fallback Success:', localUrl);

            return res.status(200).json({
                success: true,
                url: localUrl,
                provider: 'local',
                message: 'Uploaded to local storage (Cloudinary was unreachable)'
            });
        }
    } catch (error) {
        console.error('Unified Upload Controller Catch-All:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Complete upload failure',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
});

export default router;
