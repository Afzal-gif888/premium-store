const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    productName: String,
    size: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
