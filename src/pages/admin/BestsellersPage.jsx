import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBestseller } from 'store/slices/stockSlice';

const BestsellersPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.stock.products);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Bestsellers</h1>
            <p className="text-gray-500">Select products to appear in the "Bestsellers" section on the homepage.</p>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Is Bestseller?</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product._id || product.id}>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                    {product.image && (
                                        <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
                                    )}
                                    <span className="font-medium">{product.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => dispatch(toggleBestseller({ id: product._id || product.id, isBestseller: !product.isBestseller }))}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${product.isBestseller ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${product.isBestseller ? 'translate-x-5' : 'translate-x-0'}`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BestsellersPage;
