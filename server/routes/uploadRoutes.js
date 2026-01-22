import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer Error:', err);
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        if (!req.file.buffer || req.file.buffer.length === 0) {
            return res.status(500).json({ success: false, message: 'Received empty file buffer' });
        }

        const buffer = req.file.buffer;

        // Stage 1: Attempt Cloudinary Direct Stream (Offloading CPU)
        try {
            console.log('Attempting Direct Cloudinary Upload...');

            const runCloudinaryUpload = () => {
                return new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => reject(new Error('Cloudinary Timeout')), 15000);

                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'premium_store_products',
                            resource_type: 'auto',
                            timeout: 15000,
                            // Offload optimization to Cloudinary
                            transformation: [
                                { width: 1200, height: 1200, crop: "limit" },
                                { quality: "auto" },
                                { fetch_format: "auto" }
                            ]
                        },
                        (error, result) => {
                            clearTimeout(timeoutId);
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(stream);
                });
            };

            const result = await runCloudinaryUpload();

            return res.status(200).json({
                success: true,
                url: result.secure_url,
                public_id: result.public_id,
                provider: 'cloudinary'
            });

        } catch (cloudinaryError) {
            console.warn('Cloudinary failed, falling back to local optimization:', cloudinaryError.message);

            // Stage 2: Local Processing Fallback (Sharp)
            // Only optimize locally if we have to store locally
            const optimizedBuffer = await sharp(buffer)
                .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            const sanitizedOriginalName = req.file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
            const filename = `${Date.now()}-${sanitizedOriginalName}.webp`;
            const filePath = path.join(uploadsDir, filename);

            await fs.writeFile(filePath, optimizedBuffer);
            const localUrl = `/uploads/${filename}`;

            return res.status(200).json({
                success: true,
                url: localUrl,
                provider: 'local',
                message: 'Uploaded to local storage (Fallback)'
            });
        }
    } catch (error) {
        console.error('Upload Fatal Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Upload failed'
        });
    }
});

export default router;
