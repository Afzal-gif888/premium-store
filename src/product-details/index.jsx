import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import Icon from 'components/AppIcon';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(state => state.stock.products);
  // MongoDB uses _id, frontend might use id. Check both.
  const product = products.find(p => (p._id === id) || (p.id === id));

  const [selectedSize, setSelectedSize] = useState(null);

  // If product not found (or deleted)
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center p-20">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="text-blue-600 underline">Return to Home</button>
        </div>
      </div>
    );
  }

  // Transform sizes object { '7': 5, '8': 0 } to array format expected by logic
  const sizeList = Object.entries(product.sizes || {}).map(([size, qty]) => ({
    size,
    stock: qty,
    available: qty > 0,
    fitNote: qty > 0 ? `${qty} pairs available` : 'Out of Stock'
  }));

  // Main image + others
  const allImages = product.images && product.images.length > 0
    ? product.images.map(url => ({ url, alt: product.name }))
    : [{ url: 'https://via.placeholder.com/400', alt: 'No Image' }];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* Back Button */}
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-black mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={allImages[0].url}
                alt={allImages[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {allImages.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-2">
              <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
              {product.isBestseller && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-bold">BESTSELLER</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-900 font-medium mb-8">${product.price?.toFixed(2)}</p>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Select Size</h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {sizeList.map((item) => (
                  <button
                    key={item.size}
                    disabled={!item.available}
                    onClick={() => setSelectedSize(item)}
                    className={`
                                            py-3 text-sm font-bold rounded-md border
                                            ${selectedSize?.size === item.size
                        ? 'bg-black text-white border-black'
                        : item.available
                          ? 'bg-white text-gray-900 border-gray-200 hover:border-gray-900'
                          : 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'}
                                        `}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  In Stock: {selectedSize.stock} pairs left
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex items-start gap-4">
                <Icon name="Store" size={24} className="text-gray-900 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Visit Premium Store</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    We are an offline retail showcase. Please visit our physical location to purchase this item.
                  </p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>123 Fashion Avenue</p>
                    <p>New York, NY 10001</p>
                    <p>Mon-Sat: 10am - 9pm</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedSize}
              onClick={() => alert("Please visit our store to purchase!")}
            >
              {selectedSize ? 'Available at Store' : 'Select a Size'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;