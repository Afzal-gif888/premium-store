import React from 'react';
import Icon from 'components/AppIcon';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date()?.getFullYear();

  const handleNavigation = (path) => {
    // If path is absolute/external or strict route (not part of single page scroll sections)
    if (!path.startsWith('#') && path !== '/') {
      navigate(path);
      return;
    }

    if (location.pathname === '/') {
      // On homepage
      if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const elementId = path.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Not on homepage
      if (path === '/') {
        navigate('/');
      } else {
        navigate('/', { state: { scrollTo: path.replace('#', '') } });
      }
    }
  };

  const footerLinks = {
    shop: [
      { label: "Collection", path: "#collections" },
      { label: "New Arrivals", path: "#collections" },
      { label: "Sale Items", path: "#collections" },
      { label: "Gift Cards", path: "#" } // Placeholder
    ],
    company: [
      { label: "About Us", path: "/" },
      { label: "Announcements", path: "#announcements" },
      { label: "Store Locations", path: "#contact" },
      { label: "Contact", path: "#contact" }
    ],
    support: [
      { label: "Size Guide", path: "#" }, // Placeholder
      { label: "Care Instructions", path: "#" }, // Placeholder
      { label: "Returns Policy", path: "#" }, // Placeholder
      { label: "FAQ", path: "#" } // Placeholder
    ]
  };

  const socialLinks = [
    { icon: "Instagram", label: "Instagram", url: "https://www.instagram.com/premiumstore_2026?igsh=MXAzdTUwcHl0MnI1aQ==" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                <img
                  src="https://res.cloudinary.com/dh8ixjcnu/image/upload/v1737489597/premium_store_branding/store_logo.jpg"
                  alt="Premium Store"
                  className="w-full h-full object-cover"
                />
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
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors text-left"
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
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors text-left"
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
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-accent transition-colors text-left"
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