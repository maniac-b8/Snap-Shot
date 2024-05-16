import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const isNaturePage = location.pathname === '/nature';
  
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
      document.querySelector('nav').removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
      <nav className={`navbar ${isNaturePage ? 'nature-navbar' : ''} ${isHidden ? 'hidden' : ''}`}>
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
          <button onClick={handleLogOut} className="nav-buttonlogout">Log Out</button>
          &nbsp;&nbsp;
        </div>
      )}
    </nav>
  );
}
