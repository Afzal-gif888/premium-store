import React from 'react';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const heroData = {
    title: "Premium Footwear, Guaranteed Availability",
    subtitle: "Know before you go. Discover our collection with real-time stock updates.",
    ctaPrimary: "Browse Collection",
    ctaSecondary: "View Announcements",
    heroImage: "https://images.unsplash.com/photo-1693255501587-e5a4548180e3",
    heroImageAlt: "Elegant display of premium leather shoes arranged on modern minimalist shelving with soft natural lighting highlighting craftsmanship and quality materials in sophisticated retail environment"
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-card">
      <div className="gradient-mesh"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          <div className="scroll-reveal space-y-6 md:space-y-8 lg:space-y-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {heroData?.title}
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {heroData?.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('/collection')}
                className="cta-button cta-button-primary">

                {heroData?.ctaPrimary}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/announcements')}
                className="cta-button cta-button-secondary">

                {heroData?.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="scroll-reveal relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
              <Image
                src={heroData?.heroImage}
                alt={heroData?.heroImageAlt}
                className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>);

};

export default HeroSection;