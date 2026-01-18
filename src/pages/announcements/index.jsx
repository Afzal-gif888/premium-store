import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Icon from '../../components/AppIcon';
import AnnouncementHero from './components/AnnouncementHero';
import AnnouncementCard from './components/AnnouncementCard';
import CategoryFilter from './components/CategoryFilter';
import AnnouncementDetail from './components/AnnouncementDetail';
import NewsletterSignup from './components/NewsletterSignup';
import EmptyState from './components/EmptyState';

const Announcements = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockAnnouncements = [
  {
    id: 1,
    category: "Sale",
    title: "Winter Clearance Sale - Up to 60% Off Premium Footwear",
    excerpt: "Don't miss our biggest sale of the season! Discover incredible savings on premium sneakers, boots, and dress shoes from top brands.",
    content: `We're thrilled to announce our Winter Clearance Sale with unprecedented discounts on our entire premium footwear collection!\n\nThis exclusive event features savings of up to 60% on carefully curated selections from the world's most prestigious footwear brands. Whether you're searching for athletic performance shoes, sophisticated dress footwear, or casual everyday comfort, this is your opportunity to invest in quality at exceptional prices.\n\nOur sale includes limited-edition releases, seasonal favorites, and timeless classics that rarely go on discount. Every pair represents the perfect intersection of craftsmanship, style, and durability that Premium Store is known for.\n\nVisit us in-store to experience our full collection and receive personalized fitting assistance from our expert staff. Our team is ready to help you find the perfect pair that combines style, comfort, and value.\n\nSale runs from January 20th through February 15th, 2026. Limited quantities available on select styles. First come, first served!`,
    date: "2026-01-15T10:00:00",
    readTime: 3,
    heroImage: "https://images.unsplash.com/photo-1699309325355-a9443cd6c6aa",
    heroImageAlt: "Modern retail store interior with elegant shoe displays featuring premium footwear on illuminated shelves with warm ambient lighting",
    image: "https://images.unsplash.com/photo-1699309325355-a9443cd6c6aa",
    imageAlt: "Modern retail store interior with elegant shoe displays featuring premium footwear on illuminated shelves with warm ambient lighting",
    detailImage: "https://images.unsplash.com/photo-1699309325355-a9443cd6c6aa",
    detailImageAlt: "Modern retail store interior with elegant shoe displays featuring premium footwear on illuminated shelves with warm ambient lighting",
    relatedProducts: [
    {
      id: 101,
      name: "Classic Leather Oxford",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1621665422129-a03cc387bc7d",
      imageAlt: "Polished brown leather oxford dress shoes with traditional brogue detailing on white background"
    },
    {
      id: 102,
      name: "Premium Running Sneakers",
      price: 159.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1981c1905-1764664587892.png",
      imageAlt: "Modern athletic running shoes in navy blue and white with mesh upper and cushioned sole"
    },
    {
      id: 103,
      name: "Suede Chelsea Boots",
      price: 189.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18eaf2a6d-1765254159501.png",
      imageAlt: "Tan suede Chelsea boots with elastic side panels and leather pull tab on wooden surface"
    }]

  },
  {
    id: 2,
    category: "New Arrivals",
    title: "Spring 2026 Collection Now Available - Fresh Styles for the Season",
    excerpt: "Introducing our carefully curated Spring 2026 collection featuring the latest trends in premium footwear from international designers.",
    content: `Spring has arrived at Premium Store, and with it comes our most exciting collection yet!\n\nOur Spring 2026 lineup showcases innovative designs from renowned international footwear designers, blending contemporary aesthetics with timeless craftsmanship. Each piece has been hand-selected to represent the season's most compelling trends while maintaining the quality standards our customers expect.\n\nThis collection features breakthrough materials, sustainable manufacturing processes, and cutting-edge comfort technology. From lightweight performance sneakers to sophisticated dress shoes, every style tells a story of innovation and artistry.\n\nHighlights include limited-edition collaborations with emerging designers, eco-friendly materials that don't compromise on style, and versatile designs that transition seamlessly from casual to formal settings.\n\nVisit our store to explore the full Spring 2026 collection and experience these remarkable pieces in person. Our knowledgeable staff is ready to guide you through the latest trends and help you discover your perfect spring style.\n\nNew arrivals are landing weekly throughout the season, so check back often for the latest additions!`,
    date: "2026-01-12T14:30:00",
    readTime: 4,
    heroImage: "https://images.unsplash.com/photo-1693164437035-1b79dbab908c",
    heroImageAlt: "Stylish display of contemporary sneakers and casual footwear arranged on modern geometric shelving with natural lighting",
    image: "https://images.unsplash.com/photo-1693164437035-1b79dbab908c",
    imageAlt: "Stylish display of contemporary sneakers and casual footwear arranged on modern geometric shelving with natural lighting",
    detailImage: "https://images.unsplash.com/photo-1693164437035-1b79dbab908c",
    detailImageAlt: "Stylish display of contemporary sneakers and casual footwear arranged on modern geometric shelving with natural lighting",
    relatedProducts: [
    {
      id: 201,
      name: "Eco-Friendly Canvas Sneakers",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1578269174432-a8073d86c2e0",
      imageAlt: "White canvas sneakers with sustainable materials and minimalist design on neutral background"
    },
    {
      id: 202,
      name: "Designer Loafers",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1701761524927-803d4c91de7f",
      imageAlt: "Luxurious leather loafers in cognac brown with gold hardware detail and tassels"
    }]

  },
  {
    id: 3,
    category: "Events",
    title: "Exclusive VIP Shopping Night - January 25th, 2026",
    excerpt: "Join us for an exclusive after-hours shopping experience with special discounts, refreshments, and personalized styling consultations.",
    content: `Premium Store invites you to our exclusive VIP Shopping Night on January 25th, 2026!\n\nThis special after-hours event is designed to provide our valued customers with an intimate, personalized shopping experience in a relaxed, private setting. Enjoy the store exclusively from 7 PM to 10 PM with complimentary refreshments and expert styling assistance.\n\nEvent highlights include 20% off all purchases made during the evening, first access to our newest arrivals before they hit the main floor, one-on-one consultations with our professional stylists, and complimentary gift wrapping for all purchases.\n\nOur team will be available to provide personalized recommendations, discuss upcoming trends, and help you build a complete footwear wardrobe that suits your lifestyle and preferences.\n\nLight refreshments and beverages will be served throughout the evening, creating a sophisticated atmosphere perfect for leisurely browsing and discovery.\n\nSpace is limited to ensure an intimate experience. RSVP required by January 23rd. Contact us at (555) 123-4567 or visit our store to reserve your spot.\n\nWe look forward to hosting you for this special evening!`,
    date: "2026-01-10T09:00:00",
    readTime: 3,
    heroImage: "https://images.unsplash.com/photo-1674822968853-e8cf0192a63b",
    heroImageAlt: "Elegant boutique interior with sophisticated lighting, modern displays, and curated footwear collection in upscale retail environment",
    image: "https://images.unsplash.com/photo-1674822968853-e8cf0192a63b",
    imageAlt: "Elegant boutique interior with sophisticated lighting, modern displays, and curated footwear collection in upscale retail environment",
    detailImage: "https://images.unsplash.com/photo-1674822968853-e8cf0192a63b",
    detailImageAlt: "Elegant boutique interior with sophisticated lighting, modern displays, and curated footwear collection in upscale retail environment",
    relatedProducts: []
  },
  {
    id: 4,
    category: "Store Updates",
    title: "Extended Hours for Holiday Shopping Convenience",
    excerpt: "We\'re extending our store hours throughout the holiday season to better serve your shopping needs with more flexible visiting times.",
    content: `To better serve our customers during the busy season, Premium Store is pleased to announce extended operating hours!\n\nEffective immediately and continuing through February 28th, 2026, our new hours are: Monday through Friday: 9 AM - 9 PM, Saturday: 9 AM - 10 PM, and Sunday: 10 AM - 8 PM.\n\nThese extended hours provide greater flexibility for customers with busy schedules, allowing you to shop at times that work best for your lifestyle. Whether you're an early bird or prefer evening shopping, we're here to accommodate your needs.\n\nOur full staff will be available during all operating hours to provide the same exceptional service and expertise you've come to expect from Premium Store. Personal styling consultations, fitting assistance, and product recommendations are available throughout our extended hours.\n\nWe've also enhanced our in-store experience with improved lighting, comfortable seating areas, and streamlined checkout processes to make your visit as pleasant and efficient as possible.\n\nThank you for your continued support. We look forward to serving you during our new extended hours!`,
    date: "2026-01-08T11:00:00",
    readTime: 2,
    heroImage: "https://images.unsplash.com/photo-1582482020958-b838acfd9b66",
    heroImageAlt: "Welcoming retail storefront with large glass windows displaying premium footwear collection and illuminated open sign",
    image: "https://images.unsplash.com/photo-1582482020958-b838acfd9b66",
    imageAlt: "Welcoming retail storefront with large glass windows displaying premium footwear collection and illuminated open sign",
    detailImage: "https://images.unsplash.com/photo-1582482020958-b838acfd9b66",
    detailImageAlt: "Welcoming retail storefront with large glass windows displaying premium footwear collection and illuminated open sign",
    relatedProducts: []
  },
  {
    id: 5,
    category: "New Arrivals",
    title: "Limited Edition Designer Collaboration Drops This Week",
    excerpt: "Exclusive partnership brings unique, limited-quantity footwear designs that blend artistic vision with premium craftsmanship.",
    content: `Premium Store is thrilled to announce an exclusive designer collaboration launching this week!\n\nThis limited-edition collection represents a groundbreaking partnership between renowned footwear artisans and contemporary designers, resulting in truly unique pieces that push the boundaries of traditional shoe design.\n\nEach style in this collaboration is produced in extremely limited quantities, making them highly collectible pieces that combine artistic expression with functional excellence. The collection features innovative materials, unexpected color combinations, and architectural silhouettes that challenge conventional footwear aesthetics.\n\nOnly 50 pairs of each design will be available worldwide, with Premium Store receiving an exclusive allocation for our market. These pieces represent investment-worthy additions to any serious footwear collection.\n\nThe collaboration launches in-store on January 22nd, 2026, at 10 AM. Given the limited quantities and high demand anticipated, we recommend arriving early to secure your preferred styles and sizes.\n\nEach purchase includes special edition packaging, a certificate of authenticity, and detailed information about the design inspiration and manufacturing process.\n\nThis is a rare opportunity to own truly distinctive footwear that exists at the intersection of fashion, art, and craftsmanship.`,
    date: "2026-01-05T16:00:00",
    readTime: 4,
    heroImage: "https://images.unsplash.com/photo-1615718225256-dd2890689535",
    heroImageAlt: "Artistic display of avant-garde designer footwear featuring bold colors and innovative materials on minimalist white pedestals",
    image: "https://images.unsplash.com/photo-1615718225256-dd2890689535",
    imageAlt: "Artistic display of avant-garde designer footwear featuring bold colors and innovative materials on minimalist white pedestals",
    detailImage: "https://images.unsplash.com/photo-1615718225256-dd2890689535",
    detailImageAlt: "Artistic display of avant-garde designer footwear featuring bold colors and innovative materials on minimalist white pedestals",
    relatedProducts: [
    {
      id: 301,
      name: "Avant-Garde High-Tops",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1730485632288-ba87bf9c1026",
      imageAlt: "Bold red high-top sneakers with unique architectural design and premium leather construction"
    }]

  },
  {
    id: 6,
    category: "Sale",
    title: "Flash Sale Weekend - 48 Hours of Exceptional Savings",
    excerpt: "This weekend only! Enjoy extraordinary discounts on select premium footwear styles with savings up to 50% off regular prices.",
    content: `Mark your calendars for our exclusive Flash Sale Weekend happening January 27-28, 2026!\n\nFor 48 hours only, Premium Store is offering exceptional savings on carefully selected styles from our premium collection. This is your opportunity to acquire high-quality footwear at prices rarely seen on these prestigious brands.\n\nThe flash sale includes athletic performance shoes, casual lifestyle sneakers, dress shoes, and boots from top-tier manufacturers. Every discounted item maintains the same quality standards and craftsmanship that define Premium Store's reputation.\n\nSavings range from 30% to 50% off regular retail prices, with the deepest discounts on seasonal styles and limited-quantity items. This is an ideal time to stock up on multiple pairs or try brands you've been considering.\n\nAll flash sale items are available while supplies last, and quantities are limited on many styles. We recommend shopping early in the weekend to ensure the best selection of sizes and styles.\n\nNo rain checks or special orders on flash sale items. All sales are final on discounted merchandise.\n\nDon't miss this rare opportunity to build your footwear collection with premium quality at exceptional values!`,
    date: "2026-01-03T13:00:00",
    readTime: 3,
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec39477d-1766416785947.png",
    heroImageAlt: "Dynamic retail display featuring sale signage and diverse collection of premium footwear with promotional pricing tags",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec39477d-1766416785947.png",
    imageAlt: "Dynamic retail display featuring sale signage and diverse collection of premium footwear with promotional pricing tags",
    detailImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec39477d-1766416785947.png",
    detailImageAlt: "Dynamic retail display featuring sale signage and diverse collection of premium footwear with promotional pricing tags",
    relatedProducts: [
    {
      id: 401,
      name: "Performance Training Shoes",
      price: 119.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_161665ee2-1767444047258.png",
      imageAlt: "Black and neon athletic training shoes with breathable mesh upper and responsive cushioning system"
    },
    {
      id: 402,
      name: "Casual Slip-Ons",
      price: 79.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab9ddaee-1766057438003.png",
      imageAlt: "Comfortable gray slip-on shoes with elastic panels and memory foam insole for everyday wear"
    }]

  }];


  const categories = ['Sale', 'New Arrivals', 'Events', 'Store Updates'];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredAnnouncements = activeCategory === 'All' ?
  mockAnnouncements :
  mockAnnouncements?.filter((announcement) => announcement?.category === activeCategory);

  const featuredAnnouncement = mockAnnouncements?.[0];

  const handleViewDetails = (id) => {
    const announcement = mockAnnouncements?.find((a) => a?.id === id);
    setSelectedAnnouncement(announcement);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDetail = () => {
    setSelectedAnnouncement(null);
  };

  const handleShare = (announcement, platform = 'Link') => {
    const shareText = `Check out this announcement from Premium Store: ${announcement?.title}`;
    const shareUrl = `${window.location?.origin}/announcements/${announcement?.id}`;

    if (platform === 'Link') {
      navigator.clipboard?.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } else {
      alert(`Sharing to ${platform}: ${shareText}`);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilter = () => {
    setActiveCategory('All');
  };

  if (selectedAnnouncement) {
    return (
      <AnnouncementDetail
        announcement={selectedAnnouncement}
        onClose={handleCloseDetail}
        onShare={handleShare} />);


  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="relative">
          <div className="gradient-mesh" />
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                Latest Announcements
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
                Stay informed about exclusive sales, new arrivals, special events, and important store updates. Be the first to know about exciting opportunities at Premium Store.
              </p>
            </div>

            {isLoading ?
            <div className="space-y-8">
                <div className="skeleton skeleton-shimmer w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl" />
                <div className="skeleton skeleton-shimmer w-full h-32 rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3]?.map((i) =>
                <div key={i} className="skeleton skeleton-shimmer w-full h-96 rounded-xl" />
                )}
                </div>
              </div> :

            <>
                <div className="mb-8 md:mb-12">
                  <AnnouncementHero
                  announcement={featuredAnnouncement}
                  onViewDetails={handleViewDetails} />

                </div>

                <div className="mb-8 md:mb-12">
                  <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange} />

                </div>

                {filteredAnnouncements?.length === 0 ?
              <EmptyState
                category={activeCategory}
                onReset={handleResetFilter} /> :


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {filteredAnnouncements?.slice(1)?.map((announcement) =>
                <div key={announcement?.id} className="scroll-reveal">
                        <AnnouncementCard
                    announcement={announcement}
                    onViewDetails={handleViewDetails} />

                      </div>
                )}
                  </div>
              }

                <div className="mb-12 md:mb-16">
                  <NewsletterSignup />
                </div>

                <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-headline)' }}>
                        Visit Our Store
                      </h2>
                      <p className="text-base md:text-lg text-muted-foreground mb-4">
                        Experience our full collection in person and receive expert assistance from our knowledgeable staff.
                      </p>
                      <div className="flex flex-col gap-3 text-sm md:text-base text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <Icon name="MapPin" size={20} color="var(--color-primary)" />
                          <span>123 Premium Avenue, Fashion District, NY 10001</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Phone" size={20} color="var(--color-primary)" />
                          <span>(555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Clock" size={20} color="var(--color-primary)" />
                          <span>Mon-Fri: 9 AM - 9 PM | Sat: 9 AM - 10 PM | Sun: 10 AM - 8 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                      <button
                      onClick={() => navigate('/collection')}
                      className="cta-button cta-button-primary w-full md:w-auto">

                        Browse Collection
                      </button>
                      <button
                      onClick={() => window.location.href = 'tel:5551234567'}
                      className="cta-button cta-button-secondary w-full md:w-auto">

                        Call Us Now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                About Premium Store
              </h3>
              <p className="text-sm text-muted-foreground">
                Your trusted destination for premium footwear. We bridge digital convenience with physical retail excellence.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/homepage')} className="text-sm text-muted-foreground hover:text-primary text-left transition-colors">
                  Home
                </button>
                <button onClick={() => navigate('/collection')} className="text-sm text-muted-foreground hover:text-primary text-left transition-colors">
                  Collection
                </button>
                <button onClick={() => navigate('/announcements')} className="text-sm text-muted-foreground hover:text-primary text-left transition-colors">
                  Announcements
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                  <Icon name="Facebook" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                  <Icon name="Instagram" size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                  <Icon name="Twitter" size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date()?.getFullYear()} Premium Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Announcements;