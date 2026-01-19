import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from 'store/slices/stockSlice';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const SIZES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

const StockPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.stock.products);

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialFormState = {
        name: '',
        category: '',
        price: '',
        image: '', // CHANGED: Single image URL instead of array
        sizes: SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
        // REMOVED: isBestseller - controlled only from Bestseller page
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (res.ok) {
                    setFormData(prev => ({
                        ...prev,
                        image: data.url // CHANGED: Set single image instead of array
                    }));
                } else {
                    alert('Upload failed: ' + data.message);
                }
            } catch (error) {
                console.error('Upload Error', error);
                alert('Upload failed');
            }
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            image: '' // CHANGED: Clear single image
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const totalStock = Object.values(formData.sizes).reduce((a, b) => a + parseInt(b || 0), 0);
        if (totalStock === 0) {
            alert("At least one size must have quantity greater than zero.");
            return;
        }
        if (!formData.image) { // CHANGED: Check single image
            alert("Image is required.");
            return;
        }

        // CRITICAL: Convert sizes object to array format for backend
        const sizesArray = Object.entries(formData.sizes)
            .filter(([size, stock]) => parseInt(stock || 0) > 0)
            .map(([size, stock]) => ({
                size: `US ${size}`,
                stock: parseInt(stock)
            }));

        const productData = {
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            image: formData.image, // CHANGED: Single image
            sizes: sizesArray // CHANGED: Array format
            // REMOVED: isBestseller
        };

        if (editId) {
            dispatch(updateProduct({ id: editId, data: productData }));
        } else {
            dispatch(addProduct(productData));
        }

        resetForm();
    };

    const handleEdit = (product) => {
        // Convert backend array format back to object for form
        const sizesObject = SIZES.reduce((acc, size) => {
            const sizeEntry = product.sizes?.find(s => s.size === `US ${size}`);
            return { ...acc, [size]: sizeEntry ? sizeEntry.stock : 0 };
        }, {});

        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image || '', // CHANGED: Single image
            sizes: sizesObject
            // REMOVED: isBestseller
        });
        setEditId(product._id);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            dispatch(deleteProduct(id));
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Stock Management</h1>
                <Button onClick={() => { resetForm(); setIsEditing(!isEditing); }}>
                    {isEditing ? 'Cancel' : 'Add New Product'}
                </Button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Product' : 'New Product'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="border p-2 rounded"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                className="border p-2 rounded"
                                placeholder="Category"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                className="border p-2 rounded"
                                placeholder="Price"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>

                        {/* REMOVED: Bestseller checkbox - controlled only from Bestseller page */}

                        <div>
                            <label className="block text-sm font-medium mb-2">Product Image</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                            {formData.image && (
                                <div className="relative w-32 h-32 border rounded overflow-hidden group">
                                    <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs opacity-0 group-hover:opacity-100"
                                    >
                                        X
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Size Quantities</label>
                            <div className="grid grid-cols-5 gap-2">
                                {SIZES.map(size => (
                                    <div key={size} className="flex flex-col">
                                        <span className="text-xs text-center mb-1">US {size}</span>
                                        <input
                                            type="number"
                                            min="0"
                                            className="border p-1 rounded text-center"
                                            value={formData.sizes[size]}
                                            onChange={e => setFormData({
                                                ...formData,
                                                sizes: { ...formData.sizes, [size]: parseInt(e.target.value || 0) }
                                            })}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                            <Button type="submit">Save Product</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => {
                            // Calculate total stock from sizes array
                            const totalStock = Array.isArray(product.sizes)
                                ? product.sizes.reduce((sum, s) => sum + (s.stock || 0), 0)
                                : 0;
                            return (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                        {product.image && (
                                            <img src={product.image} alt="" className="h-10 w-10 rounded object-cover" />
                                        )}
                                        <span className="font-medium">{product.name}</span>
                                        {product.isBestseller && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Bestseller</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalStock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No products in stock. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockPage;
