import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import Bestsellers from './components/Bestsellers';
import AnnouncementPreview from './components/Announcementpreview';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        // Clear state to prevent scrolling on subsequent renders check
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

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
        <Bestsellers />
        <AnnouncementPreview />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;