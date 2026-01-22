import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPayment, fetchPayments } from 'store/slices/paymentSlice';
import { fetchProducts } from 'store/slices/stockSlice';
import Button from 'components/ui/Button';

const PaymentsPage = () => {
    const dispatch = useDispatch();
    const paymentState = useSelector(state => state.payments) || { history: [], status: 'idle' };
    const history = paymentState.history || [];
    const status = paymentState.status || 'idle';

    const stockState = useSelector(state => state.stock) || { products: [], status: 'idle' };
    const products = stockState.products || [];
    const stockStatus = stockState.status || 'idle';

    React.useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPayments());
        }
        if (stockStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, stockStatus, dispatch]);

    const [productName, setProductName] = useState('');
    const [size, setSize] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPayment({
            productName,
            size,
            amount: parseFloat(amount)
        }));

        setProductName('');
        setSize('');
        setAmount('');
    };

    if (status === 'loading' && history.length === 0) {
        return <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div></div>;
    }

    if (status === 'failed') {
        return (
            <div className="bg-red-50 p-10 rounded-lg text-center border border-red-100 mb-6">
                <h3 className="text-xl font-bold text-red-800">History Connection Error</h3>
                <p className="text-red-600 mt-2">{paymentState.error || 'Failed to sync payment records.'}</p>
                <Button onClick={() => window.location.reload()} className="mt-6" variant="danger">Retry Sync</Button>
            </div>
        );
    }

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
                            {products.map(p => <option key={p._id || p.id} value={p.name} />)}
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
                            <tr key={item._id || item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(item.date || item.timestamp).toLocaleString()}
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
