import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const AnnouncementPreview = () => {
  const announcements = useSelector(state => state.announcements.items);

  // The first announcement is shown in Hero. Show the rest here.
  const pastAnnouncements = announcements.length > 1 ? announcements.slice(1) : [];

  if (pastAnnouncements.length === 0) {
    return null;
  }

  return (
    <section id="latest-updates" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 lg:mb-16 gap-4">
          <div className="scroll-reveal text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3">
              Previous Updates
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Missed our latest news? Catch up here.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {pastAnnouncements.map((announcement, index) =>
            <div
              key={announcement._id || announcement.id || index}
              className="scroll-reveal bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}>

              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <Image
                  src={announcement.image}
                  alt={announcement.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Recently'}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 line-clamp-2">
                  {announcement.title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-3">
                  {announcement.description}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AnnouncementPreview;