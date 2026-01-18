import React from 'react';
import Icon from 'components/AppIcon';

const StoreContact = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Visit Our Store',
      content: '123 Premium Street, Fashion District, New York, NY 10001',
      action: 'Get Directions',
      link: '#'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      action: 'Call Now',
      link: 'tel:+15551234567'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      content: 'support@premiumstore.com',
      action: 'Send Email',
      link: 'mailto:support@premiumstore.com'
    },
    {
      icon: 'Clock',
      title: 'Store Hours',
      content: 'Mon-Sat: 10:00 AM - 8:00 PM\nSun: 11:00 AM - 6:00 PM',
      action: null,
      link: null
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Store" size={24} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Need Help?
          </h2>
          <p className="text-sm text-muted-foreground">
            Contact us for product inquiries
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {contactInfo?.map((info, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-muted rounded-lg"
          >
            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={info?.icon} size={20} color="var(--color-accent)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {info?.title}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line mb-2">
                {info?.content}
              </p>
              {info?.action && (
                <a
                  href={info?.link}
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  <span>{info?.action}</span>
                  <Icon name="ArrowRight" size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Store Location
        </h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Premium Store Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7589,-73.9851&z=14&output=embed"
            className="border-0"
          />
        </div>
      </div>
      <div className="bg-accent/10 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Visit Us In-Store
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Check product availability before visiting. Our staff is ready to help you find the perfect fit and answer any questions about our products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreContact;