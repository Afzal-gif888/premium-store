import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.stock.products);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="collections" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        <div className="text-center mb-8 md:mb-12 lg:mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Our Collection
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our complete inventory, updated in real-time.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={product._id || product.id}
                className="product-card scroll-reveal cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleProductClick(product._id || product.id)}>

                <div className="relative overflow-hidden aspect-square bg-gray-100">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="product-card-image hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Icon name="Image" size={48} />
                    </div>
                  )}
                </div>

                <div className="product-card-content">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
                    <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="product-card-title line-clamp-2 mb-3">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="product-card-price">
                      ${product.price?.toFixed(2)}
                    </span>
                    <button
                      className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleProductClick(product._id || product.id);
                      }}>
                      View
                      <Icon name="ArrowRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;