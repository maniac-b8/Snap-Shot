import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import iconImage from '../../assets/logo.webp';
import logoutIcon from '../../assets/logout-icon.png'; 

export default function NavBar({ user, setUser }) {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const isNaturePage = location.pathname === '/nature';
  const isGamingPage = location.pathname === '/gaming';

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollTop = currentScrollTop;
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.querySelector('nav').addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const navElement = document.querySelector('nav');
      if (navElement) {
        navElement.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <nav className={`navbar ${isNaturePage ? 'nature-navbar' : ''} ${isGamingPage ? 'gaming-navbar' : ''} ${isHidden ? 'hidden' : ''}`}>
      <img src={iconImage} alt="Logo" className="navbar-icon" />
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/auth">
              <button className="nav-button">Log In</button>
            </Link>
            &nbsp; | &nbsp;
            <Link to="/">
              <button className="nav-button">Home</button>
            </Link>
          </>
        )}
      </div>
      {user && (
        <div className="navbar-user-info">
          <span>Welcome, &nbsp; </span>
          <Link to="/profile" className="user-link">
            {user.name}
          </Link>
          &nbsp;&nbsp;
          <img 
            src={logoutIcon} 
            alt="Log Out" 
            onClick={handleLogOut} 
            className="nav-button-logout-image" 
          />
          &nbsp;&nbsp;
        </div>
      )}
    </nav>
  );
}
