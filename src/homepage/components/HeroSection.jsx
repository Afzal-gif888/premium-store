import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';
import bgimg from "./bgimg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const announcements = useSelector(state => state.announcements.items);

  // Use latest announcement or fallback default
  const activeHero = announcements.length > 0 ? announcements[0] : {
    title: "Premium Footwear, Guaranteed Availability",
    subtitle: "Know before you go. Discover our collection with real-time stock updates.",
    image: bgimg,
    ctaPrimary: "Browse Collection",
    ctaSecondary: "View Announcements",
    heroImageAlt: "Premium Store Showcase"
  };

  const scrollToCollections = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="announcements" className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden bg-card">
      <div className="gradient-mesh"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          <div className="scroll-reveal space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {activeHero.title}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {activeHero.subtitle || activeHero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={scrollToCollections}
                className="cta-button cta-button-primary">
                Browse Collection
              </Button>
            </div>
          </div>

          <div className="scroll-reveal relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src={activeHero.image || activeHero.heroImage} // Support both keys
                alt={activeHero.heroImageAlt || activeHero.title}
                className="w-full h-full object-cover" />

              {/* Text Transparent Overlay Effect */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                {/* Optional: If user wanted text ON the image, we'd put it here.
                     But looking at the request 'text should be transparent on the image', likely refers to a watermark or overlay style.
                     Since the main text is side-by-side in this layout, I'm adding a subtle overlay to the image itself to make it look 'premium'.
                  */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;