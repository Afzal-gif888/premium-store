import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import apicache from 'apicache';

const router = express.Router();

// Helper to clear product cache
const clearProductCache = () => {
    apicache.clear('/api/products');
    apicache.clear('/api/products/collections');
    console.log('[CACHE] Cleared all product-related caches');
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch all products (Alias for collections)
// @route   GET /api/products/collections
// @access  Public
router.get('/collections', async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a product
// @route   POST /api/products
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, brand, category, price, sizes, image } = req.body;

        // Validation
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }
        if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
            return res.status(400).json({ message: 'Sizes must be a non-empty array' });
        }

        const product = new Product({
            name,
            brand,
            category,
            price,
            sizes,
            image,
            isBestseller: false // Always default to false on creation
        });

        const createdProduct = await product.save();
        clearProductCache();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const { name, brand, category, price, sizes, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.price = price !== undefined ? price : product.price;
            product.sizes = sizes || product.sizes;
            product.image = image || product.image;
            // Note: isBestseller NOT updated here - use PATCH endpoint

            const updatedProduct = await product.save();
            clearProductCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Toggle bestseller status
// @route   PATCH /api/products/:id/bestseller
// @access  Public
router.patch('/:id/bestseller', async (req, res) => {
    try {
        const { isBestseller } = req.body;
        console.log(`[ROUTE] Toggle Bestseller - ID: ${req.params.id}, New Value: ${isBestseller}`);

        const product = await Product.findById(req.params.id);

        if (product) {
            product.isBestseller = isBestseller;
            const updatedProduct = await product.save();

            console.log(`[SUCCESS] Bestseller updated for ${product.name}`);
            clearProductCache();

            res.json(updatedProduct);
        } else {
            console.warn(`[WARN] Product not found for toggle: ${req.params.id}`);
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`[ERROR] Toggle Bestseller failed: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    const rawId = req.params.id;
    const id = rawId.trim(); // Remove any accidental whitespace
    console.log(`[DELETE] Aggressive Request - Raw: "${rawId}", Trimmed: "${id}"`);

    try {
        let product = null;

        // 1. Try finding by ObjectId (Standard MongoDB _id)
        if (mongoose.Types.ObjectId.isValid(id)) {
            product = await Product.findById(id);
        }

        // 2. Try finding by _id as a string (Just in case)
        if (!product) {
            product = await Product.findOne({ _id: id });
        }

        // 3. Try finding by a custom ID field named 'id'
        if (!product) {
            product = await Product.findOne({ id: id });
        }

        if (product) {
            const name = product.name;
            console.log(`[DELETE] Found product "${name}". Executing delete...`);

            // Delete specifically by its verified internal _id
            const result = await Product.deleteOne({ _id: product._id });

            if (result.deletedCount === 1) {
                console.log(`[DELETE] Successfully removed "${name}"`);
                clearProductCache();
                return res.json({ success: true, message: 'Product removed successfully' });
            } else {
                throw new Error("Found product but deleteOne failed to remove it");
            }
        } else {
            console.warn(`[DELETE] CRITICAL: Product NOT found in DB. Searching for ANY items to confirm DB connection...`);
            const anyProduct = await Product.findOne({});
            console.log(`[DELETE] DB check: ${anyProduct ? 'Connection valid, other items exist' : 'DB is empty or connection invalid'}`);

            res.status(404).json({ success: false, message: 'Product not found in database. It might have been already deleted or the ID is incorrect.' });
        }
    } catch (error) {
        console.error(`[DELETE] Fatal Error:`, error.message);
        res.status(500).json({ success: false, message: 'Backend error: ' + error.message });
    }
});

export default router;
