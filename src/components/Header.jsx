import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/homepage', label: 'Home', icon: 'Home' },
    { path: '/collection', label: 'Collection', icon: 'ShoppingBag' },
    { path: '/announcements', label: 'Announcements', icon: 'Bell' },
    { path: '/admin-dashboard', label: 'Admin', icon: 'LayoutDashboard' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/homepage" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="Store" size={24} color="var(--color-primary)" />
            </div>
            <span className="header-logo-text">Premium Store</span>
          </Link>

          <nav className="header-nav">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-link ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
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
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <nav className="mobile-menu-nav">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`mobile-menu-link ${isActivePath(item?.path) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon
                    name={item?.icon}
                    size={20}
                    color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'}
                  />
                  <span className="mobile-menu-link-text">{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;