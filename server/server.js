import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import productRoutes from './routes/productRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request tracing
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, 'uploads');
try {
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
        console.log('[INIT] Created uploads directory');
    } else {
        console.log('[INIT] Uploads directory verified');
    }
} catch (err) {
    console.error('[CRITICAL] Failed to initialize uploads directory:', err);
}

// Serve static uploads
app.use('/uploads', express.static(uploadsPath));

// Database Connection
const connectDB = async () => {
    try {
        console.log('[DB] Attempting connection...');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[DB] Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[DB] CRITICAL ERROR: ${error.message}`);
        process.exit(1);
    }
};

// Routes
app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payments', paymentRoutes);

// Static files & SPA Fallback
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath));

// Redirect all non-API requests to index.html for React Router to handle
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start Server only after DB connection
const startServer = async () => {
    await connectDB();
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    server.timeout = 300000;
};

// Check if this file is being run directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    startServer();
}

export default app;
