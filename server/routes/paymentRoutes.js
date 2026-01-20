import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// @desc    Fetch all payments
// @route   GET /api/payments
// @access  Public
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find({}).sort({ date: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a payment
// @route   POST /api/payments
// @access  Public
router.post('/', async (req, res) => {
    try {
        const payment = new Payment(req.body);
        const createdPayment = await payment.save();
        res.status(201).json(createdPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
