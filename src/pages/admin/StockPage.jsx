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
        images: [], // array of base64 strings
        sizes: SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
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
        if (formData.images.length === 0) {
            alert("At least one image is required.");
            return;
        }

        const productData = {
            id: editId || Date.now().toString(),
            ...formData,
            price: parseFloat(formData.price),
            isBestseller: editId ? products.find(p => p.id === editId)?.isBestseller : false,
            createdAt: new Date().toISOString()
        };

        if (editId) {
            dispatch(updateProduct(productData));
        } else {
            dispatch(addProduct(productData));
        }

        resetForm();
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            images: product.images || [],
            sizes: product.sizes || SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
        });
        setEditId(product.id);
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

                        <div>
                            <label className="block text-sm font-medium mb-2">Images</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                            <div className="flex gap-2 flex-wrap">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden group">
                                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(idx)}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs opacity-0 group-hover:opacity-100"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                            const totalStock = product.sizes ? Object.values(product.sizes).reduce((a, b) => a + b, 0) : 0;
                            return (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                        {product.images?.[0] && (
                                            <img src={product.images[0]} alt="" className="h-10 w-10 rounded object-cover" />
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
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
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
