import React from 'react';
import Icon from 'components/AppIcon';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    shop: [
      { label: "Collection", path: "/collection" },
      { label: "New Arrivals", path: "/collection" },
      { label: "Sale Items", path: "/collection" },
      { label: "Gift Cards", path: "/collection" }
    ],
    company: [
      { label: "About Us", path: "/homepage" },
      { label: "Announcements", path: "/announcements" },
      { label: "Store Locations", path: "/homepage" },
      { label: "Contact", path: "/homepage" }
    ],
    support: [
      { label: "Size Guide", path: "/homepage" },
      { label: "Care Instructions", path: "/homepage" },
      { label: "Returns Policy", path: "/homepage" },
      { label: "FAQ", path: "/homepage" }
    ]
  };

  const socialLinks = [
    { icon: "Facebook", label: "Facebook", url: "#" },
    { icon: "Instagram", label: "Instagram", url: "#" },
    { icon: "Twitter", label: "Twitter", url: "#" },
    { icon: "Youtube", label: "YouTube", url: "#" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Store" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-primary">Premium Store</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Your smart retail companion for premium footwear. Know before you go.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks?.shop?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Premium Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;