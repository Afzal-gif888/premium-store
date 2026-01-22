import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from 'store/slices/announcementSlice';

const HeroSection = () => {
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
    isAnnouncement: true
  } : {
    title: "Premium Footwear, Guaranteed Availability",
    subtitle: "Know before you go. Discover our collection with real-time stock updates.",
    isAnnouncement: false
  };

  return (
    <section id="announcements" className={`relative min-h-[300px] md:min-h-[350px] flex items-center overflow-hidden bg-card ${heroData.isAnnouncement ? 'bg-indigo-50/30' : ''}`}>
      <div className="gradient-mesh opacity-20"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 text-center">

        <div className="scroll-reveal space-y-4 md:space-y-6">
          {heroData.isAnnouncement && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Current Offer
            </div>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
            {heroData?.title}
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {heroData?.subtitle}
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;