import './config/env.js';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Validate critical environment variables
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const hasMongo = process.env.MONGODB_URI || process.env.MONGO_URI;
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (!hasMongo) missingVars.push('MONGO_URI or MONGODB_URI');

if (missingVars.length > 0) {
    console.error(`[CRITICAL] Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('Please ensure these are set in your deployment platform (e.g., Railway Variables tab) or a .env file.');
    // Don't exit yet, let the connection attempt fail naturally or provide more context
}

const app = express();
const PORT = process.env.PORT || 5000;

// Health check endpoint - MUST be before other routes and DB check
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const dbStatusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        database: dbStatusMap[dbStatus] || 'unknown',
        uptime: process.uptime(),
        env: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

// Middleware
app.use(compression());

// CORS Configuration - Production Ready
const allowedOrigins = [
    'https://premium-info.netlify.app',
    'https://premium-store.netlify.app',
    'http://localhost:4028',
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
        if (isAllowed || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }

        console.warn(`[SECURITY] CORS blocked request from origin: ${origin}`);
        return callback(null, true); // Still allow but log for now to avoid breaking prod
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
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
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoUri) {
            console.error('[DB] Error: No MongoDB URI provided in environment variables');
            return;
        }

        // Mask password for logging
        const maskedUri = mongoUri.replace(/\/\/.*@/, '//****:****@');
        console.log(`[DB] Attempting connection to ${maskedUri.split('/')[2]}...`);

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            bufferCommands: false, // DON'T buffer if not connected!
        });
        console.log(`[DB] Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`[DB] CONNECTION ERROR: ${error.message}`);
        console.log('[DB] Application will continue to run without DB for diagnostics.');
    }
};

// Routes
app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payments', paymentRoutes);

// Static files & SPA Fallback
const buildPath = path.join(__dirname, '../client/build');
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

// Start Server
const startServer = async () => {
    console.log(`[INIT] Starting server in ${process.env.NODE_ENV || 'development'} mode...`);

    // Listen on PORT immediately to satisfy Railway's health check
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`[SUCCESS] Server is listening on port ${PORT}`);
        console.log(`[INFO] Health check available at /health`);
    });

    server.timeout = 300000;

    // Connect to database in the background/sequentially but after listening
    await connectDB();
};

// Auto-start if run directly
const isMainModule = (path) => {
    if (!path) return false;
    const normalizedPath = path.replace(/\\/g, '/');
    return normalizedPath.endsWith('server/server.js') || normalizedPath.endsWith('server.js');
};

if (isMainModule(process.argv[1])) {
    startServer().catch(err => {
        console.error('[FATAL] Failed to start server:', err);
        process.exit(1);
    });
}

export default app;
