import React, { useEffect } from 'react';
import Header from 'components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import TrustSignals from './components/TrustSignals';
import AnnouncementPreview from './components/Announcementpreview';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements?.forEach(el => observer?.observe(el));

    return () => {
      scrollRevealElements?.forEach(el => observer?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <HeroSection />
        <FeaturedProducts />
        <TrustSignals />
        <AnnouncementPreview />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;