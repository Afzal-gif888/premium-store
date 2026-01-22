import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

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
        const product = await Product.findById(req.params.id);

        if (product) {
            product.isBestseller = isBestseller;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
