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
    <section id="announcements" className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-card">
      <div className="gradient-mesh"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          <div className="scroll-reveal space-y-6 md:space-y-8 lg:space-y-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
              <Image
                src={activeHero.image || activeHero.heroImage} // Support both keys
                alt={activeHero.heroImageAlt || activeHero.title}
                className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;