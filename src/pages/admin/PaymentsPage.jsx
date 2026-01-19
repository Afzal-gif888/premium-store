import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPayment } from 'store/slices/paymentSlice';
import Button from 'components/ui/Button';

const PaymentsPage = () => {
    const dispatch = useDispatch();
    const history = useSelector(state => state.payments.history);
    const products = useSelector(state => state.stock.products);

    const [productName, setProductName] = useState('');
    const [size, setSize] = useState('');
    const [amount, setAmount] = useState('');

    // Auto-fill price logic could be added but let's keep it manual as per "Log Payments"

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPayment({
            id: Date.now().toString(),
            productName,
            size,
            amount: parseFloat(amount),
            timestamp: new Date().toISOString()
        }));

        setProductName('');
        setSize('');
        setAmount('');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Payments Ledger</h1>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h2 className="text-lg font-semibold mb-4">Log New Payment</h2>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                            className="w-full border p-2 rounded"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            required
                            list="product-list"
                        />
                        <datalist id="product-list">
                            {products.map(p => <option key={p.id} value={p.name} />)}
                        </datalist>
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block text-sm font-medium mb-1">Size</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            {['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="w-full md:w-40">
                        <label className="block text-sm font-medium mb-1">Amount ($)</label>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Log Payment</Button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <h2 className="text-lg font-semibold p-4 border-b">Payment History</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(item.timestamp).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">${item.amount}</td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No payments recorded.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsPage;
