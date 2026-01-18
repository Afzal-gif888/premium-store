import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getAvailabilityBadge = () => {
    const totalStock = product?.sizes?.reduce((sum, size) => sum + size?.stock, 0);
    
    if (totalStock === 0) {
      return {
        text: 'Out of Stock',
        className: 'availability-badge out-of-stock'
      };
    } else if (totalStock <= 5) {
      return {
        text: 'Low Stock',
        className: 'availability-badge low-stock'
      };
    } else {
      return {
        text: 'In Stock',
        className: 'availability-badge in-stock'
      };
    }
  };

  const handleCardClick = () => {
    navigate('/product-details', { state: { product } });
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product?.images?.length - 1 : prev - 1
    );
  };

  const badge = getAvailabilityBadge();

  return (
    <div
      className="product-card cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <Image
          src={product?.images?.[currentImageIndex]?.url}
          alt={product?.images?.[currentImageIndex]?.alt}
          className="product-card-image"
        />
        
        <div className={badge?.className}>
          {badge?.text}
        </div>

        {product?.images?.length > 1 && isHovered && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg hover:bg-card transition-all duration-200"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={20} color="var(--color-foreground)" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg hover:bg-card transition-all duration-200"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={20} color="var(--color-foreground)" />
            </button>
          </>
        )}

        {product?.images?.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product?.images?.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-primary w-4' :'bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="product-card-content space-y-2">
        <h3 className="product-card-title line-clamp-2">
          {product?.name}
        </h3>
        
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1" style={{ fontFamily: 'var(--font-body)' }}>
          {product?.category}
        </p>

        <div className="flex items-center justify-between">
          <p className="product-card-price">
            ${product?.price?.toFixed(2)}
          </p>
          
          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Icon name="Package" size={14} color="var(--color-muted-foreground)" />
            <span style={{ fontFamily: 'var(--font-body)' }}>
              {product?.sizes?.filter(s => s?.stock > 0)?.length} sizes
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
          iconSize={16}
          onClick={handleCardClick}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;