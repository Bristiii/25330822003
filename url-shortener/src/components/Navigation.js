import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  
  // Don't show navigation on redirect pages
  if (location.pathname !== '/' && location.pathname !== '/stats') {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">URL Shortener</Link>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Create Link
          </Link>
          <Link 
            to="/stats" 
            className={location.pathname === '/stats' ? 'active' : ''}
          >
            Statistics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;