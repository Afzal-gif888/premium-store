const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temp storage
const fs = require('fs');

// Upload image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            // Fallback for Base64 if sent directly, or error
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Check if Cloudinary keys are present
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            // Fallback: This is a hack for local dev without keys
            // Return a mock URL or just fail gracefully if strict
            return res.status(503).json({ message: 'Cloudinary not configured' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'premium-store'
        });

        // Clean up temp file
        fs.unlinkSync(req.file.path);

        res.json({ url: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Image upload failed' });
    }
});

module.exports = router;
