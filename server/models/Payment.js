import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
