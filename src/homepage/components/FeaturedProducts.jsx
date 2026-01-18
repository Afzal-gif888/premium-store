import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const featuredProducts = [
  {
    id: 1,
    name: "Classic Oxford Leather",
    price: 189.99,
    category: "Formal",
    availability: "in-stock",
    availabilityText: "In Stock",
    image: "https://images.unsplash.com/photo-1621665422129-a03cc387bc7d",
    imageAlt: "Premium brown leather Oxford dress shoes with classic brogue detailing and polished finish displayed on white background showcasing traditional craftsmanship and formal elegance"
  },
  {
    id: 2,
    name: "Urban Sneaker Elite",
    price: 149.99,
    category: "Casual",
    availability: "low-stock",
    availabilityText: "Low Stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13ef60586-1767723958930.png",
    imageAlt: "Modern white leather sneakers with minimalist design and subtle brand detailing on clean surface highlighting contemporary urban fashion and versatile casual style"
  },
  {
    id: 3,
    name: "Executive Loafer Pro",
    price: 219.99,
    category: "Business",
    availability: "in-stock",
    availabilityText: "In Stock",
    image: "https://images.unsplash.com/photo-1677203232799-90a8fc4ed47f",
    imageAlt: "Sophisticated black leather loafers with sleek silhouette and premium stitching detail photographed against neutral backdrop emphasizing professional business attire quality"
  },
  {
    id: 4,
    name: "Sport Runner Max",
    price: 129.99,
    category: "Athletic",
    availability: "in-stock",
    availabilityText: "In Stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19d012242-1764677610915.png",
    imageAlt: "Dynamic athletic running shoes in vibrant blue and orange colorway with breathable mesh upper and cushioned sole captured in action-ready position for performance sports"
  }];


  const handleProductClick = (productId) => {
    navigate('/product-details', { state: { productId } });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12 lg:mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Featured Collection
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium footwear with guaranteed availability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts?.map((product, index) =>
          <div
            key={product?.id}
            className="product-card scroll-reveal cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleProductClick(product?.id)}>

              <div className="relative overflow-hidden aspect-square">
                <Image
                src={product?.image}
                alt={product?.imageAlt}
                className="product-card-image hover:scale-110 transition-transform duration-500" />

                <div className={`availability-badge ${product?.availability}`}>
                  {product?.availabilityText}
                </div>
              </div>

              <div className="product-card-content">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {product?.category}
                  </span>
                </div>

                <h3 className="product-card-title line-clamp-2 mb-3">
                  {product?.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="product-card-price">
                    ${product?.price?.toFixed(2)}
                  </span>
                  <button
                  className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleProductClick(product?.id);
                  }}>

                    View Details
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <button
            onClick={() => navigate('/collection')}
            className="cta-button cta-button-primary inline-flex items-center gap-2">

            View Full Collection
            <Icon name="ArrowRight" size={20} />
          </button>
        </div>

      </div>
    </section>);

};

export default FeaturedProducts;