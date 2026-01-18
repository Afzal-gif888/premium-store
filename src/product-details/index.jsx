import React, { useState } from 'react';
import Header from 'components/Header';
import Icon from 'components/AppIcon';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import SizeSelector from './components/SizeSelector';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import StoreContact from './components/StoreContact';

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const productData = {
    id: 1,
    name: "Premium Leather Oxford Shoes",
    category: "Men\'s Formal Footwear",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 181,
    description: "Elevate your formal wardrobe with these meticulously crafted premium leather Oxford shoes. Featuring a timeless design that seamlessly blends traditional craftsmanship with modern comfort technology, these shoes are perfect for the discerning professional. The full-grain leather upper develops a beautiful patina over time, while the cushioned insole and flexible sole ensure all-day comfort during important meetings and events.",
    features: [
    "Full-grain premium leather upper with natural finish",
    "Goodyear welt construction for durability and resolability",
    "Memory foam cushioned insole with arch support",
    "Leather-lined interior for breathability and comfort",
    "Non-slip rubber sole with excellent traction",
    "Classic lace-up closure with reinforced eyelets",
    "Available in multiple widths for perfect fit"],

    materials: {
      upper: "Full-grain premium leather",
      sole: "Durable rubber with leather midsole",
      lining: "Soft leather with moisture-wicking properties",
      insole: "Memory foam with arch support"
    },
    careInstructions: [
    "Clean with soft, damp cloth after each wear",
    "Apply leather conditioner monthly to maintain suppleness",
    "Use shoe trees to maintain shape when not in use",
    "Store in a cool, dry place away from direct sunlight",
    "Professional cleaning recommended for deep stains",
    "Rotate with other shoes to extend lifespan"],

    images: [
    {
      url: "https://images.unsplash.com/photo-1676374303833-67474dda1c17",
      alt: "Premium black leather Oxford dress shoes with classic lace-up design displayed on white background showing side profile view"
    },
    {
      url: "https://images.unsplash.com/photo-1594551597526-c0b8c8096edb",
      alt: "Close-up detail shot of Oxford shoe leather texture showing fine grain and quality stitching craftsmanship"
    },
    {
      url: "https://images.unsplash.com/photo-1603796847227-9183fd69e884",
      alt: "Top-down view of pair of black Oxford shoes showing symmetrical lacing pattern and polished leather finish"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1108ea5fe-1765274105118.png",
      alt: "Rear view of Oxford shoes displaying heel construction and sole attachment with visible stitching details"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1da4a2372-1765274100222.png",
      alt: "Side angle view of Oxford shoe sole showing tread pattern and rubber grip design for traction"
    }],

    sizes: [
    { size: "7", stock: 5, available: true, fitNote: "True to size with standard width" },
    { size: "8", stock: 8, available: true, fitNote: "True to size with standard width" },
    { size: "9", stock: 12, available: true, fitNote: "True to size with standard width" },
    { size: "10", stock: 2, available: true, fitNote: "True to size with standard width" },
    { size: "11", stock: 6, available: true, fitNote: "True to size with standard width" },
    { size: "12", stock: 0, available: false, fitNote: "Currently out of stock" }]

  };

  const reviewsData = {
    averageRating: 4.8,
    totalReviews: 181,
    reviews: [
    {
      id: 1,
      customerName: "Michael Thompson",
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd76b3a7-1763291706254.png",
      customerImageAlt: "Professional headshot of middle-aged Caucasian man with short brown hair wearing navy blue business suit",
      rating: 5,
      date: "January 10, 2026",
      verified: true,
      comment: "Absolutely exceptional quality! These Oxford shoes exceeded my expectations in every way. The leather is incredibly soft yet durable, and the fit is perfect right out of the box. I've worn them to multiple business meetings and received countless compliments. The comfort level is outstanding - no break-in period needed. Worth every penny for the craftsmanship and attention to detail.",
      sizeOrdered: "10",
      fit: "True to size",
      helpfulCount: 24,
      images: [
      {
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbcc85b2-1767637887096.png",
        alt: "Customer photo showing Oxford shoes worn with dark gray business suit and matching belt in office setting"
      },
      {
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbcc85b2-1767637887096.png",
        alt: "Close-up customer photo of Oxford shoe leather showing natural patina development after two weeks of wear"
      }]

    },
    {
      id: 2,
      customerName: "David Chen",
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7561ea2-1763295644596.png",
      customerImageAlt: "Professional headshot of Asian man with black hair and glasses wearing charcoal business suit with burgundy tie",
      rating: 5,
      date: "January 8, 2026",
      verified: true,
      comment: "Best dress shoes I\'ve ever owned! The Goodyear welt construction means these will last for years. The memory foam insole provides incredible comfort even during long days on my feet. The classic design pairs perfectly with both suits and business casual attire. Highly recommend for anyone looking for quality formal footwear.",
      sizeOrdered: "9",
      fit: "True to size",
      helpfulCount: 18,
      images: []
    },
    {
      id: 3,
      customerName: "Robert Martinez",
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_103972665-1763296698542.png",
      customerImageAlt: "Professional headshot of Hispanic man with short black hair wearing black suit with white dress shirt",
      rating: 4,
      date: "January 5, 2026",
      verified: true,
      comment: "Very impressed with the quality and comfort. The leather is premium grade and the construction is solid. Only giving 4 stars because I wish they came in more color options. The black is beautiful, but would love to see brown or burgundy versions. Overall, excellent purchase and great value for the price point.",
      sizeOrdered: "11",
      fit: "True to size",
      helpfulCount: 12,
      images: [
      {
        url: "https://images.unsplash.com/photo-1702977276892-b64390befc32",
        alt: "Customer photo showing Oxford shoes paired with navy pinstripe suit and leather briefcase"
      }]

    },
    {
      id: 4,
      customerName: "James Wilson",
      customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1137e7a04-1763296927252.png",
      customerImageAlt: "Professional headshot of young Caucasian man with blonde hair wearing light gray suit with blue tie",
      rating: 5,
      date: "January 2, 2026",
      verified: true,
      comment: "These shoes are a game-changer for my professional wardrobe. The attention to detail is remarkable - from the stitching to the leather quality. They're comfortable enough to wear all day without any discomfort. The non-slip sole is a great feature for rainy days. Definitely recommend sizing up if you're between sizes.",
      sizeOrdered: "8",
      fit: "Slightly snug, recommend sizing up",
      helpfulCount: 15,
      images: []
    }]

  };

  const relatedProductsData = [
  {
    id: 2,
    name: "Classic Leather Loafers",
    category: "Men\'s Casual Footwear",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    availability: "in-stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11f8d050f-1766493608545.png",
    imageAlt: "Brown leather penny loafers with slip-on design and decorative strap across vamp on white background"
  },
  {
    id: 3,
    name: "Suede Chelsea Boots",
    category: "Men\'s Boots",
    price: 219.99,
    originalPrice: null,
    rating: 4.9,
    availability: "low-stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18eaf2a6d-1765254159501.png",
    imageAlt: "Tan suede Chelsea boots with elastic side panels and pull tab showing ankle-high silhouette"
  },
  {
    id: 4,
    name: "Wingtip Brogues",
    category: "Men\'s Formal Footwear",
    price: 169.99,
    originalPrice: 229.99,
    rating: 4.7,
    availability: "in-stock",
    image: "https://images.unsplash.com/photo-1571956825844-fa4cc462a64e",
    imageAlt: "Dark brown leather wingtip brogue shoes with decorative perforations and medallion toe cap design"
  },
  {
    id: 5,
    name: "Monk Strap Shoes",
    category: "Men\'s Formal Footwear",
    price: 199.99,
    originalPrice: null,
    rating: 4.5,
    availability: "out-of-stock",
    image: "https://images.unsplash.com/photo-1616596825591-1d26bc8c51c6",
    imageAlt: "Black leather double monk strap shoes with silver buckles and sleek minimalist design"
  }];


  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before proceeding');
      return;
    }
    alert(`Size ${selectedSize?.size} added to your shopping list! Visit our store to complete your purchase.`);
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: productData?.name,
        text: `Check out ${productData?.name} at Premium Store`,
        url: window.location?.href
      });
    } else {
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
            {/* Left Column - Image Gallery */}
            <div>
              <ImageGallery images={productData?.images} productName={productData?.name} />
            </div>

            {/* Right Column - Product Info & Actions */}
            <div className="space-y-6 md:space-y-8">
              <ProductInfo product={productData} />

              {/* Size Selection */}
              <div className="border-t border-border pt-6 md:pt-8">
                <SizeSelector sizes={productData?.sizes} onSizeSelect={handleSizeSelect} />
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 lg:relative bg-background lg:bg-transparent border-t lg:border-t-0 border-border pt-4 lg:pt-0 -mx-4 px-4 lg:mx-0 lg:px-0 pb-4 lg:pb-0 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full px-6 py-4 rounded-lg font-bold text-base transition-all ${
                  selectedSize ?
                  'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg' :
                  'bg-muted text-muted-foreground cursor-not-allowed'}`
                  }>

                  {selectedSize ? 'Visit Store to Purchase' : 'Select Size First'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleShareProduct}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors">

                    <Icon name="Share2" size={20} />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors">
                    <Icon name="Heart" size={20} />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Store Contact Info */}
              <div className="hidden lg:block">
                <StoreContact />
              </div>
            </div>
          </div>

          {/* Mobile Store Contact */}
          <div className="lg:hidden mb-12 md:mb-16">
            <StoreContact />
          </div>

          {/* Customer Reviews Section */}
          <div className="mb-12 md:mb-16 lg:mb-20">
            <CustomerReviews
              reviews={reviewsData?.reviews}
              averageRating={reviewsData?.averageRating}
              totalReviews={reviewsData?.totalReviews} />

          </div>

          {/* Related Products Section */}
          <div>
            <RelatedProducts products={relatedProductsData} />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 md:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Store" size={24} color="var(--color-accent)" />
                </div>
                <span className="text-xl font-bold text-foreground">Premium Store</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted destination for premium footwear. Quality craftsmanship meets modern style.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/collection" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Collection
                  </a>
                </li>
                <li>
                  <a href="/announcements" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Announcements
                  </a>
                </li>
                <li>
                  <a href="/homepage" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Size Guide</li>
                <li className="text-sm text-muted-foreground">Shipping Info</li>
                <li className="text-sm text-muted-foreground">Returns Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">Connect With Us</h3>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors">
                  <Icon name="Facebook" size={20} color="var(--color-foreground)" />
                </a>
                <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors">
                  <Icon name="Instagram" size={20} color="var(--color-foreground)" />
                </a>
                <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors">
                  <Icon name="Twitter" size={20} color="var(--color-foreground)" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date()?.getFullYear()} Premium Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ProductDetails;