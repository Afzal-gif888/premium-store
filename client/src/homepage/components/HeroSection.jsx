import React, { useEffect } from 'react';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from 'store/slices/announcementSlice';
const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const announcements = useSelector(state => state.announcements.items);
  const status = useSelector(state => state.announcements.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnnouncements());
    }
  }, [status, dispatch]);

  const latestAnnouncement = announcements.length > 0 ? announcements[0] : null;

  const heroData = latestAnnouncement ? {
    title: latestAnnouncement.title,
    subtitle: latestAnnouncement.description,
    ctaPrimary: "Shop This Offer",
    isAnnouncement: true
  } : {
    title: "Premium Footwear, Guaranteed Availability",
    subtitle: "Know before you go. Discover our collection with real-time stock updates.",
    ctaPrimary: "Browse Collection",
    isAnnouncement: false
  };

  const handleCtaClick = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <section id="announcements" className={`relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-card ${heroData.isAnnouncement ? 'bg-indigo-50/30' : ''}`}>
      <div className="gradient-mesh opacity-20"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 text-center">

        <div className="scroll-reveal space-y-8 md:space-y-10">
          {heroData.isAnnouncement && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Current Offer
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
            {heroData?.title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroData?.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleCtaClick}
              className="px-10 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform">
              {heroData?.ctaPrimary}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;