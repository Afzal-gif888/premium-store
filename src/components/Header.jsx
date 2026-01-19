import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'announcements', label: 'Announcements', icon: 'Bell' },
    { id: 'collections', label: 'Collections', icon: 'ShoppingBag' },
    { id: 'bestsellers', label: 'Bestsellers', icon: 'Star' },
    { id: 'contact', label: 'Contact', icon: 'Phone' },
  ];

  return (
    <>
      <header className="header sticky top-0 z-50 bg-white shadow-sm">
        <div className="header-container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="header-logo flex items-center gap-2">
            <div className="header-logo-icon">
              <Icon name="Store" size={24} color="var(--color-primary)" />
            </div>
            <span className="header-logo-text font-bold text-xl">Premium Store</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-600 hover:text-black font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link to="/admin" className="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="header-actions md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button p-2"
              aria-label="Toggle mobile menu"
            >
              <Icon
                name={isMobileMenuOpen ? 'X' : 'Menu'}
                size={24}
                color="var(--color-foreground)"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-40 bg-white pt-20 px-4">
          <nav className="mobile-menu-nav flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center gap-3 p-3 text-lg border-b border-gray-100"
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 text-lg border-b border-gray-100 font-bold"
            >
              <Icon name="LayoutDashboard" size={20} />
              <span>Admin Panel</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;