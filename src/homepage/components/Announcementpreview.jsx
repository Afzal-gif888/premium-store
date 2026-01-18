import React from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';

const AnnouncementPreview = () => {
  const navigate = useNavigate();

  const latestAnnouncements = [
  {
    id: 1,
    title: "New Spring Collection Arrives",
    excerpt: "Discover our latest spring footwear collection featuring vibrant colors and contemporary designs perfect for the season.",
    date: "2026-01-15",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17538e718-1768337476043.png",
    imageAlt: "Colorful spring footwear collection displayed on modern retail shelving with natural lighting showcasing vibrant seasonal designs and contemporary styling for warm weather fashion",
    badge: "New Arrival"
  },
  {
    id: 2,
    title: "Weekend Sale - Up to 30% Off",
    excerpt: "Limited time offer on selected premium footwear. Visit our store this weekend to explore exclusive deals on quality shoes.",
    date: "2026-01-12",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_145dd3338-1768752258745.png",
    imageAlt: "Premium footwear sale display with elegant shoes arranged attractively on promotional stand featuring discount signage and quality leather products in upscale retail environment",
    badge: "Sale"
  }];


  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 lg:mb-16 gap-4">
          <div className="scroll-reveal text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3">
              Latest Updates
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Stay informed about new arrivals and exclusive offers
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/announcements')}
            iconName="ArrowRight"
            iconPosition="right"
            className="scroll-reveal">

            View All Announcements
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {latestAnnouncements?.map((announcement, index) =>
          <div
            key={announcement?.id}
            className="scroll-reveal bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate('/announcements')}>

              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <Image
                src={announcement?.image}
                alt={announcement?.imageAlt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {announcement?.badge}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {new Date(announcement.date)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 line-clamp-2">
                  {announcement?.title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-3">
                  {announcement?.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-accent hover:text-accent/80 transition-colors">
                  Read More
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>);

};

export default AnnouncementPreview;